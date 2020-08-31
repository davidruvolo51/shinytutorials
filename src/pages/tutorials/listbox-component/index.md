---
title: "Listbox Widget"
subtitle: "A customizeable UI widget to select inputs"
abstract: "The select input element is commonly used in Shiny applications for creating dropdown menus. Select elements are easy to use, but they are not easily customizable using CSS. The ability to style select elements may be important for complying with organizational branding guidelines or if you would like to create a custom application. This post contains an updated approach for creating your own dropdown menus using listboxes."
date: "2020-08-31"
updated: "2020-08-31"
keywords: ["html", "javascript"]
---

## Contents

1. [Why would I need this?](#about)
2. [How does this app work?](#work)
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

An earlier post [Custom Select Inputs](./../select-input-styling/) demonstrated the use of the `appearance` CSS property, but this can cause the element to render and behave differently across browsers. Alternative solutions involve loading a large UI library into your app for a single component or using some creative markup. However, these methods may not be accessible for individuals who use assistive web devices. Using the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/) as a reference, the [listbox](https://www.w3.org/TR/wai-aria-practices/#Listbox) widget is a nice alternative.

In this post, I will provide an overview for creating your own listbox component that follows the WAI-ARIA Authoring Practices. Specifically, this example reworks the [Collapsible Dropdown Listbox Example](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html) for use in Shiny applications. This post will provide an overview on the creating the R component, JavaScript input bindings, and styling the component with CSS.

> This tutorial focuses heavily on HTML and JavaScript. Some experience will definitely help, but not required. I've tried to keep concepts simple and reference outside sources where possible. If you have suggestions for improvement or notice any errors, feel free to open a new [issue](https://github.com/davidruvolo51/shinytutorials/issues).

<span id="work" />

## How does this app work?

To develop and style your own listbox component, here are the elements you will need to do.

1. Building the R component
2. Creating the JavaScript input binding

**NOTE**: I won't go into detail about the CSS used to create the listbox widget. See the [listbox subrepo](https://github.com/davidruvolo51/shinyAppTutorials/tree/prod/shiny-listbox) for the source code. I've included the SASS file and build scripts (using Parcel JS) for compiling the CSS file. I would recommend using SASS for larger projects and importing the `listbox.scss` file as needed. If you are using vanilla CSS, load the `listbox.css` file directly into your app or copy the contents into your app's primary CSS file.

Before we dive in, let's create the required files. Your Shiny project should have the following files.

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

<span id="work-r" />

### Building the R component

In this section, we will be working from the `listbox.R` file.

The step for making a listbox component is to write the R component that renders the HTML markup for a listbox widget. Using the [Collapsible Dropdown Listbox Example](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html) as a guide, the markup requires a few HTML elements and a few key ARIA attributes. First, let's use the [HTML source code](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html#sc) to determine which elements we will need for the R component.

- Container: In the example, they used a `<div>` element to wrap the component. We can use a `<div>` to wrap the listbox, but I opted for the `<fieldset>` element as I would use the listbox element inside a `<form>`. For the R component, I will use the `<fieldset>` element.
- Title: It is important to include a text element that describes the listbox widget. Since we are already using the `<fieldset>` element, we can use the `<legend>` element.
- Label: A label may also be useful as it provides additional context for the listbox widget. I will use a `<span>` element for this.
- Toggle: The listbox widget requires a `<button>` that toggles the state of the widget. The toggle is used to open and close the list of options. The text inside the button will be used to display the selected option. An icon will be also be added inside the button to indicate that the button can be clicked and is expandable.
- List of option: For the `<select>` element, options are added using the `<option>` element. This element is not applicable in this situation, but we can use an unordered list (`<ul>`) and define each option using the list item element (`<li>`).

Using the above list, here is the basic markup of the Shiny listbox component. I will talk about the required HTML and ARIA attributes as we start writing the R functions.

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

So how do we generate this markup from R? Since we will need to set and link HTML attributes across elements, as well as dynamically render options based on the number of input values, we will create a few R functions to generate the listbox widget. I will create a primary function and a few helper functions. 

1. `list_toggle`: I will create one that renders the markup for the `<button>`. This includes the text element that will display the selected option and an SVG icon.
2. `input_list_item`: I will also write a function that generates a list item (i.e., option). Each list item has an icon that will be displayed when the option is selected and an inner text label that displays the name of the title. Several attributes will need to be added to for web accessibility and communication with the JavaScript input binding.
3. `input_list`: This helper function generates the list (`<ul>`) based on the number of input values. Each option is generated using the `input_list_item` function.
4. `listbox`: This the main function that will be used in your shiny app.

For isolating helper functions, I will nest them in list object.

```r
helpers <- list()
```

I am using the [rheroicons](https://github.com/davidruvolo51/rheroicons) package for this component. This package is an R wrapper around the [heroicons](https://github.com/tailwindlabs/heroicons) library that I built specifically for Shiny components.

<span id="work-r-listbox-toggle" />

#### Listbox toggle

The first helper function is the `list_toggle` function. This function generates the markup for the `<button>` that open and closes the list of options. Inside the button, the function will render a text label (that displays the selected option) and an SVG icon (that indicates the button can be opened and closed). For good web accessibility practices, we will add the following ARIA attributes `aria-haspopup`, `aria-expanded`, and `aria-labelledby`. I will also add a custom `data-*` attribute which may be useful selecting the button in JavaScript or in CSS.

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

The `input_list_item` function is used to generate each list item. Each item will have a label the displays the option and an icon that will be used to indicate of the option is selected. To indicate that the element is a selectable option, each item has the attribute `role = "option"`. I will also added few custom `data-*` attributes that will be used in the input binding.

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

The values for the arguments `inputId`, `option`, and `value` are passed down via the `input_list` function.

<span id="work-r-listbox-list" />

#### Listbox list

Using the `input_list_item` function, we can create the `input_list` function. This helper function dynamically generates options based on user-defined input values. The parent element is an unordered list (`<ul>`), which has the attribute `role = "listbox"` and the attribute `tabindex = "0"` (this will make the element focusable via the input binding). The ARIA attribute `aria-labelledby` is used to link the label and the list of options. Each option is generated using the `lapply` function.

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

By default, the `label` and `values` arguments are optional. If `values` is missing, the input for `options` is used instead. Inputs for `options` and `values` should be a character array (i.e., `options = c(...)`). Here is the R code for the `listbox` function.

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

That's it for the R function. If you use the component in an app along with the CSS file, it would return a simple button that does nothing when it is clicked. We will use a custom input binding to define the behavior of the listbox widget.

<span id="work-js" />

### Creating the JavaScript input binding

In this section, we will be working in `www/js/listbox.js`.

Shiny input bindings consist of a series of methods that are used to define what happens when the listbox widget is rendered, when the user clicks the button or presses the down arrow key, or anything else that will help establish communication between the client and R. For the listbox widget, we will use the following methods: `initialize` (at render), `getValue` (how to set the value of widget), and `subscribe` (the events; buttons, key presses, etc.). For a detailed description of input bindings, see RStudio's [Shiny input bindings guide](https://shiny.rstudio.com/articles/js-custom-input.html).

The structure of the listbox input binding is displayed below. I have already written the `find` and `unsubscribe` methods. `find` returns all instances of the listbox widget using the CSS class name (`listbox-group`) defined in the `listbox` function (as written in `R/listbox.R`).

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

The purpose of the initialize method is to define what happens to the listbox widget as soon as it is rendered. In this example, the default behavior of the widget is to set the first option as the default value. To do this, the first element in the list of options should be selected. Its value will be used to update the text display of the widget and made available to the Shiny server. (In this example, I set the value of the selected option to the custom data attribute `data-value` (found in the `<fieldset>` element). This step is not really relevant, but it could be useful if you would like to customize the appearance of the widget based on its current value.)

There are also a few ARIA attributes that need to be set. First, the list element (i.e., `<ul>`) needs to have the property `aria-activedescendant`. This attribute is updated when a new option is selected. The value is always the ID of the selected option. Second, the first option &mdash; and any selected option &mdash; must have the `aria-selected` attribute added. When this property is used, the value must be set to `true`. Remove this attribute entirely when an option is deselected rather than using `false`.

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

To make the value of the listbox component accessible in the Shiny server, the `getValue` method will return the value of select option. This is done by finding list item with the ARIA attribute `aria-selected` and return its value. This attribute is added by the function `updateInput`, which will be described shortly.


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

The subscribe method is used to define the behaviors of the listbox component in response to an event (i.e., when the button is clicked or when a key is pressed). For ensuring good web accessibility practices, the listbox widget must respond to keyboard events. The Web Accessibility Initiative (WAI) Authoring Practices recommends the following events for a [collapsible listbox widget](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html): enter, escape, up and down arrow, home, and end. These keys will handle the opening and closing of the listbox, navigation within the list of options, and the selection of new items. Since we need to attach these behaviors based on mouse and keyboard clicks, I will write a few helper functions that will open, close, and toggle the listbox options, as well as a function that updates the component when a new option is selected.

The open and close functions are fairly straightforward. These functions work by adding or removing the CSS class `hidden`. The CSS class `hidden` contains the property `display: none`. Both functions will also update the ARIA attribute `aria-expanded` for the listbox toggle (true = open). For visual purposes, the CSS class `rotated` will be added to the SVG icon. This will rotate the toggle icon (downward pointing chevron) by 180 degrees. The `closeMenu` and `openMenu` is wrapped in the `toggleMenu` function.

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

Next, we will need a function that updates the component when a new element is selected. This function will update the `aria-selected` attribute of the selected option, the attribute `aria-activedescendant` (defined in the parent container), and update the displayed text with the new value. The component's value is updated by running the callback function (i.e., `getValue`). 

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

These functions we will be used to define the events for the listbox component. The essential events are: an event that runs when the button is clicked, one for when an option is clicked, and an event for keyboard presses. The click event for the listbox button will either open or closed using the function `toggleMenu`.

```js
// event: when menu toggle is clicked
$(el).on("click", "button.listbox-toggle", function(e) {
    toggleMenu();
});
```

The `keydown` event is a bit more involved than the click event as each key triggers a different event. This event will be attached to the list element (`<ul>`). Key codes can be accessed through `keyCode` data available from event (`e` for short) interface. The keys used in this component and their behaviors and corresponding codes listed in the following table. ([keycode.info](https://keycode.info) is also a good resource for key codes.)

| name       | behavior              | code 
| :--------- | :-------------------- | :---
| up arrow   | focus previous option | 38
| down arrow | focus next option     | 40
| home       | focus first option    | 36
| end        | focus last option     | 35
| escape     | close menu            | 27
| enter      | select current option | 13

All key presses &mdash;except escape&mdash; will update the component's value automatically.

We will use switch statement to define the action for each key. The escape key is the simplest case as it is used to close the listbox (i.e., `closeMenu()`). The enter key is pressed will also close the listbox, but it is used to select the current option which is then passed on to `updateInput`. Behaviors for the up arrow, down arrow, home, and end are similar to enter, but these actions use jQuery's `prev()`, `next()`, `first()` and `last()` functions &mdash;along with `length`&mdash; to determine if there are any sibling elements. For example, if the first option is focused and the down arrow key is pressed, then the second option is focused. Nothing happens if the last option is focused and the down arrow is pressed as there are no more options to select.

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

The last event that we will create is the click event that will be attached to each list item. This event will update the component using the value of the clicked item. Like the previous events, the ARIA attribute of the previously select option will be removed.

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

JQuery's `closest()` function is used to return the desired element. The R function `input_list_item` is used to generate each option, which returns a list element (`<li>`) with a nested span and SVG element. Using `closest("li[role='option'])` function will return the list element `<li>` regardless if the icon or text element that is acutally clicked.

That's it! Here is the complete input binding.

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

At the moment, the listbox component is fairly basic and the responsiveness of the widget could be improved. Initial accessibility checks were run using the [Web Accessibility Evaluation Tool (WAVE)](https://wave.webaim.org), but I would recommend further testing and review before using in any production application. The code discussed in this post and available in the example Shiny application, provide a starting point for creating the listbox component. The functionality is fairly limited as only one option can be selected at a time. It is possible to add a multiple selection feature, but more key press events are required. This would take more thought and planning, and I wanted to keep this example relatively simple. The listbox component will also be included in [accessibleshiny](https://github.com/davidruvolo51/accessibleshiny) package, so keep an eye out for a new version!

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

- On Key event codes: [keycode.info](https://keycode.info)
- RStudio's [Building Inputs Guide](https://shiny.rstudio.com/articles/building-inputs.html)
- RStudio's [How to create custom input bindings](https://shiny.rstudio.com/articles/js-custom-input.html)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)
- WAI-ARIA's [Listbox Widget](https://www.w3.org/TR/wai-aria-practices/#Listbox)
- WAI-ARIA's [Collapsible Dropdown Listbox Example](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html)
- [Web Accessibility Evaluation Tool (WAVE)](https://wave.webaim.org)