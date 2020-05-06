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
3. [What do I need to know before I integrate this into my app?](#know)
4. [How do I run the demo](#run)

<!-- endexcerpt -->

<span id="about" />

## Why would I need this?

[tbd]

In this tutorial, I will cover the basic elements for creating draggable elements in shiny. This tutorial will focus mostly on html and javascript, as well as a little bit of css. I will try to keep the concepts simple and provide links for further reading where applicable. If you have any questions or if something is not clear, feel free to open a new issue.

<span id="work" />

## How does this app work?

We will build an app that allows users to reorder a series cards in any order (see the following gif).

<!-- ![drag and drop demonstration](drag_and_drop_demo.gif) -->

In this example, users can reorder a series of cards. Each card a group assignment (i.e., letters A through E) and a random value (i.e., 1 through 50). Users can reorder the cards by name, by value or any method they choose. Cards can be moved by clicking and then dragging the card up or down the page. When the user drops the card, the card will be inserted into that space (either before or after).

To create this app, I will cover the following elements.

1. Creating a draggable functional component
2. Developing the UI and integrating the draggable component
3. Writing the drag and drop events

But first, let's create a new application. I'm using the `app.R` format and have created the js and css files. Your project directory should look like this. I also saved the draggable component in a separate file.

```text
> drag-and-drop/
    + app.R
    + draggable_card.R
    + www/
       - styles.css
       - index.js
```

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

<span id="know" />

## What do I need to know before I integrate this into my app?

<span id="run" />

## How do I run the example?
