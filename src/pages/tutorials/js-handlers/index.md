---
title: "Getting started with JavaScript handlers"
subtitle: "Linking R and Javascript"
abstract: "Learn how to add custom js functions for more interactivity in shiny apps. In this example, we will create a dark and light theme toggle and learn how to save the user preferences for later use."
date: "2019-09-06"
updated: "2019-10-25"
keywords: ["javascript"]
---

## Contents

1. [Why would I need this?](#about)
2. [How does this app work?](#work)
    1. [Creating the files](#setup)
    2. [Defining the ui](#ui)
    3. [Defining the server](#server)
    4. [Writing the javascript functions](#js)
    5. [Registering the javascript functions](#registering)
    6. [Running the js functions from the server](#js-running)
3. [What do I need to know before I intergrate this into my app?](#know) 
4. [How do I run the demo?](#run)

<span id="about" />

## Why would I need this?

In this example, we will build a shiny app that toggles between a light and a dark theme. The purpose of this example is to demonstrate how to send information trigged by a event in the shiny ui and run it through custom javascript function via the shiny server. This approach is likely to be for you if you want to create your own input widgets (select inputs, radio buttons, etc.) and UIs, as well as enhancing the interactivity of your shiny app.

This approach isn't for all projects and situations. It does take a little bit longer to set up and debug. There are already a few packages that can handle this from the server (i.e., [shinyJS](https://cran.r-project.org/web/packages/shinyjs/index.html), [shinyBS](https://cran.r-project.org/web/packages/shinyBS/index.html)). These packages are well maintained and there are a number of examples available. Personally, I prefer writing my own html and javascript. I have some html and js code that I've written for non-R projects that I wanted to integrate into my shiny apps. This approach is useful for projects that required a static site and a shiny app that needed to follow branding guidelines. If you like to writing javascript and building everything from scratch (like me), then you would like this approach.

<span id="work" />

## How does this app work?

In this demo, we will build a shiny app that allows us to do three things.

1. Toggle between a light and dark theme, and display the name of the current theme
2. Save the selected theme for later use
3. Load the last theme selected and set it as default when the app is started

We will start off by building the UI, the server and followed by our javascript functions. Finally, we register our functions with shiny.

> This tutorial focuses on javascript. Some experience will definitely help, but not required. I\'ve tried to keep concepts simple and reference outside sources where possible. If you have suggestions for improvement or notice any errors, feel free to open a new [issue](https://github.com/davidruvolo51/shinytutorials/issues).

Let's get started.

<span id="setup" />

### Creating the files

To make our code easier to manage, we will create a css file and a js file. The css file will have the styles associated with the themes and we will write all of our functions in the js file. Place these files in the `www/` folder. You can create individual folders for css files and js files if you like (as shown). We will also make our app.R file (you can also break up the file into server, ui, and global files).

```
- app.R
- www/
    css /
        styles.css
    js /
        index.js
```

I won't cover the css for each theme. The only thing that you need to know is that there are two classes `.light-theme` and `.dark-theme`. Our js functions will add the class name to our UI and the browser will handle everything else.

<span id="ui" />

### Defining the UI

I will be using the `tagList` method for building the UI. Our UI will have a few elements - a title, some text about what the app does, and a button that will be used to switch themes. We will also create a text element that will display the name of the current theme in the top right corner of the screen. Here are the elements we will use to make our layout.

- `tags$head()`: we will define set the document's meta information for our page and load the css file. Meta information is used to describe a document which is read by the browser. There are many options available, but we will use some of the common ones. For more information, checkout [What's in the head?](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML) and [The Document-level Metadata element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) articles by Mozilla.
- `tags$header()`: this element will contain a single element, which is the text that displays the current theme. We will use the `tags$output()` element for this. We will also give it an id which we can target with our javascript functions.
- `tags$main()`: this element is used for all main content in a document. Using the `<main>` element follows good semantic html and helpful for those using assitive web technologies (i.e., web accessibility). (See [main reference page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) by Mozilla for more information). 
- Inside the `main` element, we will write all of our content in a `tags$section()`. Here's what we will write -
    - A title for the app - `tags$h1()`
    - Some text that describes the app and what to do - `tags$p()`
    - A button used to toggle themes -  `tags$button()` (this will be a custom button too)
- Lastly, we will link our javascript file

Here's what this all looks like put together.

```r
ui <- tagList(

    # head
    tags$head(

        # meta
        tags$meta("charset" ="utf-8"),
        tags$meta("http-equiv" ="X-UA-Compatible", "content" ="IE=edge"),
        tags$meta("name" ="viewport", "content"="width=device-width, initial-scale=1"),

        # calling our css file
        tags$link(type="text/css", rel="stylesheet", href="css/styles.css"),

        # define a title (to be display in the brower's window/tab)
        tags$title("Custom JS Handlers")
    ),

    # header
    tags$header(

        # output element that displays the name of the current theme
        tags$span(class="theme-label", "current theme:", tags$output(id="themeStatus"))
    ),

    # main content - manually set <main>
    tags$main(

        # wrap content in a section
        tags$section(`aria-labelledby`="title",

            # app title
            tags$h1("Custom JS Handlers", id="title"),

            # a paragraph about the app
            tags$p("This shiny app demonstrates how to create your own javascript functions and register them with shiny server. In this example, we created a simple javascript that toggles a css class and stores the user's selection to local storage, as well as display the selected theme in the top right corner. Click the button."),
            
            # theme toggle
            tags$button(id="toggleTheme", class="action-button shiny-bound-input", "Toggle Theme")
        )
    ),

    # load js
    tags$script(type="text/javascript", src="js/index.js")

)
```

It's important to note that if you are creating your own buttons, you will need to use the following css classes: `action-button shiny-bound-input` doing so will make the button available for use in the server. 

I also didn't talk about the last `div`. That's a surprise for when you run the app and toggle themes!

<span id="server" />

### Defining the server

Let's create a basic outline for our shiny server. It wouldn't have much at this point as we haven't written any javascript, but we can write the basics. We want our server to do two things.

1. Set the default theme when the app is started
2. Toggle themes when the button is clicked

Let's prep our server for this.

```r
server <- function(input, output, session){

    # set default theme
    # ...some code will go here...

    # event when button is clicked
    observeEvent(input$toggleTheme, {
        
        # ...some code will go here...

    })

}
```

To pass information from R to javascript, our server function must have `session` stated.


<span id="js" />

### Writing the javascript functions

Before we write our javascript, let's figure out what we need. So what do we really want our app really do? Let's revisit our list from earlier.

Our app will do three things.

1. Toggle between a light and dark theme, and display the name of the current theme 
2. Save the selected theme for later use
3. Load the last theme selected and set it as default when the app is started

This gives us an idea of what we want our app to do conceptually, so let's work through each item to get a better idea of the specific functions we will need. 

__1. Toggle between a light and dark theme__

All of our styles are defined in the css file and are associated with two classes: `.light-theme` and `.dark-theme`. We want to apply either style to an element (in our ui) of our choice so we will need a function that **adds** a theme to any element and one that **removes** a theme from any element. 

We will need another function to tie these together as it's still unclear what theme we want to add if another theme is present. We will need a function that **finds** the current css theme. 

__2. Save the selected theme for later use__

It would be great if we could **save** the selected theme so that when the user starts the app again, their last used theme is loaded by default. So let's write a function that **saves** this information somewhere.

__3. Load the last theme selected and set it as default when the app is started__

To apply the last used theme, we will need a function that retrieves the last used theme from wherever it is stored and apply it. So we will need some function to load our save preferences and then **set it as default**. 

We also want to **display** the name of the current them on the page so we will need a function that sends the theme name to some output element.

To summarize, we will want seven functions: add a css class, remove a css class, find the css class (i.e., theme), save the current theme, load the last theme, set last theme as default theme, and a function to display the name of the current theme. 

Let's start writing our functions.

#### The Add and Remove functions

First, we will write a function that adds our a css class to an element of our choice. We will use the function `querySelector()` to find our element that we name. We can access the classes of an element using `classList` and then apply a new class using `add()`.

```js
var addCSS = function(elem, css){
    var target = document.querySelector(elem);
    target.classList.add(css);
}
```

The remove css function works in the same way except we will use `remove()` instead.

```js
var removeCSS = function(elem, css){
    var target = document.querySelector(elem);
    target.classList.remove(css);
}
```

`Document` is used as we are saying to look anywhere in our document for this element. `querySelector` is generally used for finding elements by class name, but it can also be used for finding elements by tag name, id, or other attribute. There are other selector methods available. See [Locating DOM elements using selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors) for other methods. In this example, I'm using a single function for selecting elements for simplicity and demonstration purposes only. Ideally, you would want a function that selected elements by id (using `getElementById`) and another function that selects elements by class name (using `querySelector` or `querySelectorAll`). 

#### Finding the current theme

How will we know what theme is already present? To determine the current theme, we will write a function that reads the css class of the element of our choice and returns the theme. We will also want to define a default theme for the app in the event there isn't one saved or it cannot be found.

```js

// master app default theme
var appDefaultTheme = "light-theme";

// find function
var findCSS = function(elem){
    var target = document.querySelector(elem);
    var css = Array.from(target.classList)[0];
    if(typeof css === "undefined" || css === null){
        return appDefaultTheme;
    } else {
        return css;
    }
}
```

To get the current css class of the element, the css classes will need to be converted into an array. Since we are only targeting the `<body>` element which has only one class, the function will take the first element in that array (hence the `[0]`). If you are targeting another element that has more classes applied, you will need to adjust position in the array that you want to select or you write another function that matches the classes with the class of your choice. Since our example is simple, we will stick to the basics.

This function also has some logic to determine if the css them is undefined (i.e., there aren't any classes applied) and to return a default (in this case light theme). The main reason for using a default theme is that shiny automatically creates the document body (`<body>`) as opposed to having to manually define it using `tags$body()`. We could easily set the default theme by calling `tags$body(class="light-theme")`. However, this would produce nested `<body>` tags. which isn't ideal and can cause some problems with selector paths. Instead, we will leave out the `tags$body()` and target the `<body>` tag with javascript.

#### Save and load functions

Next, we will write two functions that handle the storage and retrival of our theme preferences. We will write a generic function that saves whatever value we pass to `localStorage` and a function that loads the value from `localStorage`. We will use `setItem` for saving and `getItem` for loading.

> It's important to note that there are differences in storage methods. The `localStorage` method is fine for very basic information (like setting default themes), but it isn't really a good method for sensitive information. See this [dev.to](https://dev.to) post on [localStorage vs sessionStorage](https://dev.to/caffiendkitten/localstorage-vs-sessionstorage-f9k) for more information and links for further reading.

Here's our save function.

```js
var save = function(value){
    localStorage.setItem("theme", value);
}
```

And the load function.

```js
var load = function(){
    return localStorage.getItem("theme");
}
```

For more information, please vist Mozilla's [Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) article.


#### Set default theme function

Now that we have written our save and load functions, we can write our set default function. This function will load the information and apply the theme according to what was saved (using our addCSS function). We will also want some logic to set a default theme (to the element of our choice) if there isn't any information in our local storage. Here's the function.

```js
var setDefault = function(elem){
    var defaultTheme = load();
    if(typeof defaultTheme === "undefined" || defaultTheme === null){
        addCSS(elem, appDefaultTheme);
    } else {
        addCSS(elem, defaultTheme);
    }
}
```

#### Display current theme name

Finally, we want to display the name of the theme in our app. We want to select the element of our choice and update it's content with the name of the current theme. We will use a different selector method from our add and remove functions. This time we will use `getElementById` and use `.innerHTML` to set the text of the element. 

```js
var setInnerHTMLById = function(id, string){
    var elem = document.getElementById(id);
    elem.innerHTML = string;
}
```

There we have it! All of our javascript functions are written.

#### Module Patterns

Before we move on to registering our functions, I want to touch on another aspect of our js code. 

If you look in the index.js file, you will notice that all of the js functions are assigned to a few objects `styles`, `file`, and `text`. The functions are structured in a [Revealing Module Pattern](https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/) which allows us to group similar functions into a single object and then use them as needed. This approach is recommended as it's good for decluttering the namespace and for resuability of functions across projects. Once you have written a series of modules, you can load your modules and start writing your javascript as normal without the need for rewritting or copy/pasting across projects.

These functions can be called by first specifying the object, and then the function. For example:

```js
// use the save function
file.save(...);

// use the add css function
styles.addCSS(...);

// use more than one 
function myfunction(...){
    styles.addCSS(...);
    text.setInnerHTMLById(...);
}

```

<span id="registering" />

### Registering the javascipt functions

Let's register the js functions with shiny.

The two functions we will use are `session$sendCustomMessage` and `Shiny.addCustomMessageHandler`. `session$sendCustomMessage` is used to send information from our shiny server to our js functions. 

- `session$sendCustomMessage(type, message)`: this function is a R function that is used in the shiny server to send information to javascript. This function takes two arguments `type` (the name of our js handler) and `message` the information we want to send to our js handler. The information sent to javascript can be a single value, data objects, and more than one element. Note: the information/data passed through `message` will be returned as a javascript array.
- `Shiny.addCustomMessageHandler(type, function(message){...})`: this function is a js function that is used to receive the information from our shiny server. The argument `type` is a unique name for our handler and the `message` (or information sent from the shiny server) is passed into a function. 

(If you want to send information back to shiny, you can find more in Shiny's [Communication with JS](https://shiny.rstudio.com/articles/communicating-with-js.html) article.)

In our app, we want to do two things.

1. Toggle the theme when a button is clicked
2. Set the user's default theme when the app is loaded

There isn't a need to register each function with shiny as this demo is pretty basic. Instead, we will write a handler for each action in our app.

#### `addCustomMessageHandler` for setting the default theme

Our custom message handler for setting the default them will do two things: set the default theme and update the theme name in our status bar. We will also use our `styles.findCSS()` function to return the value of the default theme. 

We will also need a unique name for our handler so we can call it from our server. Let's use `setDefaultTheme`.

```js
shiny.addCustomMessageHandler("setDefaultTheme", function(value){

    // run our set default function - the value is the name of the element we want to apply our style to
    file.setDefault(value) 

    // find the name of the theme applied and update text
    var currentTheme = styles.findCSS(value);
    text.setInnerHtmlById("themeStatus", currentTheme);

})
```

Notice that we haven't stated which element we want to apply the theme to. This value will come from the server.

#### `addCustomMessageHandler` for switching themes

Let's write our handler for toggling themes. We want this handler to do a few things.

1. Find the current theme (using `styles.findCSS()`)
2. Remove the current theme and add the new theme (using `styles.addCSS()` and `styles.removeCSS()`).
3. Update the display with the name of the current theme (using `text.setInnerHTMLById()`)
4. Save the selection (using `file.save()`)

Let's also give it a unique name. I'll use `toggleTheme`.

```js
Shiny.addCustomMessageHandler("toggleTheme", function(value){

   // find theme and init a var to write the name of the new theme
    var currentTheme = styles.findCSS(value);
    var newTheme = '';

    // run logic
    if (currentTheme === "dark-theme") {
        styles.removeCSS(value, "dark-theme");
        styles.addCSS(value, "light-theme");
        newTheme = "light-theme";
    } else {
        styles.removeCSS(value, "light-theme");
        styles.addCSS(value, "dark-theme");
        newTheme = "dark-theme";
    }

    // save theme and update output element
    text.setInnerHtmlById("themeStatus", newTheme);
    file.save(newTheme);

});
```

We are almost ready! Let's go back to our shiny server and call our handlers. 

<span id="js-running" />

### Running the js functions from the server

Since it's been a while, let's revist our list of what we want our app to do once more. We want our to do two things.

1. Toggle the theme when a button is clicked
2. Set the user's default theme when the app is loaded

To toggle the theme when a button is clicked can trigged using `observeEvent()`. We don't need to write any logic or functions for setting our default theme when the app is loaded as we want this to run when the app is started. We can simply place this at the top of our sever. 

We will call our handlers by using `session$sendCustomMessage()`. Our handlers require one argument `value`. In this example, it's the name of the element we want to apply our theme to, which is the entire page or the `body` of our document.

```r
server <- function(input, output, session){

    # set default theme (only on app startup)
    session$sendCustomMessage("defaultTheme", "body")

    # event when button is clicked
    observeEvent(input$toggle, {
        session$sendCustomMessage("toggleTheme", "body")
    })
}
```

Perfect! That's it. Now, run the app and toggle the theme.

<span id="know"/>

## What do I need to know before I intergrate this into my app?

A few tips before using this approach.

1. Determine the information you want to save. Is it sensitive? If so, consider other methods and speak with a security specialist. This approach is fine for storing basic information (e.g., theme preferences), but I wouldn't use this for anything more.
3. The css should work for all browsers. I didn't use an autoprefixer for this demo. It is recommended to use a css autoprefixer before using in a production app.

If you have any questions, feel free to open a new issue.

<span id="run" />

## How do I run the demo?

You can run this demo by cloing the [github repository](https://github.com/davidruvolo51/shinyAppTutorials) or by running the following code in R.

```r
install.packages("shiny")
shiny::runGithub(repo="shinyAppTutorials", username="davidruvolo51", subdir="js-handlers")
```