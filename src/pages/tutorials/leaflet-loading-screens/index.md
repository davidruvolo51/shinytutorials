---
title: "Leaflet Busy Element"
subtitle: "Create a custom loading element for leaflet maps"
abstract: ""
date: "2020-04-02"
updated: "2020-04-02"
keywords: ["leaflet", "htmlwidgets", "css", "js"]
---

## Contents

1. [Why would I need this?](#about)
2. [How does this app work?](#work)
    - [Create a new shiny app](#work-new-app)
    - [Defining the loading UI](#work-loading-ui)
    - [Styling the loading UI](#work-ui-styles)
    - [Passing additional javascript functions to leafet](#work-js-leaflet)
3. [What do I need to know before I integrate this into my app?](#know)
4. [How do I run the demo](#run)

<span id="about" />

## Why would I need this?


In this tutorial, you will learn how to greate a loading UI for a leaflet output. The loading UI will appear during the initial rendering of the map (i.e., on load) and when a button is clicked. 

The app was originally written for this R community post: [Show leaflet spinner when rendering slow leaflet map in shiny](https://community.rstudio.com/t/show-leaflet-spinner-when-rendering-slow-leaflet-map-in-shiny/57896).

<span id="work" />

## How does this app work?

To get a custom loading UI working with leaflet, you will need a few things.

1. Creating a new shiny app
2. Defining the loading UI
3. Styling the loading UI
3. Passing additional javascript functions to leaflet

<span id="work-new-app" />

### Creating a new shiny app

First, create a new shiny app. I'm using the `app.R` approach and `tags` to build the UI. An external css file (`www/styles.css`) is loaded into the head of the document. I also created an action button as in the R community post, the user wanted to display the loading UI when a button is clicked. I left some blank space for the loading UI.

```r
# ui
ui <- tagList(
    tags$head(
        tags$link(
            rel = "stylesheet",
            href = "styles.css"
        ),
        tags$title("Leaflet Loading Sreens")
    ), 
    tags$main(
        tags$h2("Map Output"),
        actionButton("plotbutton", label = "Add Markers"),

        # loading ui
        ...
    )
)
```

In the server, I created a basic leaflet map using the example provided in the R leaflet's [README](https://github.com/rstudio/leaflet/blob/master/README.md) (accessed on 2020-04-02). Using the example provided in the R community post, I created an event that adds random markers when a button is clicked.

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

<span id="work-loading-ui" />

### Defining the loading UI

Now we will define the loading UI. I wrote a function `loading_message` that generates a loading UI using user defined message or loading dots. This function generates a container that wraps the leaflet output and loading UI. The subfunction `loading_elem` generates the markup for the loading mesage. 

I've added a loading message for better accessibility support. This won't be displayed in the app nor will it interfere with the layout. The class `visually-hidden` will be discussed in the next section.

```r
#' loading screen: primary component wrapper around child
#' and leafletOuput
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

# loading screen functional component: child element
loading_elem <- function(id, text = NULL) {
    stopifnot(!is.null(id))

    # generate element with dots
    el <- tags$div(
        id = id,
        class = "visually-hidden loading-ui loading-dots",
        tags$div(
            class = "dots-container",
            tags$span(class = "dots", id = "dot1"),
            tags$span(class = "dots", id = "dot2"),
            tags$span(class = "dots", id = "dot3")
        )
    )

    # add message if specified + update attribs
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

In the UI, the function can be called like so.

```r
# ui
ui <- tagList(
    tags$head(
        tags$link(
            rel = "stylesheet",
            href = "styles.css"
        ),
        tags$title("Leaflet Loading Sreens")
    ), 
    tags$main(
        tags$h2("Map Output"),
        actionButton("plotbutton", label = "Add Markers"),

        # loading ui
        loading_message(
            id = "leafletBusy",
            leafletOutput("map")
        )
    )
)
```

If you want to display a text-based loading UI, use the text argument. You can use any ID that you like.

```r
loading_message(id = "myID", text = "Map is Loading", leafletOutput("map"))
```

<span id="work-ui-styles" />

### Styling the loading UI

To display the loading UI over the leaflet map, use relative positioning on the loading container and asbolute positioning on the loading ui. This will place the loading UI on top of the map. In the javascript function we will write, we will add and remove a class (`.visually-hidden`) that shows and hides the loading element.

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

/* styles for loading message */
.loading-container .loading-message {
    font-size: 16pt;
    font-weight: bold;
    letter-spacing: 1.5px;
}

/* default loading: blinking dots */
.loading-container .dots-container .dots {
    display: inline-block;
    margin-right: 12px;
    background-color: #299996;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: none;
}

/* animations for blinking dots */
@-webkit-keyframes dotBlink {
    0% { opacity: 0; }
    75% { opacity: 1; }
}

@keyframes dotBlink {
    0% { opacity: 0; }
    75% { opacity: 1; }
}

#dot1 {
    -webkit-animation: dotBlink 1s infinite;
    animation: dotBlink 1s infinite;
}

#dot2 {
    -webkit-animation: dotBlink 1s .2s infinite;
    animation: dotBlink 1s .2s infinite;
}

#dot3 {
    -webkit-animation: dotBlink 1s .4s infinite;
    animation: dotBlink 1s .4s infinite;
}
```

<span id="work-js-leaflet" />

### Passing additional javascript functions to leaflet

To hide and show the loading element using javascript, attach js script using `onRender` function from the `htmlwidgets` package.  Using this approach, we can access leaflet events to display the loading UI when during the initial rendering of the map and when the button is clicked. JS scripts should start with `function(el, x, data){ ... }`

```r
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
            ) %>%
            onRender(., "function(el, x, data) {
                ...
            }")
    })

    ...
}
```

Inside the onRender script, we will start by adding selecting the leaflet map, loadinging ui, and the button. 

(For the rest of this section, I will be focusing on the onRender function only.)

```js
onRender(., "function(el, x, data) {
    
    // select elements
    const m = this;
    const elem = document.getElementById('leafletBusy');
    const b = document.getElementById('plotbutton');
}")
```

To display the loading ui during the initial rendering of the map, use the leaflet event `whenReady` to add/remove the css class `visually-hidden`. I added a delay of 3000ms. Adjust as needed.

```js
onRender(., "function(el, x, data) {
    
    // select elements
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
}")
```

The click event for the button will be structured differently then the initial event. I used a Promise that resolves when all layers are added to the map. This uses the leaflet event `layeradd`.

```js
onRender(., "function(el, x, data) {
    
    // select elements
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
        (new Promise(function(resolve, reject) {
            // leaflet event: layeradd
            m.addEventListener('layeradd', function(event) {
                console.log("adding element")
                // resolve after a few seconds to ensure all
                // elements rendered (adjust as needed)
                // time is in milliseconds
                setTimeout(function() {
                    resolve('done');
                }, 500)
            })
        })).then(function(response) {
            // resolve: hide loading screen
            console.log('done');
            elem.classList.add('visually-hidden');
        }).catch(function(error) {
            // throw errors
            console.error(error);
        });
    });
}")
```

<span id="know" />

## What do I need to know before I integrate this into my app?

This example may potentially be a solution although it requires a bit a hardcoding. I would recommend wrapping the on render script in a function and pass name the button ID, state the css class that hides the loading element, and to adjust delays as needed.

<span id="run" />

## How do I run the example?

The code for this app can be found on Github: [shinyAppTutorials/leaflet-loading-screens](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/leaflet-loading-screens). Alternatively, you can run the app directly from the R console.

```r
install.packages("shiny")
shiny::runGithub(repo="shinyAppTutorials", username="davidruvolo51", subdir="leaflet-loading-screens")
```