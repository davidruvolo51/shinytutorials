---
title: "Listbox Widget"
subtitle: "Creating a customizable dropdown menu component for Shiny"
abstract: "The select input element is commonly used in Shiny applications for creating dropdown menus. Select inputs are easy to use, but they are not easy to style using CSS. This post covers how to create a customizable listbox widget."
date: "2020-09-01"
updated: "2020-09-01"
keywords: ["html", "javascript"]
---

## Contents

1. [Why would I need this?](#about)
2. [How does the listbox widget work?](#work)
    1. [Building the R Component](#work-r)
        1. [Listbox Toggle](#work-r-listbox-toggle)
        2. [Listbox Options](#work-r-listbox-options)
        3. [Listbox List](#work-r-listbox-list)
        4. [Main Listbox function](#work-r-listbox)
    2. [Creating the JavaScript Input Bindings](#work-js)
        1. [initialize](#work-js-initialize)
        2. [getValue](#work-js-getValue)
        3. [subscribe](#work-js-subscribe)
3. [What do I need to know before I integrate this into my app?](#know)
4. [How do I run the demo](#run)
5. [Further reading](#further-reading)

<!-- endexcerpt -->

<span id="about" />

## Why would I need this?

In the post [Custom Select Inputs](./../select-input-styling/), I demonstrated the use of the `appearance` CSS property for styling select inputs. However, that approach can cause the element to render differently across browsers making the web experience inconsistent. Using a well-designed component library will help with this, but it usually involves loading a large library into your app just to use a single component. Other solutions involve some creative markup and CSS, but it is not guaranteed that these approaches are accessible for individuals who use assistive web devices. Instead, it is possible to create your own dropdown menu by creating using the [listbox](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role) role.

In this post, I will provide an overview for creating your own listbox widget using HTML, CSS, and JavaScript. The Web Accessibility Initiative's (WAI) Authoring Practices for creating a [listbox widget](https://www.w3.org/TR/wai-aria-practices/#Listbox) is used to ensure the widget follows recommended accessibility practices. The example discussed in the post reworks the [Collapsible Dropdown Listbox Example](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html) for use in Shiny applications, including writing the R functions that generate the HTML and creating the custom JavaScript input binding that handles the communication between R and the listbox widget.

> This tutorial focuses heavily on HTML and JavaScript. Some experience will definitely help, but it is not required. I have tried to keep concepts simple and reference outside sources where possible. If you notice any errors or have suggestions for improving this post, feel free to open a new [issue](https://github.com/davidruvolo51/shinytutorials/issues) on GitHub.

<span id="work" />

## How does the listbox widget work?

In this post, I will cover the basics for creating the listbox widget.

1. Building the R component
2. Creating the JavaScript input binding

Before we dive in, let's create the required files. Add the following files to your Shiny project.

```
my-project/
  R/
    listbox.R
  www/
    css / 
      listbox.css
    js/
      listbox.js
  ...
```

You can place the CSS and JS files wherever you like as long as they are in the `www` folder. As of Shiny 1.5, files located in the `R/` folder are loaded automatically. 

Checkout the [listbox sub-repository](https://github.com/davidruvolo51/shinyAppTutorials/tree/prod/shiny-listbox) on GitHub for CSS code. I wanted to keep this post short and focus mainly on the HTML and JavaScript code. All styles were written in SASS and compiled to CSS using the application bundler [Parcel](http://parceljs.org). The CSS file is located in the file [`src/listbox.scss`](https://github.com/davidruvolo51/shinyAppTutorials/blob/prod/shiny-listbox/src/listbox.scss) and the compiled CSS file can be found at [`www/css/listbox.css`](https://github.com/davidruvolo51/shinyAppTutorials/blob/prod/shiny-listbox/www/css/listbox.css). If you are using vanilla CSS, load the `listbox.css` file directly into your app or copy the contents into your app's primary CSS file.

<span id="work-r" />

### Building the R component

In this section, we will be working from the `listbox.R` file.

First, we will write the R functions that render the HTML markup and required attributes for the listbox widget. Using the [Collapsible Dropdown Listbox Example](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html) as a guide, the markup requires a several HTML elements and ARIA attributes. Take a look at the example's [HTML source code](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html#sc), and we will use it to determine what the R functions should render.

- Container: In the example, they used a `<div>` element to wrap the component. We can use a `<div>` as the listbox container, but I opted for the `<fieldset>` element as I would primarily use the listbox element inside a `<form>`. The `<fieldset>` element can be accessed using the `tags$fieldset` object.
- Title: The title describes the listbox widget and its elements. Since I am using the `<fieldset>` element, then `<legend>` is the most appropriate element. (Accessed by `tags$legend`)
- Label: A label may also be useful as it provides additional context for the listbox widget. For example, if you were building a form where users select their preferred day of the week for scheduling appointments, a label could be used to give additional information about days and time an office is open (e.g., Mondays, Tuesdays, etc.). I will use the `<span>` element for this (`tags$span`).
- Toggle: The listbox widget requires a `<button>` that opens and closes the widget. The text inside the button will be used to display the current value. I will also add an SVG icon the button to visually indicate that the button can be clicked and its contents are expandable.
- List of options: For the `<select>` elements, options are created using the `<option>` element, but this is not applicable for listboxes. Instead, I will use an unordered list (`<ul>`; `tags$ul`) and each option is created using a list item (`<li>`) with the attribute `role = "option"`.

Using the above list, here is the listbox HTML markup that we want the R functions to generate. I will talk about the required HTML- and ARIA attributes as we start writing the R functions.

```html
<fieldset>
    <legend>Title</legend>
    <span>A longer description</span>
    <button>
        <span>Currently Selected Option</span>
        <svg>Icon</svg>
    </button>
    <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
        <li>Option 4</li>
        <li>Option 5</li>
        <li>...</li>
    </ul>
</fieldset>
```

So, how do we generate this markup from R? Since we will need to set and link HTML attributes across elements, as well as dynamically render options based on the number of input values, we will create a few R functions to generate the sub-elements of the listbox widget. Then, I will write a primary function that assembles the listbox component. The R functions that I will write are listed below.

1. `list_toggle`: I will create a function that renders the markup for the `<button>`. This includes the text element that will display the selected option and an SVG icon that visually indicates the button can be clicked.
2. `input_list_item`: Each option should be generated individually. This function generates a single list item that has an SVG icon (that will be visible when the option is selected) and an inner text label that displays the value of the option. Several attributes are also needed for good web accessibility practices and for communication between R and the JavaScript input binding (this will be discussed in a later section).
3. `input_list`: This helper function dynamically generates a list (`<ul>`) of options based on the number of input values (via the `input_list_item` function).
4. `listbox`: This the main function that will be used in your shiny app.

For isolating helper functions (i.e., numbers 1 through 3), I will nest them in list object.

```r
helpers <- list()
```

The icons used in this package are available in [rheroicons](https://github.com/davidruvolo51/rheroicons) package. The rheroicons package is the R version of the [heroicons](https://github.com/tailwindlabs/heroicons) library that I built specifically for use in Shiny components.

<span id="work-r-listbox-toggle" />

#### Listbox toggle

The first helper function is the `list_toggle` function. This function generates the markup for the `<button>` that open and closes the list of options. Inside the button, the function will render a text label (that displays the current value) and an SVG icon (that visually indicates the button can be opened or closed). For good web accessibility practices, we will add the ARIA attributes `aria-haspopup`, `aria-expanded`, and `aria-labelledby`. I will also add a custom `data-*` attribute which may be useful selecting the button in JavaScript or in CSS.

Here is the R markup.

```r
helpers$list_toggle <- function(inputId, titleId) {
    buttonId <- paste0(inputId, "__", "toggle")
    buttonLabelId <- paste0(buttonId, "_label")

    tags$button(
        id = buttonId,
        class = "listbox-toggle",
        `data-group` = inputId,
        `aria-haspopup` = "listbox",
        `aria-expanded` = "false",
        `aria-labelledby` = paste0(titleId, " ", buttonLabelId),

        # text element for current selected item
        tags$span(
            id = buttonLabelId,
            class = "toggle-text"
        ),

        # icon
        rheroicons::icons$chevron_down(
            type = "solid",
            aria_hidden = TRUE,
            class = "toggle-icon"
        )
    )
}
```

The values for the arguments `inputId` and `titleId` will be defined in the primary function. These values are used to link the legend and selected option label. The `aria-expanded` attribute informs users who use assistive web technologies if the list is visible or not (this attribute will be updated via the input binding).

<span id="work-r-listbox-options" >

#### Listbox options

Next, I will write the `input_list_item` function that generates each option. The returned element will have a label the displays the option and an SVG icon that will be visible when an option is selected. In addition, each option must have the attribute `role = "option"`.

Here is the R code for this function.

```r
helpers$input_list_item <- function(inputId, option, value) {
    forId <- paste0(inputId, "__", option)

    # generate html
    tags$li(
        id = forId,
        class = "listbox-option",
        role = "option",
        `data-value` = value,
        `data-group` = inputId,
        `aria-labelledby` = forId,

        # selected icon
        rheroicons::icons$check_circle(
            type = "solid",
            aria_hidden = TRUE,
            class = "option-icon"
        ),
        # label
        tags$span(
            id = paste0(forId, "-input-label"),
            class = "option-text",
            option
        )
    )
}
```

The values for the arguments `inputId`, `option`, and `value` are passed down via the `input_list` function. I have also added a few custom data attributes that will be useful for selecting elements in CSS or the input binding.

<span id="work-r-listbox-list" />

#### Listbox list

Using the `input_list_item` function, we can create the `input_list` function. This function dynamically generates options based on number of input values. The returned element is an unordered list (`<ul>`). This element must have the attribute `role = "listbox"` and the attribute `tabindex = "0"` (as it will make the element focusable via the input binding). The ARIA attribute `aria-labelledby` is used to link the label and the list of options.

Here is the R code this function. Input values are passed down from the main `listbox` function.

```r
helpers$input_list <- function(inputId, titleId, data) {

    # generate markup for parent element
    parent <- tags$ul(
        id = paste0(inputId, "__input_list"),
        class = "listbox-list hidden",
        `data-group` = inputId,
        `aria-labelledby` = titleId,
        role = "listbox",
        tabindex = "-1"
    )

    # generate markup for child (<li>) elements
    children <- lapply(seq_len(length(data$options)), function(i) {
        helpers$input_list_item(
            inputId = inputId,
            option = data$options[[i]],
            value = data$values[[i]]
        )
    })

    # bind to parent (you can add blank option here)
    parent$children <- children

    # return
    return(parent)
}
```

<span id="work-r-listbox" />

#### Main listbox function

Now that the helper functions are defined, we can use them in the main function. To align the function with other Shiny input elements, I will use the following arguments.

```r
listbox(inputId, title, label = NULL, options, values = NULL)
```

By default, the `label` and `values` arguments are optional. If `values` is missing, then the input for `options` is used. Inputs for `options` and `values` should be a character array (i.e., `options = c(...)`). Here is the R code for the `listbox` function.

```r
listbox <- function(inputId, title, label = NULL, options, values = NULL) {

    # validate
    stopifnot(is.character(inputId))
    stopifnot(is.character(title))
    stopifnot(!is.null(options))

    # process options + values
    data <- list(options = options, values = options)
    if (!is.null(values)) data$values <- values

    # set ID of text elements (for aria attributes)
    titleId <- paste0(inputId, "__title")
    labelId <- paste0(inputId, "__label")

    # build component
    el <- tags$fieldset(
        id = inputId,
        class = "listbox-group hidden",
        `data-group` = inputId,
        `data-value` = "NULL",

        # define title for the input group
        tags$legend(
            id = titleId,
            class = "listbox-title",
            title
        ),

        # generate menu toggle
        helpers$list_toggle(
            inputId = inputId,
            titleId = titleId
        ),

        # generate options list
        helpers$input_list(
            inputId = inputId,
            data = data,
            titleId = titleId
        )
    )

    # append label if present
    if (!is.null(label)) {
        stopifnot(is.character(label))
        el$children <- tagList(
            el$children[1],
            tags$span(
                id = labelId,
                class = "listbox-label",
                lab
            ),
            el$children[2],
            el$children[3],
        )
    }

    # return
    return(el)
}
```

The label for the listbox widget is added only if a string is supplied. If present, the label is inserted after the title and before the button.

That is it for the R function. Load the CSS file into your app or add it to your existing CSS file. If you were to run the app at this point, it would return a simple button that does nothing when it is clicked. In the next section, we will create a custom input binding to define the behavior of the listbox widget.

<span id="work-js" />

### Creating the JavaScript input binding

In this section, we will be working in `www/js/listbox.js`.

Shiny input bindings consist of a series of methods that are used to define what happens when the listbox widget is rendered, when the user clicks the button or presses the down arrow key, or anything else that we want the listbox to do. For the listbox widget, we will use the following methods: `initialize` (at render), `getValue` (how to set the value of widget), and `subscribe` (the events; buttons, key presses, etc.). These methods are defined by Shiny.js and are further detailed in RStudio's [Shiny input bindings guide](https://shiny.rstudio.com/articles/js-custom-input.html).

The basic structure of the listbox input binding is displayed below. I have already written the `find` and `unsubscribe` methods. `find` returns all instances of the listbox widget using the CSS class name (`listbox-group`) defined in the `listbox` function.

```js
// init binding
var listbox = new Shiny.InputBinding();


// define methods
$.extend(listbox, {

    // find: locate all instances of the listbox widget
    find: function(scope) {
        return $(scope).find(".listbox-group");
    },

    // on render
    initialize: function(el) {

    },

    // returns the value of the listbox to be accessed in R via input$...
    getValue: function(el) {

    },

    // events
    subscribe: function(el, callback) {

    },

    // off: remove events defined in subscribe
    unsubscribe: function(el) {
        $(el).off(".listbox");
    }
});

// register binding
Shiny.inputBindings.register(listbox);
```

<span id="work-js-initialize" />

#### initialize

The purpose of the initialize method is to define what happens to the listbox widget as soon as it is rendered. By default, the widget sets the first option as the starting value. The value of the first option will be used to update the text display of the widget and made available in the Shiny server (via `input$...`). In this example, I set the value of the selected option to the custom data attribute `data-value` (found in the `<fieldset>` element). This step is not really relevant, but it could be useful if you would like to customize the appearance of the widget based on its current value.

There are also a few ARIA attributes that need to be set in this step. First, the list element (i.e., `<ul>`) needs to have the property `aria-activedescendant`. This attribute is updated when a new option is selected and the value is always the ID of the selected option. Second, the first option &mdash; and any selected option &mdash; must have the `aria-selected` attribute added. When this property is used, the value must be set to `true`. Remove this attribute entirely when an option is deselected rather than using `false`.

Here is the input binding with for the initialize method defined. (You don't need to worry about an input value for `el` as this returned by the `find` method and automatically passed in by Shiny.)

```js
$.extend(listbox, {
    // ...

    initialize: function(el) {

        // select list (ul) and first item in the list (li)
        var list = $(el).find("ul[role='listbox']");
        var first = $(el).find("li[role='option']").first();

        // update ARIA attributes
        list.attr("aria-activedescendant", first.attr("id"))
        first.attr("aria-selected", "true");

        // add the value of the first item to the parent container (i.e., <fieldset>)
        // to a custom data attribute
        $(el).attr("data-value", first.attr("id"));

        // update displayed text
        $(el).find(".toggle-text").text(first.attr("data-value"));
    },

    /// ...
})
```

<span id="work-js-getValue" />

#### getValue

To make the value of the listbox component available in the Shiny server, the `getValue` method will return the value of select option. This is done by finding list item with the ARIA attribute `aria-selected` and extracting the value. This step is handled by the function `updateInput`, which will be described shortly.


```js
$.extend(listbox, {
    // ...

    getValue: function(el) {
        return $(el).find("li[aria-selected='true']").attr("data-value");
    },

    // ...
})
```

<span id="work-js-subscribe" />

#### subscribe

The subscribe method is used to define the behaviors of the listbox component in response to an event (i.e., when the button is clicked or when a key is pressed). For ensuring good web accessibility practices, the listbox widget must respond to several keyboard events. The Web Accessibility Initiative (WAI) Authoring Practices recommends the following events for a [collapsible listbox widget](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html): enter, escape, up and down arrow, home, and end. These keys will handle the opening and closing of the listbox, navigation within the list of options, and the selection of new items. Since we need to attach these behaviors based on mouse and keyboard clicks, I will write a few helper functions that will open, close, and toggle the list of options, as well as a function that updates the component when a new option is selected.

The open and close functions are fairly straightforward. These functions work by adding or removing the CSS class `hidden`, which toggles the CSS property `display: none`. Both functions will also update the ARIA attribute `aria-expanded` assigned to the listbox toggle (true = open). For visual purposes, the CSS class `rotated` will be added to the SVG icon. This will rotate the toggle icon (downward pointing chevron) by 180 degrees. The `closeMenu` and `openMenu` is wrapped in the `toggleMenu` function.

```js
// define function that closes menu
function closeMenu() {

    // find elements that will be modified on close
    var menu = $(el).find("ul[role='listbox']");
    var toggle = $(el).find("button.listbox-toggle");

    // modify attributes
    menu.addClass("hidden");
    toggle.attr("aria-expanded", "false");
    toggle.find(".toggle-icon").removeClass("rotated");
}

// define function that opens menu
function openMenu() {

    // find elements that will be modified on open
    var menu = $(el).find("ul[role='listbox']");
    var toggle = $(el).find("button.listbox-toggle");
    
    // modify attributes
    menu.removeClass("hidden");
    toggle.attr("aria-expanded", "false");
    toggle.find(".toggle-icon").addClass("rotated");
    
    // focus menu and scroll to selected element
    menu.focus();
}

// define function that toggles menu state
function toggleMenu() {
    var menu = $(el).find("ul[role='listbox']");
    if (menu.hasClass("hidden")) {
        openMenu();
    } else {
        closeMenu();
    }
}
```

Next, we will need a function that updates the value of the listbox widget whenever an option is selected. This function will update the `aria-selected` attribute of the new option, the attribute `aria-activedescendant` of the list `<ul>`, and the text inside the button with the new value. The value is updated in the Shiny server by running a callback function, which runs the `getValue` method. 

```js
// update component and selected item
function updateInput(elem) {
    // focus new element
    var newElem = elem;
    newElem.attr("aria-selected", "true");
    newElem.addClass("focus");

    // update menu attribute
    var menu = $(el).find("ul[role='listbox']");
    menu.attr("aria-activedescendant", elem.attr("id"));

    // update component value + display text
    $(el).attr("data-value", elem.attr("data-value"));
    $(el).find(".toggle-text").text(elem.attr("data-value"));

    // run callback (i.e., getValue)
    callback();
    
}
```

Using these functions, we can define the events for the listbox widget. There are three events: what happens when the button is clicked, when an option is clicked, and when a key is pressed. The first event, is attached to the listbox button. This event will either open or close the listbox using the function `toggleMenu`.

```js
// event: when menu toggle is clicked
$(el).on("click", "button.listbox-toggle", function(e) {
    toggleMenu();
});
```

The `keydown` event is a bit more involved than the click event as each key will results in a different action. This event is attached to the list (`<ul>`). Key codes can be accessed through `keyCode` data available from event (`e` for short) interface. The keys, their behaviors, and codes listed in the following table. (The site [keycode.info](https://keycode.info) is also a good resource for key codes.)

| key        | behavior              | code 
| :--------- | :-------------------- | :---
| up arrow   | focus previous option | 38
| down arrow | focus next option     | 40
| home       | focus first option    | 36
| end        | focus last option     | 35
| escape     | close menu            | 27
| enter      | select current option | 13

All key presses &mdash; except escape &mdash; will update the listbox's value automatically.

I will use switch statement to define the action for each key. The escape key is the simplest case as it is used to close the listbox (i.e., run the function `closeMenu()`). When the enter key is pressed, the listbox will be close and the current option is passed on to `updateInput` function. Behaviors for the up arrow, down arrow, home, and end are similar to enter, but these actions use jQuery's `prev()`, `next()`, `first()` or `last()` functions &mdash;along with `length`&mdash; to determine if there are any sibling elements. For example, if the first option is focused and the down arrow key is pressed, then the second option is selected. If the last option is focused and the down arrow is pressed, then nothing happens as there are no more options to select.

Here is the entire `keydown` event. 

```js
// event: watch for keydowns
$(el).on("keydown", "ul[role='listbox']", function(e) {
    switch(e.keyCode) {

        // on keydown: ArrowUp - code 38
        case 38:
            var current = $(el).find("li[aria-selected='true']");
            if (current.prev().length) {
                var newElem = current.prev();
                current.removeAttr("aria-selected");
                updateInput(newElem);
            }
            break;

        // on keydown: ArrowDown - code 40
        case 40:
            var current = $(el).find("li[aria-selected='true']");
            if (current.next().length) {
                var newElem = current.next();
                current.removeAttr("aria-selected");
                updateInput(newElem);
            }
            break;

        // on keydown: Home - code 36
        case 36:
            var current = $(el).find("li[aria-selected='true']");
            var first = $(el).find("li[role='option']").first();
            current.removeAttr("aria-selected");
            updateInput(first);
            break;

        // on keydown: End - code 35
        case 35:
            var current = $(el).find("li[aria-selected='true']");
            var last = $(el).find("li[role='option']").last();
            current.removeAttr("aria-selected");
            updateInput(last);
            break;
        
        // on keydown: Escape - code 27
        case 27:
            closeMenu();
            break;

        // on keydown: Enter - code 13
        case 13:
            var selected = $(e.target);
            updateInput(selected);
            closeMenu();
            break;
    }
});
```

The last event is a click event that will be attached to each list item. This event will update the component using the value of the clicked item. Like the previous events, the ARIA attribute of the previously select option will be removed.

```js
// on event: when option clicked
$(el).on("click", "li[role='option']", function(e) {

    // make sure the <li> element is selected
    // this will handle situations when <span> or <icon> is
    // clicked
    $(el).find("li[role='option'][aria-selected='true']").removeAttr("aria-selected");
    var elem = $(e.target).closest("li[role='option']");
    updateInput(elem);
    closeMenu();
});
```

JQuery's `closest()` function is used to ignore the child elements (text and SVG icon) inside the selection option and return the list item.

Here is the complete input binding.

```js
// init binding
var listbox = new Shiny.InputBinding();

// define new input binding
$.extend(listbox, {

    // set element to find 
    find: function(scope) {
        return $(scope).find(".listbox-group");
    },

    // on input initialize, select the first option
    initialize: function(el) {

        // select list (ul) and first item in the list (li)
        var list = $(el).find("ul[role='listbox']");
        var first = $(el).find("li[role='option']").first();

        // update ARIA attributes
        list.attr("aria-activedescendant", first.attr("id"))
        first.attr("aria-selected", "true");

        // add the value of the first item to the parent container (i.e., <fieldset>)
        // to a custom data attribute
        $(el).attr("data-value", first.attr("id"));

        // update displayed text
        $(el).find(".toggle-text").text(first.attr("data-value"));
    },

    // when callback is triggered, get the value of the element
    // with the attribute `aria-selected`
    getValue: function(el) {
        return $(el).find("li[aria-selected='true']").attr("data-value");
    },

    // subscribe: define all events here
    subscribe: function(el, callback) {
        
        // define function that closes menu
        function closeMenu() {

            // find elements that will be modified on close
            var menu = $(el).find("ul[role='listbox']");
            var toggle = $(el).find("button.listbox-toggle");

            // modify attributes
            menu.addClass("hidden");
            toggle.attr("aria-expanded", "false");
            toggle.find(".toggle-icon").removeClass("rotated");
        }

        // define function that opens menu
        function openMenu() {

            // find elements that will be modified on open
            var menu = $(el).find("ul[role='listbox']");
            var toggle = $(el).find("button.listbox-toggle");
            
            // modify attributes
            menu.removeClass("hidden");
            toggle.attr("aria-expanded", "false");
            toggle.find(".toggle-icon").addClass("rotated");
            
            // focus menu and scroll to selected element
            menu.focus();
        }

        // define function that toggles menu state
        function toggleMenu() {
            var menu = $(el).find("ul[role='listbox']");
            if (menu.hasClass("hidden")) {
                openMenu();
            } else {
                closeMenu();
            }
        }

        // update component and selected item
        function updateInput(elem) {
            // focus new element
            var newElem = elem;
            newElem.attr("aria-selected", "true");
            newElem.addClass("focus");

            // update menu attribute
            var menu = $(el).find("ul[role='listbox']");
            menu.attr("aria-activedescendant", elem.attr("id"));

            // update component value + display text
            $(el).attr("data-value", elem.attr("data-value"));
            $(el).find(".toggle-text").text(elem.attr("data-value"));

            // run callback (i.e., getValue)
            callback();
            
        }

        // event: when menu toggle is clicked
        $(el).on("click", "button.listbox-toggle", function(e) {
            toggleMenu();
        });

        // event: watch for keydowns
        $(el).on("keydown", "ul[role='listbox']", function(e) {
            switch(e.keyCode) {

                // on keydown: ArrowUp - code 38
                case 38:
                    var current = $(el).find("li[aria-selected='true']");
                    if (current.prev().length) {
                        var newElem = current.prev();
                        current.removeAttr("aria-selected");
                        updateInput(newElem);
                    }
                    break;

                // on keydown: ArrowDown - code 40
                case 40:
                    var current = $(el).find("li[aria-selected='true']");
                    if (current.next().length) {
                        var newElem = current.next();
                        current.removeAttr("aria-selected");
                        updateInput(newElem);
                    }
                    break;

                // on keydown: Home - code 36
                case 36:
                    var current = $(el).find("li[aria-selected='true']");
                    var first = $(el).find("li[role='option']").first();
                    current.removeAttr("aria-selected");
                    updateInput(first);
                    break;

                // on keydown: End - code 35
                case 35:
                    var current = $(el).find("li[aria-selected='true']");
                    var last = $(el).find("li[role='option']").last();
                    current.removeAttr("aria-selected");
                    updateInput(last);
                    break;
                
                // on keydown: Escape - code 27
                case 27:
                    closeMenu();
                    break;

                // on keydown: Enter - code 13
                case 13:
                    var selected = $(e.target);
                    updateInput(selected);
                    closeMenu();
                    break;
            }
        });


        // on event: when option clicked
        $(el).on("click", "li[role='option']", function(e) {

            // make sure the <li> element is selected
            // this will handle situations when <span> or <icon> is
            // clicked
            $(el).find("li[role='option'][aria-selected='true']").removeAttr("aria-selected");
            var elem = $(e.target).closest("li[role='option']");
            updateInput(elem);
            closeMenu();
        });
    },

    // unsubscribe
    unsubscribe: function(el) {
        $(el).off(".listbox")
    }
});

// register
Shiny.inputBindings.register(listbox);
```

<span id="know" />

## What do I need to know before I integrate this into my app?

At the moment, the listbox component is fairly basic and the responsiveness of the widget could be improved. Initial accessibility checks were run using the [Web Accessibility Evaluation Tool (WAVE)](https://wave.webaim.org), but I would recommend further testing and review before using the listbox widget in any production application. 

The code discussed in this post and available in the example Shiny application, provide a starting point for creating the listbox component. The functionality is fairly limited as only one option can be selected at a time. It is possible to add a multiple selection feature, but more key press events are required. It is likely that better input elements (checkbox groups, radio groups, etc.) are a better option as some behaviors described in this post are handled natively in the browser. Semantic HTML elements are always better than custom components. Expanding this example to include multiple selections would take more thought and planning, and I wanted to keep this post relatively simple. 

The listbox widget will also be included in [accessibleshiny](https://github.com/davidruvolo51/accessibleshiny) package, so keep an eye out for a new version!

<span id="run" />

## How do I run the example?

The full code for the demo is available on GitHub in the [Listbox subfolder](https://github.com/davidruvolo51/shinyAppTutorials/tree/prod/shiny-listbox). Alternatively, you can run the app directly from the R console using the following command.

```r
shiny::runGitHub(
    repo = "shinyAppTutorials",
    username = "davidruvolo51",
    subdir = "shiny-listbox"
)
```

<span id="further-reading" />

## Further reading

For more information about the concepts and resources mentioned in this post, please visit the following links.

- Mozilla's [listbox role reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role)
- On Key event codes: [keycode.info](https://keycode.info)
- RStudio's [Building Inputs Guide](https://shiny.rstudio.com/articles/building-inputs.html)
- RStudio's [How to create custom input bindings](https://shiny.rstudio.com/articles/js-custom-input.html)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)
- WAI-ARIA's [Listbox Widget](https://www.w3.org/TR/wai-aria-practices/#Listbox)
- WAI-ARIA's [Collapsible Dropdown Listbox Example](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html)
- [Web Accessibility Evaluation Tool (WAVE)](https://wave.webaim.org)