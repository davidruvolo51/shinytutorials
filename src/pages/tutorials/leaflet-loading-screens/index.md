---
title: "Leaflet Busy Element"
subtitle: "Create a custom loading element for leaflet maps"
abstract: "The leaflet package in R is great package for creating interactive maps in shiny. However, if you are using larger datasets or running a lot of server-side jobs, it may take some time for the leaflet map to render and update. Displaying progress indicators can improve the user experience by reassuring the user when something is happening and how long it might last."
date: "2020-04-02"
updated: "2020-04-02"
keywords: ["leaflet", "htmlwidgets"]
---

## Contents

1. [Why would I need this?](#about)
2. [How does this app work?](#work)
    - [Creating the structure of the shiny app](#work-new-app)
    - [Writing the HTML markup for the loading UI](#work-ui-html)
    - [Styling the loading UI](#work-ui-css)
    - [Writing javascript to control the loading UI](#work-ui-js)
3. [What do I need to know before I integrate this into my app?](#know)
4. [How do I run the demo](#run)

<span id="about" />

## Why would I need this?

The leaflet package in R is great package for creating interactive maps in shiny. However, if you are using larger datasets or running a lot of server-side jobs, it may take some time for the leaflet map to render and update. This may result in a poor user experience as the user will have to wait for some time until they can view the data or perform additional actions. It is possible to alleviate some of the waiting by rewriting reactive events to observe events, but sometimes that is not enough. Displaying progress indicators can improve the user experience by reassuring the user when something is happening and how long it might last. 

A quick side note: the 99% Invisible episode [Wait Wait...Tell me!](https://99percentinvisible.org/episode/wait-wait-tell-me/) provides a fascinating overview on the history of waiting and user interfaces.

There are some fantastic R packages for creating wait messages in shiny (e.g., [waitr](https://github.com/JohnCoene/waiter), [shinycustomloader](https://github.com/JohnCoene/waiter), etc.), but it is a bit tricky to add to work with leaflet. Instead, with a little bit of html, css, ans javascript, we can create our own. This tutorial provides instructions for creating a loading screen for leaflet outputs. Specifically, the example application will demonstrate how to -

1. Display a loading screen during the intitial rendering of a leaflet map, and to
2. Show the loading screen when a button is clicked and to remain visible until server-side processing is complete

The app was originally written for this R community post: [Show leaflet spinner when rendering slow leaflet map in shiny](https://community.rstudio.com/t/show-leaflet-spinner-when-rendering-slow-leaflet-map-in-shiny/57896).

> This tutorial focuses on javascript. Some experience will definitely help, but it is not required. I've tried to keep concepts simple and reference outside sources where possible. If you have suggestions for improvement or notice any errors, feel free to open a new [issue](https://github.com/davidruvolo51/shinytutorials/issues).

<span id="work" />

## How does this app work?

To get the app up and running, we need to complete a few things. In this section, I will cover the following items.

1. Creating the structure of the shiny app
2. Writing the HTML markup for the loading UI
3. Styling the loading UI
3. Writing javascript to control the loading UI 

<span id="work-new-app" />

### Creating the structure of the shiny app

Let's start off by setting up our project and creating the files. Create a new directory and an R project. Open the R project and then create the following.

```r
# in the console
file.create("app.R")
file.create("leaflet_loader.R")
dir.create("www")
file.create("www/styles.css")
```

In this example, I'm using the single `app.R` approach. I created a separate R file for the loading UI component and save all corresponding styles in a css file (located in the `www/` directory).

I'm using the [tags](https://shiny.rstudio.com/articles/html-tags.html) approach for the UI. `tags$link` is used to load the stylesheet. I'm wrapping everything in the `main` element. In the original post, the user wanted to show the loading UI when a button is clicked. I added an button and assigned the appropriate classes to register the element with shiny. I left some blank space for now. This space will be used for the leaflet loader, which will be discussed in a little bit.

```r
# ui
ui <- tagList(
    tags$head(
        tags$link(
            rel = "stylesheet",
            href = "styles.css"
        )
    ), 
    tags$main(
        tags$h2("Map Output"),
        tags$button(
            id = "plotbutton",
            class = "action-button shiny-bound-input",
            "Add Markers"
        ),

        # loading ui
        ...
    )
)
```

In the server, I created a basic leaflet map using the example provided in the R leaflet's [README](https://github.com/rstudio/leaflet/blob/master/README.md) (accessed on 2020-04-02). Using the [example](https://community.rstudio.com/t/show-leaflet-spinner-when-rendering-slow-leaflet-map-in-shiny/57896/10) provided in the R community post, I added an event that adds random markers around a coordinate set when a button is clicked.

```r
# server
server <- function(input, output, session) {
    # render map
    output$map <- renderLeaflet({
        # simulate building
        # build map
        leaflet() %>%
            addTiles() %>%
            setView(-93.65, 42.0285, zoom = 17) %>%
            addPopups(
                lng = -93.65,
                lat = 42.0285,
                popup = "Here is the <b>Department of Statistics</b>, ISU"
            )
    })

    # add points on render
    observeEvent(input$plotbutton, {
        dlat <- 1 / 111000 * 100 # degrees per metre
        n <- 100
        leafletProxy("map") %>%
            addMarkers(
                lng = -93.65 + (runif(n) * 2 - 1) * dlat * 3,
                lat = 42.0285 + (runif(n) * 2 - 1) * dlat
            )
    })
}
```

Now, let's focus on the loading UI.

<span id="work-ui-html" />

### Writing the HTML markup for the loading UI

In the file `leaflet_loader.R`, we will define a function that creates a loading UI. This function will take the leafletOutput and wrap it in a container. The container will also have a secondary child element that contains the markup for the loading message. In this example, the function will display a text message or display loading dots. (If you have your own icon, spinner, etc., you can substitute it here.). The returned html will look like this.

```html
<div class="loading-container">
    <div class="loading-ui">
        <!--- loader --->
    </div>
    <div id="map">
        <!--- leaflet output --->
    </div>
</div>
```

The showing of the loading element works by adding and removing a css class `.visually-hidden`. This class contains a few properties that hides the element visually by manipulating the width, height, overflow, and a few other properties of the element it is added to. This is likely better approach (performance wise) than using `display: none;` as the element isn't continuously added and removed from the document (this will be discussed in the next section).

Let's start with a secondary function that generates the loading message. This function will return the markup for the loading ui element based on whether or not the loader is a text message. To demonstrate a custom loader, I'm creating a series of dots that will be animated using css which will make them "blink".

```r
# loading screen functional component: child element
loading_elem <- function(id, text = NULL) {
    stopifnot(!is.null(id))

    # generate element with dots
    el <- tags$div(
        id = id,
        class = "visually-hidden loading-ui loading-dots",
        `aria-hidden` = "true",
        tags$div(
            class = "dots-container",
            tags$span(class = "dots", id = "dot1"),
            tags$span(class = "dots", id = "dot2"),
            tags$span(class = "dots", id = "dot3")
        )
    )

    # if a message is specified, then replace dots
    # and adjust classes
    if (length(text) > 0) {
        el$attribs$class <- "loading-ui loading-text"
        el$children <- tags$p(
            class = "loading-message",
            as.character(text)
        )
    }

    # return
    return(el)
}
```

Next, let's create a parent function that returns the loading element and leaflet output. This function will call the child function and return the loader and the leaflet output in a container.

```r
#' loader
loading_message <- function(..., id, text = NULL) {
    tags$div(
        class = "loading-container",
        tags$span(
            class = "visually-hidden",
            "loading"
        ),
        loading_elem(id = id, text = text),
        ...
    )
}
```

I've added a loading message for better accessibility support. This won't be displayed in the app nor will it interfere with the layout (I will update this element in the future after I do some more research on the best practices for loading messages).

When using the function, the leaflet output will be passed into the ellipses (`...`). Back in the `app.R` file, load the `leaflet_loader.R` and call the function like so:

```r
# component
source("leaflet_loader.R")

# ui
ui <- tagList(
    tags$head(
        tags$link(
            rel = "stylesheet",
            href = "styles.css"
        )
    ), 
    tags$main(
        tags$h2("Map Output"),
        tags$button(
            id = "plotbutton",
            class = "action-button shiny-bound-input",
            "Add Markers"
        ),

        # loading ui
        loading_message(
            id = "leafletBusy",
            leafletOutput("map")
        )
    )
)
```

If you want to display a text-based loading UI, then pass a message using the `text` argument. You may use any ID that you like.

```r
loading_message(id = "myID", text = "Map is Loading", leafletOutput("map"))
```

<span id="work-ui-css" />

### Styling the loading UI

Now I will focus on writting the css. I won't cover everything in the css file as this post can get quite long. I will focus on the elements that will help you create your own loaders.

The most important part is the class that hides and shows the loading element. The class `.visually-hidden` is used to reveal the loading UI during the rendering and updating of the leaflet map. This class is the closest to hiding the loading element without removing it from the page. Modifying the display properties of an element can disrupt the document structure as elements are removed from the page. This may be very disruptive for the user. Instead, the following class reduces the size to the smallest possible size.

```css
/* class to visually hide loading screens */
.visually-hidden {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
}
```

To display the loading UI over the leaflet map, use relative positioning on the loading container. For the loading ui, I used asbolute positioning and set the z-index to an arbitrary value. This will place the loading UI on top of the leaflet output.

```css
/* styling for loading container */
.loading-container {
    position: relative;
}

/* loading ui  */
.loading-container .loading-ui {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    text-align: center;
    z-index: 9999;
}
``` 

<span id="work-ui-js" />

### Writing javascript to control the loading UI

In this section, we will write the javascript to show/hide the loading screen during the intitial rendering of the leaflet map and when the button is clicked.

In early tests, I attempted to show and hide the loading element using [custom message handlers](https://shiny.rstudio.com/articles/communicating-with-js.html). It worked, but the results were inconsistent and it was very buggy. After searching forums for leaflet approaches and consulting the documentation, I realized that if I could "hook" into leaflet [DOMevents](https://leafletjs.com/reference-1.6.0.html#domevent) than it would be possible to control the loader from the htmlwidget. This was not as straightfoward as I originally thought. Writing functions in a separate js file and loading it into our app isn't possible due to the structure of htmlwidgets. Using the `onRender` function in the [htmlwidgets](https://cran.r-project.org/package=htmlwidgets), you can pass additional js code down to the htmlwidget.

In the `renderLeaflet` function, we will pipe the leaflet object into the `onRender` function.

```r
leaflet() %>%
    addTiles() %>%
    setView(-93.65, 42.0285, zoom = 17) %>%
    addPopups(
        lng = -93.65,
        lat = 42.0285,
        popup = "Here is the <b>Department of Statistics</b>, ISU"
    ) %>%
    onRender(., "
        // js code will go here
    ")
```

The first thing we will do, is define a new function. According to the documentation, the js code should start with `function(el, x)`. (In the following code blocks, I'll only focus on the javascript. See the `app.R` file for the complete code.)

```js
// inside the onRender
function(el, x, data) {

}
```

Inside the function, start off by selecting the primary elements: the leaflet map, the loading element, and the action button.

```js
// inside the onRender
function(el, x, data) {
    const m = this;
    const elem = document.getElementById('leafletBusy');
    const b = document.getElementById('plotbutton');
}
```

During the initial render of the map, we want the show to loader and then hide it when the map is complete. This can be done by using the leaflet event `whenReady` and attaching it to the map element `m`. The `whenReady` event will run fairly quickly (I think this triggers when base elements are generated), so I'm using [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) to delay the hiding of the element for 3000 milliseconds (adjust this value accordingly to fit your needs).

I'm using [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) to `add` and `remove` the `.visually-hidden` class from the loader.

```js
// inside the onRender
function(el, x, data) {
    const m = this;
    const elem = document.getElementById('leafletBusy');
    const b = document.getElementById('plotbutton');

    // when map is rendered, display loading
    // adjust delay as needed
    m.whenReady(function() {
        elem.classList.remove('visually-hidden');
        setTimeout(function() {
            elem.classList.add('visually-hidden');
        }, 3000)
    });
}
```

Using this same concept, we can apply it to the button event. The structure is quite different than the ready event as we want to show the loader when the button is clicked and then hide it once all new map elements are rendered. Let's start with the basics: define an event that shows the loader as soon as the button is clicked.

```js
// inside the onRender
function(el, x, data) {
    const m = this;
    const elem = document.getElementById('leafletBusy');
    const b = document.getElementById('plotbutton');

    // when map is rendered, display loading
    // adjust delay as needed
    m.whenReady(function() {
        elem.classList.remove('visually-hidden');
        setTimeout(function() {
            elem.classList.add('visually-hidden');
        }, 3000)
    });

    // click event
    b.addEventListener('click', function(event) {

        // show loading element
        elem.classList.remove('visually-hidden');

    });
}
```

The leaflet event `layeradd` is useful for running an event during an "update", but something else is needed to run additional functions when an event is completed. In this case, we will use a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to hide the loader once the layer is updated. Within the `layeradd` event, we will `resolve` the event after the event is finished. You can also set a delay to extend this action. Here's the basic structure for the layer event.

```js
m.addEventListener('layeradd', function(event) {
    // do something here
});
```

The basic structure of a promise looks like this. (You can assign the promise to a variable and then attach other `then`-s; see previous link for further information).

```js
(new Promise(function(resolve, reject) {
    
    // do something

    // resolve + pass data if required
    resolve('done'); 

}).then(function(response) {

    // do something on resolve
    

}).catch(function(error){

    // if there is an error,
    // throw
    console.error(error);
});
```

Inside the promise, we will write the `layeradd` event and add a timeout before the resolve. In the `then`, we will hide the loader. If there is an error in the promise, the `catch` will log it to the console. Here's the promise.

```js
(new Promise(function(resolve, reject) {
    
    // leaflet event: layeradd
    m.addEventListener('layeradd', function(event) {
        console.log("adding element");

        // resolve after a few seconds to ensure all
        // elements rendered (adjust as needed)
        // time is in milliseconds
        setTimeout(function() {
            resolve('done');
        }, 500)
    });

})).then(function(response) {
    
    // resolve: hide loading screen
    console.log('done');
    elem.classList.add('visually-hidden');

}).catch(function(error) {
    
    // throw errors
    console.error(error);
});
```

Here is the entire `onRender` function.

```js
// inside the onRender
function(el, x, data) {
    const m = this;
    const elem = document.getElementById('leafletBusy');
    const b = document.getElementById('plotbutton');

    // when map is rendered, display loading
    // adjust delay as needed
    m.whenReady(function() {
        elem.classList.remove('visually-hidden');
        setTimeout(function() {
            elem.classList.add('visually-hidden');
        }, 3000)
    });

    // click event
    b.addEventListener('click', function(event) {
        
        // show loading element
        elem.classList.remove('visually-hidden');

        // promise
        (new Promise(function(resolve, reject) {

            // leaflet event: layeradd
            m.addEventListener('layeradd', function(event) {

                // this log is for demonstration purposes only
                console.log("adding element")

                // resolve after a few seconds to ensure all
                // elements rendered (adjust as needed)
                // time is in milliseconds
                setTimeout(function() {
                    resolve('done');
                }, 500);
            });

        })).then(function(response) {

            // resolve: hide loading screen
            console.log('done');
            elem.classList.add('visually-hidden');

        }).catch(function(error) {

            // throw errors
            console.error(error);

        });
    });
}
```

That is it! See the `app.R` file for the complete code. Take a look at the css file for all of the styles used in the app. Don't forget to adjust the timeouts as needed.

<span id="know" />

## What do I need to know before I integrate this into my app?

This example works, but it requires a bit a hardcoding. I would recommend wrapping generating the on render script using a function. This would allow you to pass name the button ID, define the css class that hides the loading element, and to adjust delays. I will update the app when in the near future. Stay tuned!

Some of the timeouts are bit quick. You may want to extend them a bit to smooth out the events. You may also want to add some css [transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) to smooth out the hiding/showing of the loader.

<span id="run" />

## How do I run the example?

The code for this app can be found on Github: [shinyAppTutorials/leaflet-loading-screens](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/leaflet-loading-screens). Alternatively, you can run the app directly from the R console.

```r
install.packages("shiny")
shiny::runGithub(repo="shinyAppTutorials", username="davidruvolo51", subdir="leaflet-loading-screens")
```