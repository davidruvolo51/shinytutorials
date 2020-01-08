---
title: "Responsive Datatables"
subtitle: "Creating a custom datatable function to reorgranize content for mobile devices"
abstract: "Data tables are a good method for displaying data on the web. However, this can lead to issues of content overflows on mobile devices or if the browser is resized. In this tutorial, we will learn how to create a responsive data for use in shiny applications."
date: "2019-12-12"
updated: "2019-12-15"
keywords: ["html","css"]
---

## Contents

1. [Why would I need this?](#about)
2. [How does this shiny app work?](#work)
    1. [Creating a render datatable function](#work-function)
        1. [Building the table headers](#work-function-headers)
        2. [Building the table body](#work-function-body)
        3. [Building the table function](#work-function-main)
    2. [Preparing the shiny app](#work-app)
    3. [Writing the CSS styles](#work-styles)
3. [What do I need to know before implementing this into my own application?](#further-considerations)
4. [How do I run the example application?](#run)

<span id="about" />

## Why would I need this?

Data tables are a good method for displaying data on the web. However, this can lead to issues of content overflows on mobile devices or if the browser is resized. Using relative units (i.e., %, em, etc.), it's possible to resize the table depending on the window size, but this may result in the text overflowing to neighboring cells or becoming too small to read. This is where building responsive tables can help. Instead of resizing the table, it is better to reorganize the content. For example, it is possible to stack cells as opposed to displaying them in a row. 

Consider the the following figure. In the figure below, the table on the left presents the table in a normal row-by-column layout. The figure on the right shows the same data, but each column is stacked and the first column now acts as a table header.  

![responsive data tables](responsive_tables.png)

Both tables are use the same data and use html and css to develop. The format changes only when size of the browser is smaller than a predefined breakpoint. In this tutorial and in the example application, we will learn how to create this table for use in a shiny application.

<span id="work" />

## How does this shiny app work?

It might be possible to use existing packages to create a responsive table, but that might involve overriding css styles or modifying existing render methods which could lead to other issues. Instead, it would be easier to create our own render datatable function to produce a structure that allows us to make a responsive table using CSS.

In this section, I will walk you through all of the steps required to produce a simple, responsive table. This includes the following.

1. Creating a render datatable function
2. Preparing the shiny app
4. Writing the CSS styles

I will also add some support for accessibility, but more research and testing is needed. 

<span id="work-function" />

### Creating a render datatable function

Before we write the data table function, it is important to map the flow of data to html output. Here is what we will need to consider when writing the function. 

1. **Determine the HTML elements:** The primary elements of a table are the header (`<thead>`), the body (`<tbody>`), rows (`<tr>`), and cells (either `<th>` for headers and `<td>` for everything else). In shiny, these elements can be accessed through `tags$*` (`tags$thead`, `tags$td`, etc.). For more information table structures, please see the [HTML Table Basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics) guide and refer to the [table specs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table).
2. **Create an outline of the function:** We will need to figure out a way to generate the headers using the column names and render the values in our dataset into HTML cells. In this case, it will likely be easier to write a primary function and two helper functions (one for building the body and one for building the header). The primary function will act as a wrapper around the two helper functions.
3. **Bind data to html elements for use in CSS:** the way this approach works is by attaching values and column names to html elements using custom [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). This allows us to use css [pseudo-elements](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements) and the [content](https://developer.mozilla.org/en-US/docs/Web/CSS/content) property to display (or hide) this information when the window is resized.

This will make sense as we start writing the functions and the css. Let's start writing the function.

<span id="work-function-header" />

#### Building the table header

The first helper function will generate the table header element using the column names of regardless of the input dataset. 

First, I will start by defining the function. I'll call the function `build_header` and assign one argument `data`.

```r
build_header <- function(data){
    ...
}
```

Second, pull the names of the columns of the input dataset using the colnames function. 

```r
build_header <- function(data){
    columns <- colnames(data)
    ...
}
```

Next, we will create the cells for the table header. Since we want the function to respond the dimensions of the column names, I will used the `lapply` function to iterate over all columns. This will return a collection of cells (`<th>`).

```r
build_header <- function(data){
    columns <- colnames(data)
    cells <- lapply(1:length(columns), function(n){
        cell <- tags$th(columns[n])
        cell
    })
    ...
}
```

Now, the object cells is as it sounds, a collection of cells. To add the cells to the table header, they will be wrapped in a row element (`tr`) and then in the header element (`thead`).

```r
build_header <- function(data){
    columns <- colnames(data)
    cells <- lapply(1:length(columns), function(n){
        cell <- tags$th(columns[n])
        cell$attribs$scope <- "col"
        cell
    })
    tags$thead(tags$tr(cells))
}
```

The line `cell$attribs$scope` is used for improving the accessibility of tables with ambiguous data. This attribute creates a link between the table cells and the column they are associated with. This allows screen readers to provide more useful information when reading the data aloud. For example, if the user is on line 10 of a dataset, it will the screen reader will say, "row 10 of n, *name of column*, *value*" (where *n* is the total number of rows; *name of column* is the column name of a cell; *value* is the value of a cell).

Let's test the function using the `iris` dataset.

```r
build_header(iris)
```

This function yields the following html markup.

```html
<thead>
  <tr>
    <th scope="col">Sepal.Length</th>
    <th scope="col">Sepal.Width</th>
    <th scope="col">Petal.Length</th>
    <th scope="col">Petal.Width</th>
    <th scope="col">Species</th>
  </tr>
</thead>
```

<span id="work-function-body" />

#### Building the table body

The function that is used to build the table body is structured a bit different than the header function. To generate the html output, the function will render the table body by rows and columns. This means that we must take the first row in our dataset, build each cell, and add the cells to a row and then repeat this process for row two, row three, and so on.

First, define the function. I will call this function `build_body` and it will have one input argument `data`.

```r
build_body <- function(data){
    ...
}
```

Second, to get the function to iterate row and column we will use a nested lapply function. The outer lapply function will process all rows and output them to a single object `body`. The inner lapply function will generate all cells (in a similar manner as the `build_header` function). To calculate number of iterations to use (i.e., rows and columns), I will use `1:NROW(data)` and `1:NCOL(data)`. I have also used the input arguments `row` and `col` to make it clear how the values are rendered into html elements.

```r
build_body <- function(data){
    body <- lapply(1:NROW(data), function(row){
        cells <- lapply(1:NCOL(data), function(col){
            ...
        })
        ...
    })
    ...
}
```

To generate the cells, the function will do a couple of things. 

1) render the first column in a row as a row header and 
2) bind the column name to the cell. 

The rationale for structuring the cells in this way is that when the screen is smaller than a desktop or if the window is resized, then the table is collapsed and the cells are stacked. Another way to look at this is if the transformed from wide to long using either the `t()` function in base R or the `gather()` function from dplyr.

Here is a example of what it happening using some sample data. The sample dataset included in the example app has the 2017 and 2018 reporting rates for Australian birds in the Birds in Backyards survey program. The data is structured in long format where each row is the number of birds reported for a species for a given year. The columns are name, year, and count. Here is the first row in the dataset presented in the normal layout and in the responsive layout.

**Datatable: Normal**

In the normal layout, the table is presented by columns and rows.

```
| Common.Name          | Year | Count
| Australasian Figbird | 2017 | 133
```

**Datatable: Responsive**

In the responsive format, the column names and values are collapsed into a single cell and cells are stacked.

```
| Australasian Figbird |
| year: 2017           |
| count: 133           |
```

To summarize, the cell-level function will render the first column as a table header (`th`) and the rest of the columns are returned as a normal cell (`td`). An `if` statement is used to evaluate the column position.

```r
build_body <- function(data){
    body <- lapply(1:NROW(data), function(row){
        cells <- lapply(1:NCOL(data), function(col){
            if(col == 1){
                cell <- tags$th(data[row,col])
                cell$attribs$scope <- "row"
            } else {
                cell <- tags$td(data[row,col])
            }
            ...
        })
        ...
    })
    ...
}
```

Each cell will also receive a custom data attribute celled `data-colname`. This attribute will receive the name of the column that corresponds to the current cell. This information will come in handy a little later on, but for now, attributes can be modified using `cell$attributes$*`.

```r
build_body <- function(data){
    body <- lapply(1:NROW(data), function(row){
        cells <- lapply(1:NCOL(data), function(col){
            if(col == 1){
                cell <- tags$th(data[row,col])
            } else {
                cell <- tags$td(data[row,col])
            }
            cell$attribs$`data-colname` <- colnames(data)[col]
            cell
        })
        ...
    })
    ...
}
```

At this point, the object cells is a collection of just that, cells. To add the cells to the table, they need to be returned in the row element `tr`.

```r
build_body <- function(data){
    body <- lapply(1:NROW(data), function(row){
        cells <- lapply(1:NCOL(data), function(col){
            if(col == 1){
                cell <- tags$th(data[row,col])
            } else {
                cell <- tags$td(data[row,col])
            }
            cell$attribs$`data-colname` <- colnames(data)[col]
            cell
        })
        tags$tr(cells)
    })
    ...
}
```

Lastly, the object `body` is a collection of rows and the rows need to be added to the body element of the table. This means we will wrap the rows in the element `tbody` and return the output.

```r
build_body <- function(data){
    body <- lapply(1:NROW(data), function(row){
        cells <- lapply(1:NCOL(data), function(col){
            if(col == 1){
                cell <- tags$th(data[row,col])
            } else {
                cell <- tags$td(data[row,col])
            }
            cell$attribs$`data-colname` <- colnames(data)[col]
            cell
        })
        tags$tr(cells)
    })
    tags$tbody(body)
}
```

Let's test it using the first two rows of the `iris` dataset. 

```r
build_body(iris[1:2,])
```

This would return the following html markup.

```html
<tbody>
  <tr>
    <th data-colname="Sepal.Length">5.1</th>
    <td data-colname="Sepal.Width">3.5</td>
    <td data-colname="Petal.Length">1.4</td>
    <td data-colname="Petal.Width">0.2</td>
    <td data-colname="Species">setosa</td>
  </tr>
  <tr>
    <th data-colname="Sepal.Length">4.9</th>
    <td data-colname="Sepal.Width">3</td>
    <td data-colname="Petal.Length">1.4</td>
    <td data-colname="Petal.Width">0.2</td>
    <td data-colname="Species">setosa</td>
  </tr>
</tbody>
```

<span id="work-function-main" />

#### Building the table function

Now that the two helper functions are written, they can be used to create the main function. This function will generate the table body and header, as well as a caption (or title for the table). For simplicity, I have named this function `datatable` and have defined the following input arguments. 

- **data**: the object containing the data that you want to be rendered as an html table.
- **id**: a unique ID to be applied to the table element. This is optional, but recommended if you are rendering more than one table on the same page using this function.
- **caption**: an title to render with the table (optional).

First, I have defined the function and the input arguments, as well as built the table header and table body using the input data.

```r
datatable <- function(data, id = NULL, caption = NULL){

    # render table and table elements
    tbl <- tags$table(class="datatable")
    thead <- helpers$build_header(data)
    tbody <- helpers$build_body(data)

    ...
}
```

The last step in the function evaluates if a caption should be added to the table. Captions are typically placed after the opening table tag so this would would effect how sub-elements, or children, are added to the parent element (table); an if statement can handle this. Child elements can be added to an html element using `tbl$children`. Since these are html outputs, all child elements are added as a list.

I have also add a condition to add an id to the final output element.

```r
datatable <- function(data, id = NULL, caption = NULL){
    
    # render table and table elements
    tbl <- tags$table(class="datatable")
    thead <- helpers$build_header(data)
    tbody <- helpers$build_body(data)
    
    # add id
    if(!is.null(id)){
        tbl$attribs$id <- paste0("datatable-", id)
    }
    
    # should a caption be rendered?
    if(!is.null(caption)){
        captionId <- paste0("datatable-",id,"-caption")
        tbl$attribs$`aria-labelledby` <- captionId
        tbl$children <- list(
            tags$caption(caption, id= captionId),
            thead,
            tbody
        )
    } else {
        tbl$children <- list(thead, tbody)
    }
    
    # return
    tbl
}
```

For good accessibility, the function will link the caption to the parent element (table) using `aria-labelledby`. 

> If you have more than one datatable and using a caption, it is a good practice to set an ID to ensure the table is linked with the caption.

Let's test the function using the first two rows of the iris dataset.

```r
datatable(data = iris[1:2,], id="iris", caption = "Iris Dataset")
```

This would yield the following markup.

```html
<table class="datatable" id="datatable-iris" aria-labelledby="datatable-iris-caption">
  <caption id="datatable-iris-caption">Iris Dataset</caption>
  <thead>
    <tr>
      <th scope="col">Sepal.Length</th>
      <th scope="col">Sepal.Width</th>
      <th scope="col">Petal.Length</th>
      <th scope="col">Petal.Width</th>
      <th scope="col">Species</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th data-colname="Sepal.Length">5.1</th>
      <td data-colname="Sepal.Width">3.5</td>
      <td data-colname="Petal.Length">1.4</td>
      <td data-colname="Petal.Width">0.2</td>
      <td data-colname="Species">setosa</td>
    </tr>
    <tr>
      <th data-colname="Sepal.Length">4.9</th>
      <td data-colname="Sepal.Width">3</td>
      <td data-colname="Petal.Length">1.4</td>
      <td data-colname="Petal.Width">0.2</td>
      <td data-colname="Species">setosa</td>
    </tr>
  </tbody>
</table>
```

<span id="work-app" />

### Preparing the shiny app

In a shiny applicaiton, the function can be used as any other server output. Since the output of the function is a shiny tags list, it should be rendered used `renderUI` and added to the server output.

```r
# server.R
output$tbl <- renderUI({
    datatable(data=iris, id="iris", caption = "Iris Dataset")
})
```

Then, on the client side, create the corresponding `uiOutput`.

```r
# ui.R
uiOutput("tbl")
```

<span id="work-styles" />

### Writing the CSS styles

 Using [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) and [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements), the column name is displayed before the value of a cell only when the screen width is less than a maximum value. In this example, I'm using `892px` as a break point.

```css
@media (max-width: 892px){
    ...
}
```
 
In the datatable function, each cell (`td`) was given the attribute `data-colname`. Using the css [attr](https://developer.mozilla.org/en-US/docs/Web/CSS/attr) function, attributes can be selected and used in the css file. The content is rendered using the pseudo element `::before` and the value entered in the colname attribute can be selected using the [content](https://developer.mozilla.org/en-US/docs/Web/CSS/content) property. This will render the column name before the value of each cell. Additional parameters are added to render the element as if it were another cell. 

```css
@media (max-width: 892px){
    .datatable tbody tr td::before {
        content: attr(data-colname) ": ";
        display: inline-block;
        width: 150px;
    }
}
```

There are additional stylings in the css file. I will not discuss them here as they mainly set the style of other table elements. The block above is the most important block stylings for displaying the column names.

<span id="further-considerations" />

## What do I need to know before implementing this into my own application?

There are accessibility concerns when the table is transformed. For inviduals who use screen readers or other web assistive technologies, does the layout make sense and can the information be understood? Since the display properties of table elements are adjusted, it is likely that the screen readers will not treat the cells as standard table elements. It is likely that the cells will be interpreted as regular text elements. Adding additional attributes might help address this, but more research is required. Please keep this in mind when implementing this approach into your application. I will address this in the near future.

This approach provides a simple method for converting data to HTML tables. However, it is fairly basic in features. There is no support for more advanced layouts (i.e., nested tables, grouped columns or rows) and in rendering options (i.e., custom styles, attributes, etc.). More work on this is needed, but I'm focusing more on improving the accessibility of the tables before additional features. 

## How do I run the example application?

The demo can be run by cloning the [shinyAppTutorials](https://github.com/davidruvolo51/shinyAppTutorials) respository and opening the responsive data tables R project file or you can run the following code from within R studio.

```r
install.packages(shiny)
shiny::runGitHub(repo = "shinyAppTutorials", username = "davidruvolo51", subdir="responsive-datatables")
```