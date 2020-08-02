---
title: "Creating Internal Links"
subtitle: "Defining Application Navigation"
abstract: "The app shiny-links replaces the previous examples on creating links to tabs and panels in shiny apps. I rewrote the previous method using a functional component and a Shiny Input Binding."
date: "2020-08-02"
updated: "2020-08-02"
keywords: ["javascript"]
---

## Contents

1. [Why would I need this?](#about)
2. [How does this app work?](#work)
    1. [Creating a link component](#work-ui-component)
    2. [Building a new shiny input binding](#work-js-binding)
3. [What do I need to know before I integrate this into my app?](#know)
4. [How do I run the demo?](#run)

<!-- endexcerpt -->

<span id="about" />

## Why would I need this?

In earlier tutorials, I provided a method for creating links to internal pages in Shiny applications. This is useful when using Shiny UI layouts &mdash;such as `navbar`, `tabPanel`, `tabsetPanel`, etc.&mdash; as internal links have auto-generated `href` attributes. The major drawback of the previous approach was that it rendered a link without the `href` attribute, which means that it isn't accessible. In addition, it was a bit tedious to define inline click events for each link. This can be difficult to manage for larger apps with nested layouts. To address these issues, it is easier to rewrite the earlier method using Shiny components and input bindings.

In this post, we will create a small UI component that renders a link element and write an input binding that handles the application routing.

> This tutorial replaces the following Internal Links tutorials: [part 1](../internal-links-a/), [part 2](../internal-links-b/), and [part-3](../internal-links-b/). I will leave those posts and example apps up for now, but they will be archived in the near future. (02 August 2020)

<span id="work" />

## How does this app work?

In this post, I will cover the following steps.

1. Creating a link component
2. Building a new shiny input binding

<span id = "work-ui-component" />

### Creating a link component

First, we will develop a UI component that renders an anchor element. This component will take two arguments `to` and `label`. The argument `to` will receive value of the page (i.e., tab panel) that you would like to navigate to. Use the `label` argument to add a description of the link.

In this example, I'm called the component `shinyLink`. If you want to render the value for label as HTML, then wrap label in the `HTML()` function (available via the Shiny package).

```r
shinyLink <- function(to, label) {
    tags$a(
        class = "shiny__link",
        href = to,
        label
    )
}
```

Using this component, you can create links without have to add inline on-click events. Like the earlier examples, I strongly recommend using the `value` argument for each tab panel. By default, Shiny will substitute the value for `title` if `value` is NULL. The drawback is that if the title contains too many characters or other HTML elements, then it becomes difficult to find a matching link as this approach matches strings. Instead, set each tab's value using a short and concise ID that has no characters (exception for underscores or dashes).

```r
library(shiny)

ui <- navbarPage(
    tabPanel(
        title = "Home",
        value = "home",
        tags$h1("Home Page"),
        tags$p(
            "You are currently on the page. Go to the",
            shinyLink(to = "home", label = "Data Page"), "."
        )
    ),
    tabPanel(
        title = "Data Visualizations, Tables, and Codebook",
        value = "data",
        tags$h1("Data"),
        tags$p(
            "You are currently on the data page. Go back to the",
            shinyLink(to = "home", label = "Home Page"), "."
        )
    )
)
```

<span id = "work-js-binding" />

### Building a new shiny input binding

Next, we will create a new input binding that defines how the `shinyLink` component behaves. A shiny input binding is used to link a component with R. In this post, I will cover the basics for the `shinyLink` component. See RStudio's [How to Create Shiny Input Bindings guides](https://shiny.rstudio.com/articles/js-custom-input.html) for more information.

New input bindings are created using `new Shiny.InputBinding()`. Use jQuery's `extend` to define the methods specific to the component (i.e., events, values to return, receive messages from R, etc.). To use our input binding in Shiny, it must be registered via `Shiny.inputBindings.register(...)`. Here is the basic structure for the `shinyLink` component.

```js
// init binding
var shinyLink = new Shiny.InputBinding();

// define methods
$.extend(shinyLink, {
    ...
});

// register
Shiny.inputBindings.register(shinyLink);
```

Now, let's define the methods. There are many methods to choose from. In this example, we will use the following.

1. `find`: used to find all instances of the `shinyLink` component (required).
2. `initialize`: this method runs when the component is rendered. For the `shinyLink` component, the initialize method defines what happens when the link is clicked. When a `shinyLink` is clicked, the click event will find the target link (i.e., tab that you want to navigate to) and activate it. 

In shiny apps, there may be situations when the destination panel is nested inside another tab panel. In the previous tutorials, the solution was to call the function twice as the parent tab needs to be activated before the target tab can be activated. The binding for the link component eliminates the need to do this as it will examine the parent navigation list (i.e., `<ul>`) to determine if the destination is a page or a tab within a page. If the destination is the latter, then the input binding will find and activate the parent page before activating the destination tab.

Here is the complete input binding for the link component.

```js
// init binding
var shinyLink = new Shiny.InputBinding();

// define methods
$.extend(shinyLink, {
    find: function(scope) {
        return $(scope).find("a.shiny__link");
    },
    initialize: function(el) {
        $(el).on("click", function(e) {
            e.preventDefault();
            
            // extract destination and find matching link
            var to = $(el).attr("href");
            var target = $(`a[data-value=${to}]`);

            // does the link exist?
            if (target.length) {

                // if the parent ul of the matching link has the class `.navbar-nav`,
                // then click the link. Links with these classes are
                // located in the navbar element.
                if ($(target).parent().parent().hasClass("navbar-nav")) {
                    $(target).click();
                    window.scrollTo(0, 0,);
                }
                
                // if the parent ul of the matching link has the class `.nav-tabs`,
                // then this indicates that the link is part of of a tabSetPanel
                // inside a tabPanel. This means, that parent tabPanel must
                // be found and activated before activating the tabPanel.
                if ($(target).parent().parent().hasClass("nav-tabs")) {
                    
                    // find the nearest .tab-pane and extract `data-value`
                    var val = $(target).closest("div.tab-pane").data("value");
                    var parentLink = $(`a[data-toggle="tab"][data-value="${val}"]`);

                    // activate parent (if not already active)
                    if (!parentLink.parent("li").hasClass("active")) {
                        parentLink.click();
                    }

                    // activate destination tab
                    target.click();
                    window.scrollTo(0, 0,);

                }
                
            } else {
                console.error("No matching link found. Is the destination correct?");
            }
        });
    }
});

// register
Shiny.inputBindings.register(shinyLink);
```

<span id="know" />

## What do I need to know before I integrate this into my app?

The click event is limited to the `tabPanel` and `tabsetPanel` relationship. If you have tabs that are nested beyond this hierarchy, then restructure the initialize method as a recursive function.

<span id="run" />

## How do I run the example?

The full code for the demo is available on GitHub in the [Shiny Links subfolder](https://github.com/davidruvolo51/shinyAppTutorials/tree/prod/shiny-links). Alternatively, you can run the app directly from the R console using the following command.

```r
shiny::runGitHub(
    repo = "shinyAppTutorials",
    username = "davidruvolo51",
    subdir = "shiny-links"
)
```