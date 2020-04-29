---
title: "Linking Tabs - Part 1"
subtitle: "Creating Links to Other Pages in a Shiny App" 
abstract: "Creating links to other pages in your shiny app can be challenging as ids are overwritten each time a shiny app launches. Instead, we will learn how to create new links using javascript."
date: "2018-03-05"
updated: "2019-11-06"
keywords: ["javascript"]
---

## Contents

1.  [Why would I need this?](#about)
2.  [How does it work?](#work)
    1. [Why doesn't this work in the first place](#work-notwork)
    2. [Preparing our UI](#work-ui)
    3. [Using JavaScript](#work-js)
    4. [Implementing the JavaScript function](#work-implementation)
3.  [Are there any issues?](#issues)
4.  [How do I run the demo?](#run)
5.  [What's next?](#next)

<!-- endexcerpt -->

<span id="about" />

## Why would I need this?

Creating links to other pages in shiny apps isn't straight forward as it might seem. If you are here, you probably tried something like...

```r
# using tags
tags$a(href="mypage","Go to My Page")
```  

...but it didn't work. In this tutorial, we use javascript way to create links to other pages.

Let's get started!

<span id="work" />

## How does the app work?

To get the app up and running, this tutorial will cover a few things

1. Why doesn't it work in the first place?
2. Preparing our UI
3. Using JavaScript
...

<span id="work-notwork" />

### Why doesn't it work in the first place?

Traditionally, web links are created by using the `<a>` element, also known as the [anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a). This element is used to create links to other pages, sections in a page, files, and more. Setting the target location can be done by using the attribute `href`. There are other attributes available, but I won't go through them here (see the anchor element docs for more info).

Let's say we have a page in our app called `data/` and we want to create a link to it from another page. In shiny, we would write i like so.

```r
tags$a(href="data/", "Go to Data Page")
```

However, this approach will not work for internal pages. Every time a shiny app is launched, behind the scences it is rendering new keys and injecting them into the href attribute of all `<a>` element(s). In the navbar, tab names are rendered into links that are given unique ids. When a tab name is click, shiny uses ids are used to "swap" out the current tab for the next tab. If inspect the ui, the location for the `data` page renders to something like:

```html
<a href="#tab-5531-1" ...>Data</a>
```

And then next time we run the shiny app, it would change to -

```html
<a href="#tab-9124-1" ...>Data</a>
```

And so on.

This makes traditional hyperlink calls (as displayed above) impossible as the location of the page is not static. We can get around this. One way is to work with data attributes.

[Data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) allow us to attach custom data to html elements. As long as we prefix our attributes with `data-`, we can enter anything we want. This is useful as we can access this information in javascript and run functions using this data. To get our links working, we will take advantage of the `data-*` attribute(s) and create a work around for creating links to other tabs.

<span id="work-ui" />

### Preparing our UI

In this example, I'll be using the page layout navbarPage and tabPanel. Let's set up our project. We will create a single file app, create the `www` and `js` director, and create a javascript file.

```r
# in r
file.create("app.R")
dir.create("www")
dir.create("www/js")
file.create("www/js/index.js")
```

Now open up the `app.R` file. We will start creating the structure of our ui. We will use the `tagList` function to load our javascript file. We will also set the ui layout to `navbarPage`. Here's the basic structure for our app

```r
# ui.R or app.R
ui <- tagList(
        # head
        tags$head(
                tags$script(src="js/index.js")
        ),

        # ui
        navbarPage(
                # do something here
        )
)
```  


Let's take a look at tabPanel. As written on the shiny reference page for [tabPanel](https://shiny.rstudio.com/reference/shiny/latest/tabPanel.html), tabPanel has the following arguments.

```r
# tabPanel function
tabPanel(title, ..., value=title, icon=NULL)
```                

The argument title receives the name of the tab. By default, the argument value is assigned the value given to title. When the tab panel is rendered to html, it will write this out as `data-value=title`. Why is this important?

We can use this argument in a more useful way. Instead of the default action (writing the title), we can substitute a value that is unique to the page, such as an id. If we have ids, this will be more useful. Using a little bit of javascript, we can create a function that searches all tabs that has the id that we want, and then "moves" to that tab.

Let's take a look at example. Suppose we have a tab panel titled, `My Home Page` and give it the value `home`.

```r
# tabPanel function
tabPanel(title="My home page", value="home")
```                

In the js function (which we will write soon), we find all the panels in our app, read the values that are assign, find the panel that has the value `home`, and then move the home panel.

> It's important to note that even though value receives the values from title by default, it is good practice to assign shorter names to value to avoid matching errors.

Back to the UI structure that we defined above, let's create a few tabs and give them unique values. In this example, I will use home, about, and contact.

```r
ui <- tagList(

        # head
        tags$head(
                tags$script(src="js/index.js")
        ),

        # ui
        navbarPage(
                tabPanel("Home", value="home"),
                tabPanel("About", value="about"),
                tabPanel("Contact Me", value="contact")
        )
)   
``` 

Next, let's create the links using `tags$a()`, but this time we will use a custom `data-*` attribute. In this example, we will use `data-value` (You can use anyname you like, as long as it's consistent). The values that we will use will be the id, or value, of the page we want the link to route is to. For example, on the home page, we want a link to take us the about page. For now, let's just add a title to each link. Also, I will give each page a title.

```r
ui <- tagList(

        # head
        tags$head(
                tags$script(src="js/index.js")
        ),

        # ui
        navbarPage(

                # home page
                tabPanel("Home", value="home",
                        tags$h1("Home"),
                        tags$a("Go to About page")
                ),

                # about page
                tabPanel("About", value="about",
                        tags$h1("About"),
                        tags$a("Go to Contact Me page")
                ),

                # contact me page
                tabPanel("Contact Me", value="contact",
                        tags$h1("Contact Me"),
                        tags$a("Go Home Page")
                )
        )
)   
``` 

That's just about it for the ui. There's one more thing we have to do, but we will come back to this example once we've written our javascript function.

<span id="work-js" />

### Create Javascript function

Before we write our js function, let's figure out what we want to do.

1. **Select the links**: earlier in the post, I talked about how the navbar bar links are rendered and demonstrated that the hrefs change each time a shiny app is run. First thing our function will do is find all links.
2. **Find the link we want**: Once we've found all of the links, we want to evaluate each link by looking at the custom `data-value` attribute. We will want the function to look for the tab we want so will set it to evaluate some input variable.
3. **Click the link**: When a match is found, the function will need to click the link

Here's the function.

```js
const customHref = function(link){

        // find all links
        const links = document.getElementsByTagName("a");

        // since it returns an object, iterate over each entries
        Object.entries(links).forEach( (elem, i) => {

                // match data-value attribute with input var
                if(elem[1].getAttribute("data-value") === link){

                        // if match, click link
                        elem[1].click()
                }
        });
}
```               

What this is saying is: 1) find me all elements (links, `<a>`) with data-values and return the values, 2) using the destination I defined, find a match in those values, and 3) when a match is found, move to that tab (`.click()`).
  
<span id="work-implementation" />

### Implementing the JavaScript function

Now that we have our function, we can use it wherever we want. We will add the event `onclick` and define our function inline. 

```r
tags$a("Got to data page", onclick="customHref('data')")
```

When the link to the data page is clicked, it will find the link to corresponds to the tab "data" and then click it. You can use this function anywhere you like. Make sure the `customHref` input and the tabPanel value match.

Let's update our ui with the js function.

```r
ui <- tagList(

        # head
        tags$head(
                tags$script(src="js/index.js")
        ),

        # ui
        navbarPage(

                # home page
                tabPanel("Home", value="home",
                        tags$h1("Home"),
                        tags$a("Go to About page", onclick="customHref('about')")
                ),

                # about page
                tabPanel("About", value="about",
                        tags$h1("About"),
                        tags$a("Go to Contact Me page", onclick="customHref('contact')")
                ),

                # contact me page
                tabPanel("Contact Me", value="contact",
                        tags$h1("Contact Me"),
                        tags$a("Go Home Page", onclick="customHref('home')")
                )
        )
)   
``` 
                    
That's it! Let's create a blank server function and start the app.

```r
server <- function(input, output){}
```

<span id="issues" />

## Are there any issues?

Yes. If using bootstrap layouts, this does cause the navigation bar to remain open on smaller devices after a link is clicked. To my knowledge, there isn't a solution for this for shiny users.

<span id="run" />

## How can I run this app?

The source code is available on [github](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/Internal-Links-Basic-Ex). Alternatively, you can run the demo in R using the following code.

```r
# Run in R/Rstudio
install.packages("shiny")
shiny::runGitHub(repo="shinyAppTutorials",username="davidruvolo51",subdir="Internal-Links-Basic-Ex")
```

<span id="next" />

## What's next?

Check out [part 2](../internal-links-b/) of this series.
