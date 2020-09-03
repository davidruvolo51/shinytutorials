---
title: "Linking Tabs - Part 2"
subtitle: "Creating links to other pages within a leaflet map popup"
abstract: "Now that I created custom links, what can I do with them? How about adding them in a leaflet popup?"
date: "2018-08-01"
updated: "2020-09-03"
keywords: ["javascript","leaflet"]
---

## Contents

1.  [Why would I need this?](#about)
2.  [How does this app work?](#work)
    1. [Define the tabPanels](#work-panels)
    2. [Create a dataset](#work-dataset)
    3. [Build the map and create popups](#work-map)
3.  [How do I run the demo?](#run)
4.  [What's next?](#next)

<!-- endexcerpt -->

> This tutorial has been replaced by the [shinyLinks](../shiny-link/) tutorial. This post still works, but it will be archived. (03 September 2020)

<span id="about" />

## Why would I need this?

In the [part 1](../internal-links-a/), we learned about setting up `tabPanels` and building hyperlinks manually using a `javascript` function. This is great, but is there anything else we can do with these links? What about putting in a leaflet map?

In this tutorial, we will learn how to create links from a leaflet popup box to a `tabPanel`. In this example, I created a mini-tourism app of NYC where each point of interest (Central Park Zoo, Guggenheim Museum, and the Natural History Museum) has it\'s own page.

<span id="work" />

## How does the app work?

This demo was built to address this (link tbd) forum post.

<span id="work-panels" />

### Define the tabPanels

First, let\'s create the app.R file. We will define the ui and then the server. We will create four pages (tabPanel) in our ui - a home page and page for each point of interest. We will place the leaflet map on the home page as it will serve as navigation for our app.

```r
# ui
ui <- tagList(
        # head
        tags$head(
                tags$script(src="js/index.js")
        ),

        # body
        navbarPage(
                tabPanel("Home", value="home", leafletOutput("map")),
                tabPanel("Central Park Zoo", value="zoo"),
                tabPanel("Guggenheim Museum", value="guggenheim"),
                tabPanel("Natural History Museum", value="history")
        )
)

# server
server <- function(input,output){}
```          

<span id="work-dataset" />

### Create a dataset

Next, we will build dataset that will be used to plot points on a leaflet map. Let\'s pick a handful of places and pull their coordinates from google maps (straight from the url). We will also create a column hrefValue, which contains the names that will be sent to the value argument and used in the customHref function.

```r
# build data
mapDF <- data.frame(
        location=c("Central Park Zoo", "Guggenheim Museum", "Natural History Museum"),
        lat=c(40.76780, 40.78292, 40.78133),
        lng=c(-73.97191,-73.95907, -73.97413),
        hrefValue=c("zoo","guggenheim","history"),
        stringsAsFactors=FALSE
)
```        

<span id="work-map" />

### Build the map and create marker popups

Let\'s build the leaflet map. The links to other tabs will go into a
leaflet popup. For the popup argument in addMarkers(), you
will need to wrap the target value in paste0(). Leaflet will render
this as a url. In the server, our leaflet map would look like this:

```r
server <- function(input,output){
        
        # build map
        output$map <- renderLeaflet({
                leaflet(data = mapDF) %>%
                        setView(lat= 40.7752739, lng= -73.9688518, zoom= 14) %>%
                        addTiles() %>%
                        addMarkers(
                                lng = ~lng, 
                                lat = ~lat, 
                                popup = paste0(
                                        "Learn more about the ", 
                                        "<a onclick=", "customHref('", mapDF$hrefValue,"')>", 
                                        mapDF$location, 
                                        "</a>"
                                )
                        )
        })
}
```                    

Now our app is ready to go. Launch the app and click on the links we setup.

<span id="run" />

## How can I run this app?

The source code is available on [github](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/Internal-Links). Alternatively, you can run the demo in R using the following code.

```r
# Run in R/Rstudio
install.packages("shiny")
shiny::runGitHub(repo="shinyAppTutorials",username="davidruvolo51",subdir="Internal-Links")
```

<span id="next" />

## What's next?

Checkout [part 3](../internal-links-c/) of this series. In the next tutorial, we will bring everything from [part 1](../internal-links-a) and [part 2](../internal-links-b) and build a demo shiny app that creates links to specific tabs on other shiny pages.

