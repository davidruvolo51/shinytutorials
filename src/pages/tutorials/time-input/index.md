---
title: "Creating Custom Inputs"
subtitle: "Getting started with Shiny Input Bindings: making a time input component"
abstract: "There isn't a time input in the shiny framework. A time input element is useful for data entry shiny apps or if you need to filter data by hour or minute. In this example, learn how to create a custom time input component using Shiny input bindings."
keywords: ["javascript"]
date: "2019-11-25"
updated: "2020-08-01"
---


## Contents

1. [Why would I need this](#about)
2. [How does this shiny app work?](#work)
    1. [Building the time input component](#work-build)
    2. [Writing the shiny input binding](#work-js)
3. [What do I need to know before I implement this into my own project?](#further-thoughts)
4. [How do I run the demo?](#run)

<!-- endexcerpt -->

<span id="about" />

## Why would I need this?

In the shiny framework, there are a lot of UI components that are easy to use and to fit with your data. If your data contains time values that may play a big role in the interactivity of your application, you would want a time input element that allows uses to filter data by a time or by a period of time. You may notice that a time input element does not exist in the shiny framework as a [shiny control widget](https://shiny.rstudio.com/tutorial/written-tutorial/lesson3/).

This is not a problem as it is possible to create your own using [Shiny Input Bindings](https://shiny.rstudio.com/articles/js-custom-input.html). In this tutorial, I will cover how to structure the HTML element and write the JavaScript input bindings.

> It is important to note that not all browsers widely support input[type='time']. See [Can I Use: date and time inputs](https://caniuse.com/#feat=input-datetime) page for more information. The purpose of this example is to demonstrate how to create custom input components and Shiny input bindings.

<span id="work" />

## How does this shiny app work?

In this tutorial, I will focus on the following steps to get the component working.

1. Building the time input component
2. Writing the shiny input binding

See the [GitHub repository](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/time-input) for the complete code.

<span id="work-build" />

### Building the time input component

To create the input element, we will use the HTML element [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). There are many input types available, but we are only interested in the type [time](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time).  We will stick with the basic attributes: `id`, `name`, `class`, `value`, `min`, and `max` attributes.

In shiny, the `<input>` element can be accessed using `tags$input()`. All inputs must have an accompanying label (`<label>`; `tags$label`) that is linked with the input using the `for` attribute. The value of `for` should be the id of the input element. 

In addition to the label element, you may need to a caption to provide addition notes about the time input. This argument will be optional. If it is used, then content should be placed inside the label element.

Here is the time input component.

```r
time_input <- function(inputId, label, value = "13:00", min = "07:00", max = "10:00", caption = NULL) {

    # <label />
    lab <- shiny::tags$label(
        class = "time__label",
        `for` = inputId,
        label
    )

    # if present, append caption to <label>
    if (!is.null(caption)) {
        lab$children <- shiny::tagList(
            lab$children,
            shiny::tags$span(
                class = "time__caption",
                caption
            ),
        )
    }

    # <input type="time" />
    input <- shiny::tags$input(
        id = inputId,
        name = inputId,
        class = "time__input",
        type = "time",
        min = min,
        max = max,
        value = value
    )

    # return
    shiny::tagList(lab, input)
}
```

The attributes `min` and `max` can be used to validate the input value. Some browsers may provide some errors natively, but this does not replace robust validation methods and client-side error messages. For more information, see Mozilla's [time input reference guide](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time).

<span id="work-js" />

### Writing the Shiny Input Binding

Next, we will create shiny input binding for the time component. I will cover the methods required for this example. For a more detailed description of input bindings, see RStudio's [Shiny input bindings guide](https://shiny.rstudio.com/articles/js-custom-input.html).

New input bindings can be created using `new Shiny.InputBinding()`. Use JQuery's `extend` function to define the methods specific to the component. (It is not possible to write the binding using vanilla JS). Lastly, register input bindings using `Shiny.inputBindings.register(...)`. Here is the basic structure.

```js
// create new binding
var myInput = new Shiny.InputBinding();

// extend: define methods
$.extend(myInput, {
    ...
});

// register
Shiny.inputBindings.register(myInput);
```

There are several methods available for creating custom input bindings. In this example, we will use the following methods.

- `find`: (required) this method is used to locate the time component within the web document
- `initialize`: this method will run when the component is initialized (i.e., rendered). This is also useful for setting the initial value of the component (otherwise, the starting value will be `NULL`).
- `getValue`: `getValue` returns the value of the time input component so it can be accessed in the Shiny server using `input$some_id`.
- `subscribe`: this is used for attaching events to the time component (i.e., `click`, `change`, etc.). Depending on the event(s), you may want to use the `callback()` function. Doing so will run the `getValue` method.

Here is the input binding for the time component.

```js
// init new binding
var timeInput = new Shiny.InputBinding();

// extend class
$.extend(timeInput, {

    // locate all instances of input[type='time']
    find: function(scope) {
        return $(scope).find(".time__input");
    },

    // return default value defined by the attribute `value`
    // this will also reset the input to it's default value
    // on page refresh
    initialize: function(el) {
        return el.value = $(el).attr("value");
    },

    // callback function: when called, return the current input value
    getValue: function(el) {
        return el.value;
    },

    // events: when input is changed, return the value
    subscribe: function(el, callback) {
        $(el).on("change", function(e) {

            // callback; i.e., run `getValue`
            callback();
        });
    }
});

// register
Shiny.inputBindings.register(timeInput)
```

<span id="further-thoughts" />

## What do I need to know before I implement this into my own project?

Creating custom input components is fairly straightforward. There are a couple of things that you should consider before implementing this method into your application.

To follow good semantic HTML and web accessibility practices, input components should be wrapped in a `form` element: `tags$form(...)`. Include a title for that describes the form using the legend element: `tags$legend()`. For accessibility, make sure the legend is linked with the form element using `aria-labelledby` and reference the id of the legend.

```r
tags$form(`aria-labelledby`="form-time-legend",

    # form legend
    tags$legend(id="form-time-legend","My title for the form"),

    # time input
    time_input(...),

    # other inputs if applicable
    ...

    # submit
    tags$button(type="submit", id="submit", class="action-button shiny-bound-input", "Enter")
)
``` 

It is important to point out that the input, by default, returns time in the 24-hour format. If you would like the component to return 12-hour format, than you can restructure the `initialize` and `getValue` methods to the following. Alternately, you can use R to convert the times from 24-hour to 12-hour format.

```js

// method now calls `getValue`
intialize: function (el) {
    el.value = $(el).attr("value");
    this.getValue();
},

// method: returns time in 12-hour format
getValue: function (el) {
    var val = el.valueAsDate;
    var time = val.toLocaleString("en-us", { hour: "numeric", minute: "numeric" });
    return time;
},
```

## How do I run the demo?

The code for the shiny application can be found on [GitHub](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/time-input). Either clone the repository and run the app in locally or you can run the application by running the following code in the console. 

```r
shiny::runApp(
    repo = "shinyAppTutorials",
    username = "davidruvolo51",
    subdir = "time-input"
)
```