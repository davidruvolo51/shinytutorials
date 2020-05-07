---
title: "Drag and Drop Example"
subtitle: "Learn how to create movable elements in shiny apps."
abstract: ""
date: "2020-05-05"
updated: "2020-05-05"
keywords: ["js"]
---

## Contents

1. [Why would I need this?](#about)
2. [How does this app work?](#work)
    1. [Creating a draggable functional component](#work-component)
    2. [Developing the UI and integrating the draggable component](#work-ui)
    3. [Defining styles for drag events](#work-css)
    4. [Writing the drag and drop events](#work-events)
        1. [Defining variables and a helper function](#work-events-vars)
        2. [Event for dragstart](#work-events-dragstart)
        3. [Event for dragend](#work-events-dragend)
        4. [Event for dragover](#work-events-dragover)
        5. [Event for dragenter](#work-events-dragenter)
        6. [Event for dragleave](#work-events-dragleave)
        6. [Event for drop](#work-events-drop)
3. [What do I need to know before I integrate this into my app?](#know)
4. [How do I run the demo](#run)

<!-- endexcerpt -->

<span id="about" />

## Why would I need this?

[tbd]

In this tutorial, I will cover the basic elements for creating draggable elements in shiny. Using the [drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) documentation, this tutorial will focus on creating a draggable elment and the corresponding js events. I will also cover a little bit of css, specifically the classes are added when an element is dragged. I will try to keep the concepts simple and provide links for further reading where applicable. If you have any questions or if something is not clear, feel free to open a new issue.

<span id="work" />

## How does this app work?

We will build an app that allows users to reorder a series cards in any order (see the following gif).

<!-- ![drag and drop demonstration](drag_and_drop_demo.gif) -->

In this example, users can reorder a series of cards. Each card a group assignment (i.e., letters A through E) and a random value (i.e., 1 through 50). Users can reorder the cards by name, by value or any method they choose. Cards can be moved by clicking and then dragging the card up or down the page. When the user drops the card, the card will be inserted into that space (either before or after).

To create this app, I will cover the following elements.

1. Creating a draggable functional component
2. Developing the UI and integrating the draggable component
3. Defining styles for drag events
4. Writing the drag and drop events

But first, let's create a new application. I'm using the `app.R` format and have created the js and css files. Your project directory should look like this. I also saved the draggable component in a separate file.

```text
> drag-and-drop/
    + app.R
    + draggable_card.R
    + www/
       - styles.css
       - index.js
```

<span id="work-component" />

### Creating a draggable functional component

The most important aspect to creating a draggable component is the attribute [draggable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable). When this attribute is set to `true`, the element can be dragged. If you do not want it to be dragged, than use `draggable="false"` or remove the attribute altogether.

Before I begin developing the app, I will start off by developing a draggable functional component. This component will display a title, some text, and a icon that indicates that a card can be dragged. I will also add a logical argument that disables drag-ability for a card. I'll call this component `draggable_card` for clarity.

The function runs in the following order.

1. Validate input arguments: by default, all items are draggable
2. Create the svg icon: The icon is a "plus sign" with a filled circular background.
3. Create the card element with all elements (title, text, and icon)
4. If `!draggable`, then remove the svg icon.
5. Return the element.

Here's the whole function.

```r
draggable_card <- function(id, title, text, draggable = TRUE) {

    # validate args
    stopifnot(!is.null(id))
    stopifnot(!is.null(title))
    stopifnot(!is.null(text))
    stopifnot(is.logical(draggable))

    # create <svg> icon
    fill_color <- "#09BC8A"
    line_color <- "#ffffff"
    svg <- tag(
        "svg",
        list(
            "width" = "25",
            "height" = "25",
            "viewBox" = "0 0 25 25",
            "class" = "card-icon",
            # <circle>
            tag(
                "circle",
                list(
                    "cx" = "12.5",
                    "cy" = "12.5",
                    "r" = "12.5",
                    "fill" = fill_color
                )
            ),
            # vertical: <line>
            tag(
                "line",
                list(
                    "x1" = "12.5",
                    "y1" = "5",
                    "x2" = "12.5",
                    "y2" = "20",
                    "stroke" = line_color,
                    "stroke-width" = "2.5",
                    "stroke-linecap" = "butt"
                )
            ),
            # horizontal: <line>
            tag(
                "line",
                list(
                    "x1" = "5",
                    "y1" = "12.5",
                    "x2" = "20",
                    "y2" = "12.5",
                    "stroke" = line_color,
                    "stroke-width" = "2.5",
                    "stroke-linecap" = "butt"
                )
            )
        )
    )

    # build parent element: <div class="card">
    el <- tags$div(
        id = paste0("card-", id),
        class = "card",
        draggable = tolower(draggable),
        `data-value` = title,
        tags$h2(class = "card-title", title),
        svg,
        tags$p(class = "card-message", text)
    )

    # remove <svg> element if draggable = FALSE
    if (!draggable) el$children[[2]] <- NULL

    # return
    return(el)
}
```

The function returns the html markup for the draggable component which is rendered in browser. Here is a sample output.

```r
draggable_card(id = "example", title = "Test", text = "This is a test")            
# <div id="card-example" class="card" draggable="true" data-value="Test">
#  <h2 class="card-title">Test</h2>
#  <svg width="25" height="25" viewBox="0 0 25 25" class="card-icon">
#    <circle cx="12.5" cy="12.5" r="12.5" fill="#09BC8A"></circle>
#    <line x1="12.5" y1="5" x2="12.5" y2="20" stroke="#ffffff" stroke-width="2.5" stroke-linecap="butt"></line>
#     <line x1="5" y1="12.5" x2="20" y2="12.5" stroke="#ffffff" stroke-width="2.5" stroke-linecap="butt"></line>
#   </svg>
#   <p class="card-message">This is a test</p>
# </div>
```

If the option `draggable` was set to false, the function would return the following markup.

```r
draggable_card(id = "example", title = "Test", text = "This is a test", draggable = FALSE)            
# <div id="card-example" class="card" data-value="Test">
#  <h2 class="card-title">Test</h2>
#   <p class="card-message">This is a test</p>
# </div>
```

<span id="work-ui" />

### Developing the UI and integrating the draggable component

Now that the component is working, let's integrate it into a shiny app. In the example app, I'm using the tags approach for building the UI. Using the draggable card function, I'll create a few cards using example data. I have wrapped the cards in a container and have included an extra drop area. If an element is dropped into this area, it will be placed last.

I have also created a button that will be used to display the new order of the cards.

```r
ui <- tagList(

    # <head>: link css
    tags$head(
        tags$link(rel = "stylesheet", href = "styles.css")
    ),

    # <main>: main content
    tags$main(
        tags$h2("Moveable Elements"),
        tags$p(
            "Order the cards by the number of cases or by group.",
            "Drag and drop a card into the drop zone or on top of",
            "another card. Press 'done' when you are finished."
        ),

        # container for dragged elements
        tags$div(
            class = "dragarea",

            # primary elements
            draggable_card("groupA", "Group A", "14 cases"),
            draggable_card("groupB", "Group B", "3 cases"),
            draggable_card("groupC", "Group C", "33 cases"),
            draggable_card("groupD", "Group D", "7 cases"),
            draggable_card("groupE", "Group E", "21 cases"),

            # extra drop zone
            tags$div(
                class = "droparea",
                tags$p("Drop here")
            )
        ),

        # submit button that shows results
        tags$button(
            id = "submit",
            type = "submit",
            class = "shiny-bound-input action-button",
            "Done"
        )
    ),

    # link js file
    tags$script(src = "index.js")
)

# server
server <- function(input, output, session) { }

# app
shinyApp(ui, server)
```

<span id="work-css" />

### Defining styles for drag events

There are a number of styles in the css file, but I would like focus on a few of them: highlighting, drag, and focus. The classes highlighting and focus are used for highlighting a potential drop area by adding a bright green border to the target element. Focus is only used for the blank drop zone. The class drag is used for adding a shadow to the element when it is dragged.

```css
/* for highlighting potential drop */
.highlighting {
    border-color: #09BC8A;
}

/* add shadow to dragged element */
.drag {
    -webkit-box-shadow: 0 0 9px 3px hsla(0, 0%, 0%, 0.3);
    box-shadow: 0 0 9px 3px hsla(0, 0%, 0%, 0.3);
}

/* for highlighting dropzone element */
.droparea.focus {
    background-color: White;
    border-color: #09BC8A;
}
```

These classes will be added and removed in the js events.

<span id="work-events" />

### Writing the drag and drop events

There are a number of drag related events that you can choose from. At a minimum, you should use `dragstart` and `drop`. In this section, I will cover `dragstart`, `dragend`, `dragover`, `dragenter`, `dragleave`, and `drop`.

Before I dive in to writing the events, here is what I would the events to do.

1. When an element is dragged, I would like to add a css class that makes the dragged element more visually apparent.
2. When the element is hovered over a potential drop area, I would like to add a css class to the target element.
3. If the potential drop area is the extra dropzone, I would like to add a css class that focuses that element.
4. I would also like add some logic that determines where the element should be added. If I drag an element down the page, I am assuming that I want the element to be further down the page. Therefore, I would like the element to be placed **after** the droparea. If I drag an element up the page, I am assuming that I want the element to appear higher on the page. Therefore, I would like the element to be placed **before** the droparea. 


<span id="work-events-vars" />

#### Defining variables and a helper function

First, I will create a few variables that will be used across all events. The element `dragged` will receive the html element that I dragged. The variable `startingY` saves the starting `y` position of the dragged element. This will be used to determine if the element is moved up or down the page. Lastly, I am selecting the blank drop element.

```js
let dragged, startingY, dropzone = document.querySelector(".droparea");
```

In some of the events that I will write, I will be adding the css class `.highlighting` a potential droparea. However, I will need a function that removes all instances of this class.

```js
function remove_highlighting() {
    return document.querySelectorAll(".card").forEach(elem => elem.classList.remove("highlighting"));
}
```

<span id="work-events-dragstart" />

#### Event for dragstart

The first event that I will write is `dragstart`. This event runs as soon as an element is dragged. In this event, I will initiate a few things.

1. Start the `dataTransfer`: this property manages the type of drag (i.e., copy or move), the content that is being dragged (i.e., html, images, text, etc.), and other data that you want to use.
2. Add the `.drag` css class to the element is, at the moment, being dragged (using: `elem.classList.add(...)`)
3. Update the `dragged` and `startingY` variables (defined in the previous section).

```js
document.addEventListener("dragstart", function (event) {

    // set event data transfer
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text/html", event.target.outerHTML);

    // add class to dragged item
    event.target.classList.add("drag");

    // update variables
    dragged = event.target;
    startingY = event.pageY;

}, false)
```

<span id="work-events-dragend" />

#### Event for dragend

The `dragend` event is used for running a function when dragging stops. In this example, when the user stops dragging an element, I want to remove the css class `drag` (that was added in the `dragstart` event) from the dragged element.  

```js
document.addEventListener("dragend", function (event) {
    event.target.classList.remove("drag");
}, false)
```

<span id="work-events-dragover" />

#### Event for dragover

The event `dragover` is run when an element is dragged over a potiential drop area. In this example, when the user drags an element over another card, I want to add the `.highlighting` css class to the target card. Event target is tied to the location of the cursor. In this case, we need to find the nearest draggable card (i.e., div with the css class `card`).

```js
document.addEventListener("dragover", function (event) {
    event.preventDefault();
    if (event.target.closest("div").className === "card") {
        event.target.closest("div.card").classList.add("highlighting");
    }
}, false)
```

<span id="work-events-dragenter" />

#### Event for dragenter

The event `dragenter` is similar to `dragover` as they both can be used for highlighting potiential drop areas. In this example, I'm using `dragenter` for highlighting the extra dropzone. The variables `dropzone` was defined in the section [Defining variables and a helper function](#work-events-vars)

```js
document.addEventListener("dragenter", function (event) {
    if (event.target.className === "droparea") {
        dropzone.classList.add("focus");
    }
}, false)
```

<span id="work-events-dragleave" />

#### Event for dragleave

The opposite event of `dragenter` is `dragleave`. In this example, if a card is dragged into the extra drop zone and then dragged elsehwere, I want to remove all highlighting classes. 

```js
document.addEventListener("dragleave", function (event) {
    if (event.target.className === "droparea") {
        dropzone.classList.remove("focus");
    }
    remove_highlighting();
}, false)
```

#### Event for drop

The last event that I will write is the drop event. In this example, I structured the drop event in two ways: 1) if the element is dropped in the blank dropzone and 2) if the element is dropped on another card. Both methods will remove the dragged element and insert it into the target location. However, if the element is dropped on top of another card I want to add it before or after the element. 

Using the variable `startingY`, we can determine if the element is dragged up or down the page. The element can be inserted using the function `insertAdjacentHTML` and specifying the position. I will use the event property `event.pageY` and compare it with `startingY`. If the `pageY` value at the time of drop is less than `startingY`, then this element has been moved up the page. Therefore, I want to insert the dragged card above (i.e., before) the target card. The dragged card should be places below the target element if the `pageY` value is greater than the `startingY` values (as this indicates the card is dragged down the page).


```js
document.addEventListener("drop", function (event) {

    // remove any remaining highlighting
    remove_highlighting();
    dropzone.classList.remove("focus");

    // when dropped in droparea
    if (event.target.className === "droparea") {

        // remove styles dragged element
        dragged.classList.remove("drag");

        // remove dragged element starting point and add before dropzone
        // we want to keep the dropzone for future use.
        dragged.parentNode.removeChild(dragged);
        event.target.insertAdjacentHTML("beforebegin", dragged.outerHTML);
    }

    // when "replacing" card
    if (event.target.closest("div").className == "card") {

        // remove element from document and add to drop position
        dragged.classList.remove("drag");
        dragged.parentNode.removeChild(dragged);

        // if item is moved up, insert the element before the target
        if (event.pageY < startingY) {
            event.target.closest("div.card").insertAdjacentHTML("beforebegin", dragged.outerHTML);
        }

        // if item is moved down, insert the element after the target
        if (event.pageY >= startingY) {
            event.target.closest("div.card").insertAdjacentHTML("afterend", dragged.outerHTML);
        }
    }

}, false)
```

That's about it. In the example, I added an additional event that runs when the button "done" is clicked. This event triggers an alert that displays the new order of the cards. See the `index.js` file for the full code.

<span id="know" />

## What do I need to know before I integrate this into my app?

To summarize this tutorial, here are the basic elements that you need.

1. An element with the attribute `draggable="true"` (e.g., `<div draggable="true">...</div>`)
2. An event that starts the data transfer when an element is dragged, as well as saving the dragged element for later use.

```js
// "save" dragged element
let dragged; 

// listener
document.addEventListener("dragstart", function(event) {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text/html", event.target.outerHTML);
    dragged = event.target;
})
```

3. An event that removes and adds the dragged element when it is dropped.

```js
document.addEventListener("drop", function(event) {

    // remove dragged element
    dragged.parentNode.removeChild(dragged);

    // add the dragged element - or "afterend", "beforeend", etc.
    event.target.insertAdjacentHTML("beforebegin", dragged.outerHTML);
})
```

In this example, I wanted to insert the dragged element before or after an element depending on if the element was dragged up or down the page. Therefore, I used [insertAdjacentHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML). You may want to use another html insert function depending on purpose of your app.

There are other drag events that may be useful for your app that aren't covered here. See the [drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) documentation for more information and examples.

<span id="run" />

## How do I run the example?

The simplest way to run the example is directly from the R console. Alternatively, you can clone the repository and run locally.

```r
install.packages("shiny")
shiny::runGitHub(repo = "shinyAppTutorials", username = "davidruvolo51", subdir = "drag-and-drop")
```