---
title: "Data Editor"
subtitle: "A shiny app for editing data in a shiny app"
excerpt: "Have you ever wanted to edit data in a shiny app? Learn how to build a shiny app for editing data and saving changes to file, and then reloading the changes into your app."
date: "2018-03-01"
keywords: ["rhandsontable"]
---

## Contents
1.  [Why would I need this?](#data-editor-about)
2.  [How does the app work?](#data-editor-work)
3.  [How can I run the demo?](#data-editor-run)


<span id="data-editor-about"/>

## Why would I need this?


This app was created in order to figure out a question I\'ve had for a
while: \"How can I edit a dataset in a shiny app?\"

I\'ve developed several shiny apps for the monitoring for small clinical
studies and for scientific reporting. In previous situations, I\'ve used
a google form as data entry or I used excel forms to store data locally.
These methods are fine and they do the job, but it requires a strong
data management plan to ensure none of the data goes missing or gets
overwritten. This gets really messy if you have multiple people entering
and editing data.

A data editor would be useful in the event in this situation. This would
allow you to keep a master dataset and a historical record of all
changes. This would be help if fix typos or other necessary changes
(e.g., name changes, modifying a value if it was entered incorrectly,
updating information, etc.) on the fly rather than editing the master
file itself. This would be better than writing guides on how to modify
data, how to document changes, or even have an inbox full of data
modification requests.

In this tutorial, we will learn how to build a basic data editor in a
shiny using the rhandsontable package. Here\'s a preview of what we
will make.

![a recording showing how to edit values in a
table](https://raw.githubusercontent.com/davidruvolo51/shinyAppTutorials/master/Data-Editor/data-editor.gif)


<span id="data-editor-work" />

## How does the app work?

The app was developed with the help of vignettes in the wonderful
rhandsontable package, various features in the shinyBS and
shinyJS packages. In this example, we will using the `mtcars`{.data}
dataset.

To make the app work, there\'s base file `cars data.RDS`{.file}, which
is the primary data file (i.e., current).

### Building the UI

First things first - let\'s setup the ui. We will use a sidebar
layout for our app. We also create a set of buttons that will be used
for triggering the editor and for saving data. We will define the
following buttons

-   view: button to display the table as is (without editing
    privileges)
-   edit: button to render table as a rhandsontable output
-   cancel: button to discard all edits and return back to the
    normal table
-   save: button to save all edits
-   refresh: button to refresh the app (pull all changes in to the
    default view)

We will also create two modals. The first modal will be triggered when
the save button is clicked and will ask, are you sure you want to
save the changes?. If the user clicks yes, then the save function
will run. Once the file is saved, a confirmation dialogue will appear
(all changes were saved) and prompting you to refresh the app to view
the changes.

Here\'s what our ui looks like.

### Building the UI

```r
ui <- shinyUI(

    fluidPage(
        
        # shinyjs
        useShinyjs(),
        extendShinyjs(text = "shinyjs.refresh = function(){history.go(0);}"),
        
        # title
        titlePanel("Data Editor"),
        
        # set layout
        sidebarLayout(
            
            # sidebarpanel
            sidebarPanel(
                
                # text + buttons
                helpText("What would you like to do?"),
                actionButton("view", label = "view", icon = icon("binoculars")),
                actionButton("edit", label = "edit", icon = icon("pencil")),
                actionButton("cancel", label = "cancel", icon = icon("times")),
                actionButton("save", label = "save", icon = icon("save")),
                actionButton("refresh", label = "refresh", icon = icon("refresh")),
                
                # modal: confirm changes
                bsModal(id = "saveChanges", 
                        title = "Do you want to save changes?",
                        trigger =  "save", 
                        size = "small",
                        # text + buttons
                        wellPanel(
                            helpText("Saving will overwrite existing data! This cannot be undone."),
                            actionButton(inputId = "no", label =  "No"),
                            actionButton(inputId = "yes", label = "Yes")
                        )
                ),
                
                # modal: notification
                bsModal(id = "okay", 
                        title = "Save was successful!", 
                        trigger = "yes", 
                        size = "small",
                        
                        # notification
                        wellPanel(
                                helpText("Changes were saved successfully. Refresh the page for changes to take effect.")
                        )
                )
            ),
                                
            # main panel
            mainPanel(
                                    
                # orientation text: current mode - view vs edit
                uiOutput("helperText"),
                hr(),
                                    
                # table outputs
                dataTableOutput("table"),
                rHandsontableOutput("hot")
            )
        )
    )
)
```                

Now let\'s move over to the server.

### Building the server

Let\'s set the defaults. In our app, we\'ve created a helperText
element that will allow us to pass messages to the UI. This is useful
for letting the user know which mode they are currently in (e.g., view
or edit). We will set a default message to view. We will also set
the default dataTableOutput to render our dataset as is. Also by
default, we will hide the cancel, save, and refresh buttons
as these buttons are only necessary in editing mode. There are also
a few events for showing and hiding buttons. I won\'t go into detail in
this guide. The source code is self explanatory.

The most important default is preparing an object to process the changes
from the editing mode. We will create a reactiveValue object and call it
values. Here\'s what our server setup looks like when we put in all
of the default parameters. We will set up the observeEvents for all of
the buttons. Also we will also define the logic for loading in the
dataset.

```r
# logic for loading data file using mtcars
testFile <- "cars_data.rds"


# if our data file exists, otherwise create it!
if(file.exists(testFile)){
    mtcarsDF <- readRDS("cars_data.rds")
} else {
    mtcarsDF <- mtcars
    row.names(mtcarsDF) <- NULL
    mtcarsDF$car <- row.names(mtcars)
    mtcarsDF <- mtcarsDF[,c(12, 1:11)]
}


# server 
server <- function(input, output, session){

    # orientation text: mode - view vs edit
    output$helperText <- renderUI({
        h3("View Mode")
    })
                                
    # datatable: view
    output$table <- DT::renderDataTable({
        DT::datatable(mtcarsDF, selection = "none")
    })
                                
    # initiate values for edits
    values = reactiveValues()

    # refresh page
    observeEvent(input$refresh, {
        js$refresh()
    })

    # if view or cancel is clicked, go back to default view
    observeEvent({input$view input$cancel}, {
        ...
    })

    # switch to editing mode
    observeEvent(input$edit, {
        ...
    })

    # save changes
    observeEvent(input$yes,{
        ...
    })
}
```                 

The events for view, cancel, and refresh are pretty straightforward.
These events show and hide buttons, as well refresh the view. Let\'s
focus on the events for editing and saving

### Editing Mode

When the user clicks the edit button, the displayed table switches to an
rhandsontable output. The following code allows us to make changes and
directly render the changes in the ui. It also stores the changes into
our reactive object values.

```r
observeEvent(input$edit, {
    ...

    # make data.frame of edits
    data <- reactive({
    
        if(!is.null(input$hot)){
            DF <- hot_to_r(input$hot)
        } else {
            if(is.null(values[["DF"]])){
                DF <- data.frame(mtcarsDF)
            } else {
                DF <- values[["DF"]]
            }
        }
                            
        values[["DF"]] = DF
        DF
                            
    })
                        
    # render table
    output$hot <- renderRHandsontable({
        DF = data()
        if (!is.null(DF))
            rhandsontable(DF, stretchH = "all")
        })
})
```             

### Saving Changes

In this app, we\'ve defined the save process as:

1.  Create a backup of the master file we will rename our current
    master file to include a timestamp (the time the save event was
    triggered).
2.  Create a new master file: Now that we\'ve created a backup of
    our master, we can now create a new master file that includes all of
    the changes we made. The present method saves the changes to a
    .RDS file. Alternatively, you can write the changes to csv or
    your preferred place (e.g., googlesheets, mongoDB, etc.).

```r
# When yes is clicked, save data as RDS
observeEvent(input$save,{
                        
    finalDF <- isolate(values[["DF"]])

    # write data + backup current version
    if(file.exists("cars_data.RDS")){
                        
        # rename current master file
        file.rename(
            from = "cars_data.RDS",
            to = paste0("cars_data_",format(Sys.time(),"%Y%m%d-%H%M%S"),".RDS")
        )
                        
        # write edits to file
        saveRDS(mtcarsDF, file = "cars_data.RDS")
                        
    } else {
                    
        # save data if a master file isn't present
        saveRDS(mtcarsDF, file = "cars_data.RDS")

    }

})
```        

Once the save event runs, the user will receive a notification saying
that the file was saved and will inform the user to refresh the page.
When the page is refreshed, the master file will be reloaded and the
previous version will be uneffected. Creating backups is a good way to
track changes in the data. The timestamp is formated to:
yyyymmdd-HHMMSS. Seconds may not be necessary in all cases; adjust as
required.

<span id="data-editor-run" />

## How can I run the demo? {#data-editor-run}


The source code is available on
[github](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/Data-Editor).
Alternatively, you can run the demo in R using the following code.

```r
# Run in R/Rstudio
install.packages("shiny")
shiny::runGitHub(repo="shinyAppTutorials",username="davidruvolo51",subdir="Data-Editor")
```