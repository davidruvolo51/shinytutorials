---
title: "Listbox Component"
subtitle: ""
abstract: ""
date: "2020-08-27"
updated: "2020-08-27"
keywords: [""]
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

The `<select>` input elements are commonly used in Shiny applications for creating dropdown menus. Select elements are easy to use, but they are not easily customizable using CSS. The ability to style select elements may be important for complying with organizational branding guidelines or if you would like to create a custom application. 

An earlier post [Custom Select Inputs](./../select-input-styling/) demonstrated the use of the `appearance` CSS property, but this can cause the element to render and behave differently across browsers. Alternative solutions involve loading a large UI library into your app for a single component or using some creative markup. However, these methods may not be accessible for individuals who use assistive web devices. Using the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/) as a reference, the [listbox](https://www.w3.org/TR/wai-aria-practices/#Listbox) widget is a nice alternative.

In this post, I will provide an overview for creating your own listbox component that follows the WAI-ARIA Authoring Practices. Specifically, this example reworks the [Collapsible Dropdown Listbox Example](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html) for use in Shiny applications. This post will provide an overview on the creating the R component, JavaScript input bindings, and styling the component with CSS.

> This tutorial focuses heavily on HTML and JavaScript. Some experience will definitely help, but not required. I've tried to keep concepts simple and reference outside sources where possible. If you have suggestions for improvement or notice any errors, feel free to open a new [issue](https://github.com/davidruvolo51/shinytutorials/issues).

<span id="work" />

## How does this app work?

To develop and style your own listbox component, here are the elements you will need to do.

1. Building the R component
2. Creating the JavaScript input binding

**NOTE**: I won't go into detail about the CSS used to create the component. In the [listbox subrepo](https://github.com/davidruvolo51/shinyAppTutorials/tree/prod/shiny-listbox), I've included the SASS file and build scripts (using Parcel JS) for compiling the CSS file. I would recommend using SASS for larger projects and importing the `listbox.scss` accordingly. If you are using vanilla CSS, then load the `listbox.css` file directly into your app or copy the contents into your app's primary CSS file.

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
- List of option: For the `<select>` element, options are added using the `<option>` element. This element is not applicable in this situation, but we can use an unorder list (`<ul>`) and define each option using the list item element (`<li>`).

Using the above list, here is the basic markup of the Shiny listbox component. I will talk about the required attributes as we start writing the R functions.

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

1. `list_toggle`: I will create one that renders the markup for the `<button>`. This includes the text element that will display the selected option and a SVG icon.
2. `input_list_item`: I will also write a function that generates a list item (i.e., option). Each list item has an icon that will be displayed when the option is selected and an inner text label that displays the name of the title. Several attributes will need to be added to for web accessibility and communication with the JavaScript input binding.
3. `input_list`: This helper function generates the list (`<ul>`) based on the number of input values. Each option is generated using the `input_list_item` function.
4. `listbox`: This the main function that will be used in your shiny app.

For isolating helper functions, I will nest them in list object.

```r
helpers <- list()
```

I am using the [rheroicons](https://github.com/davidruvolo51/rheroicons) package for this component. This package is an R wrapper around the [heroicons](https://github.com/tailwindlabs/heroicons) library.

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

The `input_list_item` function is used to generate each list item. Each item will have a label the displays the option and an icon that will be used to indicate of the option is selected. To indicate that the element is a selectable option, I will add the attribute `role = "option"`. I will also added few custom `data-*` attributes that will be used in the input binding.

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

Using the `input_list_item` function, we can create the `input_list` function. This helper function dynamically generates options based on user-defined input values. The parent element is an unordered list (`<ul>`). The attribute `role = "listbox"` is required and the attribute `tabindex` will make the element focusable in the input binding. The ARIA attribute `aria-labelledby` is added to link the listbox label and the list of options. The list of options is generated using `lapply`.

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

By default, the `label` and `values` arguments are optional. If `values` is missing, the input for `options` is used instead. Input for the `options` and `values` should be a character array (i.e., `options = c(...)`)

Here is the R code for the `listbox` function.

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

That's it for the R function. If you use the component in an app along with the CSS file, it would return a simple button. However, nothing will happen as we haven't written the input binding yet.

<span id="work-js" />

### Creating the JavaScript input binding

Next, we will create Shiny input binding for the listbox component. The purpose of the input binding is to define what happens when the listbox widget is rendered and what happens when the widget is interacted using a mouse or keyboard. For a more detailed description of input bindings, see RStudio's [Shiny input bindings guide](https://shiny.rstudio.com/articles/js-custom-input.html). In this section, I will cover each method &mdash;`initialize`, `getValue`, and `subscribe`&mdash; individually. The complete input binding can be found in the [listbox.js](https://github.com/davidruvolo51/shinyAppTutorials/blob/prod/shiny-listbox/www/js/listbox.js) file on GitHub.

The initial structure for listbox component looks like this. I've pre-written the `find` and `unsubscribe` methods. The method `find` returns all instances of the listbox widget using the CSS class name (`listbox-group`) defined in the `listbox` function.

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

The purpose of the initialize method is to define what happens to the listbox component after it is rendered in the client. In this example, I would like to have the first choice set as the default value for the input element. To do this, this method should locate the first option of the list, return its value, and update the text display. In this method, the selected value is passed to the custom attribute `data-value` defined in the `<fieldset>` element. This isn't necessarily important, but could be useful for styling the listbox widget based on user selection.

There are also a few ARIA attributes that need to be set. First, the list element (i.e., `<ul>`) needs to have the property `aria-activedescendant` where the value is the ID of the first option. Second, the first option needs to have `aria-selected` attribute added and it's value set to `true`.

Here is the input binding with just the initialize method defined. (You don't need to worry about an input value for `el` as this returned by the `find` method and automatically passed in by Shiny.)

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

To make the value of the listbox component accessible in the Shiny server, the `getValue` will look for the list item that has the ARIA attribute `aria-selected` and return its value. 


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

The subscribe method is used to define the behaviors of the listbox component. For example, when the button is clicked we need to determine if the list should be opened or closed. For ensuring good web accessibility practices, the listbox component needs to respond to the keyboard events. In the [collapsible listbox example](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html) guide, it is recommended to have events that are triggered when the following keys are pressed: enter, escape, up and down arrow, home, and end. Since we need to define the events based on mouse and keyboard clicks, I will write a few helper functions that will open, close, and toggle the menu (and update attributes accordingly), as well as a function that updates the component when a new option is selected.

The functions that handle the opening and closing the list are fairly straightforward. These functions add or remove the CSS class `hidden` that displays or hides the list of options. Each function needs to update the ARIA attributes for the button (`aria-expanded`). For visual purposes, the icon will be rotated by adding the class `rotated`. The function `toggleMenu` is a wrapper around `closeMenu` and `openMenu`.

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

Next, we will need a function that updates the component and the current when a new element is selected. This function will update the `aria-selected` attribute of the selected item, the `aria-activedescendant` value defined in the parent container, and update the displayed text. The component's value is updated by running the callback function (i.e., `getValue`). 

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

For the listbox component, we will define three events: `click` (on the toggle), `keydown` (list items), and `click` (list items). The click event is attached to the listbox toggle. When the element is clicked, the state of the list component will be changed to either open or closed using the function `toggleMenu`.

```js
// event: when menu toggle is clicked
$(el).on("click", "button.listbox-toggle", function(e) {
    toggleMenu();
});
```

The `keydown` event is a bit more involved than the click event as each key triggers a different event. This event will be attached to the list element (`<ul>`). Key press codes can be accessed through `keyCode` data available from event (`e` for short) interface. The keys used in this component and their behaviors and corresponding codes listed in the following table.

| name       | behavior        | code 
| :--------- | :-------------- | :---
| up arrow   | previous option | 38
| down arrow | next option     | 40
| home       | first option    | 36
| end        | last option     | 35
| escape     | close menu      | 27
| enter      | select option   | 13

All key presses except escape will update the listbox's value automatically.

The key down event uses a switch state where each key code has its own behavior. The case for the escape key is the simplest case as it runs `closeMenu()`.  When the enter key is pressed, the selected element is passed to `updateInput` and the menu is closed. Behaviors for up/down arrow, home, and end are similar to enter, but these actions use jQuery's `prev()`, `next()`, `first()` and `last()` functions to determine if sibling elements exist. For example, nothing happens if the last option is focused and the down arrow is pressed.


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

The last event is the click events for list items. When an item is clicked, it will update the component using the value of the selected item. It is important to use the `closest()` function to return the `<li>` element instead of the text or icon.

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

At the moment, the listbox component is fairly basic and the responsiveness of the widget could be improved. Initial accessibility checks were run using the [Web Accessibility Evaluation Tool (WAVE)](https://wave.webaim.org), but I would recommend further testing and review before using in any production application.

The code discussed in this post and that is available in the example app, provide the minimum requirements for creating the listbox component. Currently, only one option can be selected. You may want to expanded the component to allow for multi-selection along with a limit on the number of selected items. This would take a bit more thought and planning and I wanted to keep this example relatively simple.

The listbox component will also be included in [accessibleshiny](https://github.com/davidruvolo51/accessibleshiny) package. Keep an eye out for improvements on the listbox components!

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

Here is a list of all resources linked in this tutorial.

- Find key codes: [keycode.info](https://keycode.info)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)
- [Listbox Widget](https://www.w3.org/TR/wai-aria-practices/#Listbox)
- Listbox Example: [Collapsible Dropdown Listbox Example](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html)
- RStudio's [Building Inputs Guide](https://shiny.rstudio.com/articles/building-inputs.html)
- RStudio's [How to create custom input bindings](https://shiny.rstudio.com/articles/js-custom-input.html)