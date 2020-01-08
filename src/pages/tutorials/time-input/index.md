---
title: "Custom Time Input"
subtitle: "Create a custom time input element"
abstract: "There isn't a time input in the shiny framework. A time input element is useful for data entry shiny apps or if you need to filter data by hour or minute. Using a little bit of html and javascript, it is possible create a custom input."
keywords: ["javascript"]
date: "2019-11-25"
updated: "2019-12-15"
---


## Contents

1. [Why would I need this](#about)
2. [How does this shiny app work?](#work)
    1. [Build the input element](#work-build)
    2. [Write the JavaScript function](#work-js)
3. [What do I need to know before I implement this into my own project?](#further-thoughts)
    1. [Semantic HTML and Web Accessibility](#further-thoughts-html)
    1. [Processing Input Values In JavaScript](#further-thoughts-process)
4. [How do I run the demo?](#run)


<span id="about" />

## Why would I need this?

In the shiny framework, there are a lot of ui components that are easy to use and to fit with your data. If your data contains time values that may play a big role in the interactivity of your application, you would want a time input element that allows uses to filter data by a time or by a period of time. You may notice that a time input element does not exist in the shiny framework as a [shiny control widget](https://shiny.rstudio.com/tutorial/written-tutorial/lesson3/).

This is not a problem as it is possible to create your own using a little bit of html and javascript. In this tutorial, I will cover how to structure the html element, writing the javascript functions, and linking the time input with shiny.

<span id="work" />

## How does this shiny app work?

The [time input](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/time-input) example illustrates the implementation of the custom input element in a shiny application. In this example app, the user is instructed to enter a time (e.g., 12:51 PM, 10:02 AM, etc.) and then click enter. Doing so will display the time entered in the box beneath the form. Behind the scenes, there is a javascript function that is updating the input value so it shiny can read it and make it available for use in the app.

In this tutorial, I will focus on the key elements for getting the time input working.

1. Build the input element
2. Write the JavaScript function

<span id="work-build" />

### Build the input element

To create the input element, we will use the html element [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). There are many input types available, but we are only interested in the type [time](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time).  We will stick with the basics attributes in the example: `id`, `name`, and `class`. We will also use the `value` attribute, but will set it in the js file as things got weird when it was set in the ui.


In shiny, the `<input>` element can be accessed through `shiny::tagList()` using `tags$input()`. All inputs must have an accompanying label (`<label>`). In shiny, this can be created by using `tags$label`. The label must be linked with the input by using the `for` attribute. The value entered should be the id of the input element (which is `time`). It's also important to use the following css class `shiny-bound-input` when building custom inputs.

Here is how the input element and label should be structured.

```r
tags$label(`for`="time","Enter a time"),
tags$input(type="time", id="time", name="time", class="shiny-bound-input")
```

**NOTE**: In shiny, you will need to use the backticks around `for`. Otherwise, it will interpret this as the start of a for loop.

It is possible to set other attributes for that controls the input element. For example, we could use the attribute `min` and `max` to limit the range at which users can enter time. If you decide to implement this, make sure you also implement validation methods that inform users if there are any errors in the form.

It is important to point out that the input, by default, returns time in the 24-hour format. In the section [What do I need to know before I implement this into my own project?](#further-thoughts), I will provide a method for converting the time to 12-hour format.

<span id="work-js" />

### Write the JavaScript functions

Now that the input is defined in the ui, we can now register the input element with shiny for use in the server. If you haven't already done so, create the www directory and a javascript file.

In the js file, we will write a function that registers the time input with shiny so we can access the value in the shiny server. We will select the input element (`time`) and add an [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to it. Event listeners allow us to preform a function that is triggered by a specific event. For example, an event can be a mouse click or if a key is pressed. There are a [number of other events](https://developer.mozilla.org/en-US/docs/Web/Events) to choose from, but we will use the `input` event as we want run a function when the user has entered a value in the time input. 

First, we will select the time input.

```js
const time = document.getElementById("time");
```

Next, we will define the event listener.

```js
time.addEventListener("input", function(event){
    ...
});
```

Before we write the function, there are a couple of things we need. I'll go through each item one-by-one and then add it to the function. 

The input for the function is `event`. This returns a lot of information about the event including the input value. The input value can be accessed by using the following code.

```js
event.target.value
```

Using this value, we can register the time input with shiny. According to the [documentation](https://shiny.rstudio.com/articles/communicating-with-js.html), the function `Shiny.setInputValue` will handle this for us. This function takes two values: id and values. The id is the id of the input element (time) and the value is the user entered input value (event.target.value). 

```js
Shiny.setInputValue("time", event.target.value);
```

Now we can finish the function. Let's move the set input value function into the event listener.

```js
time.addEventListener("input", function(event){
    Shiny.setInputValue("time", event.target.value)
});
```

Lastly, we will set a default value for the input.

```js
time.value = "12:00";
```

That is all we need. Here is everything put together.

```r
# ui.R
tags$label(`for`="time","Enter a time"),
tags$input(type="time", id="time", name="time", class="shiny-bound-input")
```

```js
// index.js
const time = document.getElementById("time");
time.value = "12:00";
time.addEventListener("input", function(event){
    Shiny.setInputValue("time", event.target.value)
});

```

If you have more time inputs, you will need to repeat the js code for each input element.

In the shiny server, the values can be accessed as normal i.e., `input$time`. In the example application, I've added a console log in the event listener to demonstrate when shiny is updating the value.

<span id="further-thoughts" />

## What do I need to know before I implement this into my own project?

Creating a time input is fairly simple to do. All you need is a label, time input, and 4 lines of javascript. There are a couple of things that you should consider before implementing this method into your application.

<span id="further-thoughts-html" />

### Semantic HTML and Web Accessibility

To follow good semantic html and web accessibility practices, wrap the input in a `form` element: `tags$form(...)`. Include a title for that describes the form using the legend element: `tags$legend()`. For accessibility, make sure the legend is linked with the form element using `aria-labelledby` and reference the id of the legend.

```r
tags$form(`aria-labelledby`="form-time-legend",

    # form legend
    tags$legend(id="form-time-legend","My title for the form"),

    # time input
    tags$label(`for`="time","Enter a time"),
    tags$input(type="time", id="time", name="time", class="shiny-bound-input"),

    # other inputs if applicable
    ...

    # submit
    tags$button(type="submit", id="submit", class="action-button shiny-bound-input", "Enter")
)
```

I would recommend using `aria-labelledby` over `aria-label` as you will do not have to update the content in two places if you were to edit the legend text.

<span id="further-thoughts-process" />

### Processing Input Values In JavaScript

Using the input with type time, will return the values in 24-hour format. This is not a major issue as we can expand a little bit more javascript or transform the values in R using the lubridate package. It makes no difference. It is a matter of what works with your project and what you are comfortable with.

If you want to convert the time values in javascript, I would recommend using adjusting the event listener to return the date object instead of the value. Instead of selecting `event.target.value`, select `valueAsDate`.

```js
event.target.valueAsDate
```

This returns the input value as utc date object. If the time 8 pm was entered into the form, the time would be returned as a date object with the date set to 01 January 1970.

```js
Date Thu Jan 01 1970 20:00:00 GMT+0000 (Coordinated Universal Time)
```

We can use common js methods to work with date objects to format the date object. Using the function [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString), we can reformat the time in 12-hour format. The locale we will use is `en-us`. We will name which values in the date object that we want to use i.e., hours and minutes.  

```js
time.addEventListener("input", function(event){
    let input = event.target.valueAsDate;
    let value = input.toLocaleString("en-us", { hour: "numeric", minute: "numeric"});
    Shiny.setInputValue("time", value);
});
```

If we entered `8:00 PM` in the form, the first method wil return `20:00`. With the second method, the return value is `8:00 PM`. In the example app, I have included both methods.

## How do I run the demo?

The code for the shiny application can be found on [github](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/time-input). Either clone the repository and run the app in locally or you can run the application by running the following code in the console. 

```r
install.packages(shiny)
shiny::runApp(repo="shinyAppTutorials", username="davidruvolo51", subdir="time-input")
```