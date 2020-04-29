---
title: "shinyTravel"
subtitle: "My submission for the 2020 Shiny Contest"
abstract: "For the 2020 shiny apps contest, I developed an app that provides travel recommendations based on your preferences for coffee, breweries, and museums. This app demonstrates how to create a custom shiny framework and integrate non-R/non-shiny tools into the development process."
date: "2020-03-11"
updated: "2020-03-11"
keywords: ["contest"]
---

## Contents

1. [Introduction](#introduction)
2. [Methodology](#methodology)
    1. [Data](#methodology-data)
    2. [User Preferences](#methodology-userprefs)
    3. [Application Development](#methodology-application-development)
2. [Limitations](#limitations)
3. [Conclusion](#conclusion)

<!-- endexcerpt -->

<span id="introduction" />

## Introduction

I am originally from the USA but have lived abroad the last few years. I am currently living in Europe and have been fortunate to travel frequently. Before I visit a new city, I like to make a list of museums, specialty coffee roasters and cafes, and breweries. This allows me to make detailed travel itineraries so I can make the most out of my trip. However, this can be very time-consuming. I wanted an app where I could look at all potential destinations at once and view them on a map. I searched for other apps and projects but didn't find anything that suited my needs. So, like any other data scientist or web developer would do, I decided to create my own app: `shinyTravel`.

The `shinyTravel` app is a data-driven shiny app that provides European travel recommendations based on users' preference for visting breweries, museums, and cafes with specialty coffee. Users rate how important it is to visit these locations while traveling using a scale of *Not at all important* to *Essential*. Based on how the user rates each location type, they will receive a list of three recommended European cities. Users can limit the search to specific countries and can exclude the larger cities from the results. They can also explore all locations using an interactive map and view summarized data tables.

The `shinyTravel` app demonstrates how to design and develop a shiny application from scratch (i.e., shiny beyond bootstrap). This app also acts as an example of how to integrate frontend development tools into shiny to optimize apps for browsers and devices.

<span id="methodology" />

## Methodology

In this section, I will talk about the steps I took to source and clean the data, as well as how I developed the user preferences function. I will also provide information on the tools used to develop the app. More information on running and developing the app can be found in the app's [readme](https://github.com/davidruvolo51/travel-app).

<span id="methodology-data" />

### Data

I developed this app based on places that I like to visit when traveling: cafes with specialty coffee, breweries, and museums. 

I use the [European Coffee Trip](https://europeancoffeetrip.com) website to make sure I get great coffee when I visit a new city, so their [city guides](https://europeancoffeetrip.com/city-guides/) served as the starting point for building the coffee dataset. I took a [top-down approach](https://github.com/davidruvolo51/travel-app-data/blob/master/scripts/data_1a_source_coffee.R) to create the dataset. First, I extracted a list of cities by country and then extracted a list of cafes for each city. Once I had all the cafes, I was able to source cafe-level information (i.e., address, name, coordinates, etc.) from their respective page on the website. Additional [queries](https://github.com/davidruvolo51/travel-app-data/blob/master/scripts/data_1b_geocode_cafes.R) were sent to Google Places API to fill in missing data where possible. The coffee dataset was sourced using the `rvest`, `magrittr`, `stringr` packages. The `googleway` package was used to send requests to the Google Places API.

In order to source data for breweries and museums, I created a dataset of [unique cities](https://github.com/davidruvolo51/travel-app-data/blob/master/scripts/data_1c_build_cities.R). However, I needed to find the center point of each city (i.e., centroid). Initially, I calculated the centroid using the coordinates for all cafes. However, this wasn't an accurate measurement as not all cafes are located close to the city center. As a result, the center point was not always in the center of the city. For example, cities near the coast often had a center point located in the sea. To address this issue, I generated a bounding box for each city using the `getbb` function from the `osmdata` package. Centroids of each city were calculated using the mean of min/max latitude and longitude values. The following function was used to calculate the centroid coordinates:

```r
bb_centroid <- function(x) {
    d <- as.data.frame(x)
    return(
        data.frame(
            lng = (d$min[1] + d$max[1]) / 2,
            lat = (d$min[2] + d$max[2]) / 2,
            stringsAsFactors = FALSE
        )
    )
}
```
**Reference**: this function can be found in the following [script](https://github.com/davidruvolo51/travel-app-data/blob/master/scripts/utils/utils_1_brewery.R#L26).

Using the list of unique cities, I used the coordinates to write [Overpass API](http://overpass-api.de) queries to source breweries and museums in those cities. OSM tags were selected using [tagfinder.herokuapp.com](http://tagfinder.herokuapp.com) and queries were wrapped into a function that could be used in a loop. [Overpass Turbo](http://overpass-turbo.eu) was used to test and debug queries. Queries for breweries and museums were rewritten into functions that could be used in a batch querying script. All queries were structured to return nodes, ways, and relations. A 35000-meter search radius was used to limit the results around each city. These functions are listed below.

```r
# overpass api query for finding breweries
brew$overpass$new_query <- function(radius = 35000, lat, lng, timeout = 750) {
    paste0(
        "[out:json][timeout:", timeout, "];",
        "(",
        "nwr",
        "['craft'='brewery']",
        "(around:", radius, ",", lat, ",", lng, ");",
        "nwr",
        "['amenity'='restaurant']",
        "['microbrewery'='yes']",
        "(around:", radius, ",", lat, ",", lng, ");",
        "nwr",
        "['amenity'='pub']",
        "['microbrewery'='yes']",
        "(around:", radius, ",", lat, ",", lng, ");",
        "nwr",
        "['amenity'='bar']",
        "['microbrewery'='yes']",
        "(around:", radius, ",", lat, ",", lng, ");",
        "nwr",
        "['building'='brewery']",
        "(around:", radius, ",", lat, ",", lng, ");",
        ");",
        "out;",
        ">;",
        "out skel qt;",
        sep = ""
    )
}

# overpass api query for finding museums
museums$new_query <- function(radius = 35000, lat, lng, timeout = 750) {
    paste0(
       "[out:json][timeout:", timeout, "];",
        "(",
        "nwr['tourism'='museum']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='history']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='art']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='railway']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='local']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='open_air']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='technology']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='nature']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='military']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='archaeological']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='local']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='transport']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='living_history']", "(around:", radius, ",", lat, ",", lng, ");",
        "nwr['museum'='children']", "(around:", radius, ",", lat, ",", lng, ");",
        ");",
        "out;",
        ">;",
        "out skel qt;",
        sep = ""
    )
}
```

The scripts for running queries to find [breweries](https://github.com/davidruvolo51/travel-app-data/blob/master/scripts/data_2a_source_breweries.R) and [museums](https://github.com/davidruvolo51/travel-app-data/blob/master/scripts/data_3a_source_museums.R) in each city were run in RStudio cloud. API requests were sent using the `httr` package. Each script took several hours to run. All results were saved to json format. Data was extracted from json files using the `jsonlite` package. Not all queries returned the same data structure. Using the results for London, variables of interest were defined and used to evaluate missing variables in all data files. `NA` values were used for missing variables. The breweries and museums datasets were saved into separate files for additional geocoding.

[Nominatim API](https://nominatim.org/release-docs/latest/api/Overview/) queries were run to fill in missing information and geocoordinates. Using the OSM ID and type (e.g., way, node, relation), requests were sent to the `lookup` API using the `httr` package. The function used to build queries is listed below.

```r
tools$new_request <- function(id, type = "N", format = "json") {
    prefix <- "https://nominatim.openstreetmap.org/lookup?"
    output <- paste0("&format=", format)
    return(paste0(prefix, "osm_ids=", type, id, output))
}
```

Each script took several hours to run. All column names were standardized to make it easier to merge the data later on. All scripts and data were pushed to the `travel-app-data` repo, and then pulled into the `travel-app` repo.

To prepare the data for use in the app, all duplicated rows were removed and locations without names were excluded. Locations with missing coordinates were also removed. All locations were plotted on a map. For locations that mistakenly appeared in countries outside Europe, those incorrect coordinates were fixed. The datasets were reduced to columns of interest (id, country, city, coords, name, place type) and then merged into a master dataset: `all_european_places.RDS`.

The master dataset was used to generate a series of summary objects, including the number of places by city. The `places_by_city` object is the primary data source for the app as it contains the number of places per type by city. This data is used to create travel recommendations, generate input elements and filters, and render the summary tables. 

In total, eight datasets were created. Three of them are used in the final application and located in the `data/` directory. The filenames and descriptions can be found in the following table. See the file `data/data_1_prep.R` to see how these files were generated.

<div class="datatable-container">

| Name | Used in Production | Description
| :--- | :----: | :--- 
| `all_european_breweries.RDS` | no | the cleaned dataset containing the breweries by city
| `all_european_coffee.RDS` | no | the cleaned dataset containing the cafes with specialty coffee by city
| `all_european_museums.RDS` | no | the cleaned dataset containing the museums by city
| `all_european_places.RDS` | no | a master list of the breweries, cafes, and museums (used to create summary objects)
| `travel_all_cities_geocoded.RDS` | no | gecoded cities used to source breweries and museums
| `travel_summary_userprefs.RDS` | yes | a summary of locations by city for use in the user preferences function
| `travel_summary_general.RDS` | yes | a summary of locations for use in the visualizations
| `travel.geojson` | yes | a list of places by city in geojson format for use in the Mapbox map

</div>

<span id="methodology-userprefs" />

### User Preferences

The `travel_preferences` function was written to generate city recommendations based on how important it is to visit cafes, breweries, and museums. In the app, users are instructed to rate each location type on a scale of importance (e.g, `Not At All`, `Essential` , etc.). All the rating scales are custom-styled radio input groups where each radio input (i.e., choice) has a specific weight assigned to it. The least important choices are negatively weighted whereas more important choices are positively weighted. The `No Preference` choice is weighted as `0.1`. (Otherwise, the function would return cities in alphabetical order.) The choices and weights are listed in the following table.

| Scale | Weight
| :---- | :----:
| Not At All | -5
| Tend to avoid | -2
| No Preference | 0.1
| Tend to visit | 2
| Essential | 5

The [function](https://github.com/davidruvolo51/travel-app/blob/master/server/utils/travel_finder.R) has two input arguments: `weights` and `data`. The `weights` argument is a numeric array containing the user's preference for breweries, cafes, and museums (`-5`, `0.1`, `2`, etc.). The `data` input receives the post-filtered user preferences data. If the user has not applied the filters, then the complete user preferences dataset is passed into the function.

```r
travel_preferences <- function(weights, data) {

    #' Define a function that builds a blank user preferences object
    new_prefs <- function(data) {
        data.frame(
            id = data$id,
            city = data$city,
            country = data$country,
            lat = data$lat,
            lng = data$lng,
            data[, c("brewery", "cafe", "museum")] * 0,
            score = 0,
            stringsAsFactors = FALSE
        )
    }

    #' Create Required Objects (weights, references, and preferences)
    user_weights <- as.numeric(weights)
    refs <- as.matrix(data[, c("brewery", "cafe", "museum")])
    prefs <- new_prefs(data = data)

    #' Build a new score per city (weighted mean). I'm using my own
    #' weighted means formula in case I want to use the subscores in
    #' the app
    for (d in seq_len(NROW(refs))) {
        scores <- (refs[d, ] * user_weights)
        prefs[d, c("brewery", "cafe", "museum", "score")] <- cbind(
            rbind(scores),
            score = sum(scores) / sum(user_weights)
        )
    }

    #' Return
    return(prefs[order(prefs$score, decreasing = TRUE), ])
}
```

<span id="methodology-application-development" />

### Application Development

This app demonstrates how to create a custom shiny app by incorporating non-R/non-shiny tools into the development process.  I wanted to show how to optimize apps for all browsers and devices, as well as design a custom UI that follows recommended web accessibility practices. To build this app, I incorporated a few of my favorite frontend development tools, JavaScript libraries, and some command line tools. These are listed below.


<div class="datatable-container">

Category | Name | Purpose
| :--- | :--- | :------
| ide | [vscode](https://code.visualstudio.com) | primary IDE for R, CSS, JavaScript; for R, I used [radian](https://github.com/randy3k/radian) with the RLanguageServer and R LSP Client extensions
| cli | [npm](https://www.npmjs.com) | JavaScript package manager
| cli | [yarn](https://yarnpkg.com) | Javascript package manager; starting and building assets
| cli | [tmux](https://github.com/tmux/tmux) | a terminal mutiplexer for running multiple windows in a single view
| dev | [parcel](https://parceljs.org) | application bundler for integrating frontend tools in shiny application development process
| dev | [sass](http://sass-lang.com) | post-css module for writing css using variables, mixins, and more; output file is `www/css/styles.css`
| dev | [autoprefixer](https://github.com/postcss/autoprefixer) | a plugin for adding vendor prefixes to css
| dev | [cssnano](https://cssnano.co) | a plugin for optimizing and minifying css files
| dev | [babel.js](https://babeljs.io) | a dev tool for optimizing and minifying javascript code; output file is `www/js/index.min.js`
| viz | [d3](https://d3js.org) | javascript modules for creating web-based visualizations (used `d3v5`)
| viz | [topojson](https://github.com/topojson/topojson) | javascript modules for processing geodata for d3-based maps
| viz | [eu.topojson](https://gist.githubusercontent.com/milafrerichs/69035da4707ea51886eb/raw/4cb1783c2904f52cbb8a258ee96031f9054d155b/eu.topojson) | a topjson dataset containing all EU country boundaries
| viz | [mapbox](http://mapbox.com) | a WebGL API for developing vectorized maps in JavaScript

</div>

See the [README](https://github.com/davidruvolo51/travel-app/blob/master/README.md) for how to install these tools and run the development servers.

<span id="limitations" />

### Limitations

There are a few limitations to the design and use of the app. 

This data is based on cities that have specialty coffee cafes recommended by the [European Coffee Trip](https://europeancoffeetrip.com). This is in no way a comprehensive dataset of all European destinations. Over time, I may add more cities. I would also like to add restaurants and bakeries.

The most difficult aspect of this project was finding a comprehensive API for geocoding. I originally wrote the data sourcing scripts to use Google Places API. However, there were changes to their pricing tiers last year. After clicking the free trial ad to find out more, my daily limit was reduced to one request, and I could not continue until I submitted a valid form of payment. As a result, I was unable to use the Google Places API for building the brewery and museum datasets. Instead, I decided to use Open Street Maps. 

Even though OSM is free, it comes with its own issues. Results were inconsistent since some places were categorized as ways instead of nodes, which made it more difficult to extract precise coordinates and information. Some locations did not have the right tags, and the combination of tags I used sometimes resulted in the exclusion of well-known places from the dataset. I often encountered issues where valid coordinates were returned with no other identifying information (e.g., names, address, location, etc.). It was not feasible to verify ~90k places manually, so I removed all places where I could not find a name or coordinates.

<span id="conclusion" />

## Conclusion

I had a lot of fun&mdash;and consumed a lot of coffee&mdash;while developing this application. Custom shiny applications aren't impossible, but they do take some time to develop. However, the more you develop custom applications, the faster they are to build. 

I enjoy having the flexibility and freedom that comes from not using a UI framework. Creating a layout like this using a typical UI layout system could be done, but it would involve overwritting a lot of pre-defined styles and behaviors in the UI framework. This may be more hassle in the long run, so it's a lot easier to start from scratch.

I hope this is useful as a shinyapp example&mdash;and maybe even helpful for planning your next holiday.