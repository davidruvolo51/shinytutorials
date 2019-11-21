---
title: "Data Editor"
subtitle: "A shiny app for editing data in a shiny app"
abstract: "Have you ever wanted to edit data in a shiny app? Learn how to build a shiny app for editing data and saving changes to file, and then reloading the changes into your app."
date: "2018-03-01"
updated: "2019-11-21"
keywords: ["rhandsontable"]
---

## Contents
1.  [Why would I need this?](#about)
2.  [How does the app work?](#work)
    1. [Defining the features](#work-features)
    1. [Building the UI](#work-ui)
    1. [Building the server](#work-server)
        1. [Loading data](#work-server-loaddata)
        2. [Application Defaults](#work-server-defaults)
        3. [Events for View and Cancel](work-server-view)
        4. [Editing mode](#work-server-editing)
        5. [Saving data](#work-server-saving)
3.  [How can I run the demo?](#data-editor-run)

<span id="about"/>

## Why would I need this?

I created this example in response to a question that I had while working on a project: "How can I edit a dataset in a shiny app?"

Editing data in a shiny application would be pretty useful as the changes could automatically be reflected in the visualizations, text, or other elements. This would also eliminate the need for editing values using other tools and duplicating files.  

In this tutorial, we will create a data editor shiny application using the rhandsonpackage.

<span id="work" />

## How does the app work?

To get the shiny app running, we will develop our application step-by-step. First, we build our UI and then write then server code to handle all of the features we want in our app. 

In this example, we will using a subset of the [NYC Dog Licensing Dataset](https://data.cityofnewyork.us/Health/NYC-Dog-Licensing-Dataset/nu7n-tubp). I randomly pulled 100 rows from the file. See the script `data_0_source.R` in the `scripts/` folder for the code. I did not include the full dataset as it's quite large. Use the link above to download the file and adjust the script as necessary.

<span id="work-features" />

### Defining the features

To start off, we should make a list of things we want the application to do. For example, when we load the application, what do we want to see first?

1. **viewer**: When the app loads, it would be nice to display the data in a table. We probably do not want to encourage users to edit data right away, but have it as a feature. In your application, it might be a good idea to create user groups to control who can edit data.
2. **editor**: Since the data will be displayed as view only by default, it would be nice to have something that starts the editing mode. A button would be perfect for this.
3. **cancel**: A cancel feature would be perfect for this application. For example, if a user enters the wrong information or decides not to edit data, then it would be useful to have a way to discard the changes and exit the editing mode.
4. **save**: Most importantly, we will need an option that saves our data. We might also want to archive previous versions in the event we need to undo changes.
5. **refresh**: Once the changes have been saved, we will need to refresh the application so the changes can be reflected in the table.

For now, we will focus on these items. This list gives us some basic features for our designing the interface.

<span id="work-ui" />

### Building the UI

Using the list of features, let's figure out how to structure the interface. Since we five key actions in our app (view, edit, cancel, save, and refresh), we can use buttons as we want to trigger events on demand. The buttons should be positioned in a "settings panel" and then the main area of the app should display the data table. 

The best option for the layout would be the `sidebarLayout`. This would allow us to put all the buttons in the `sidebarPanel` and render the table in the `mainPanel`.

```r
ui <- fluidPage(

    # use shinyjs
    shinyjs::useShinyjs(),

    # app title
    titlePanel("Data Editor"),

    # main layout
    sidebarLayout(

        # sidebar
        sidebarPanel(
            helpText("What would you like to do?"),
            
            # buttons: view, edit, cancel, save, refresh
            actionButton("view",label = "view", icon=icon("binoculars")),
            actionButton("edit",label = "edit", icon=icon("pencil")),
            shinyjs::hidden(
                actionButton("cancel", label = "cancel", icon=icon("times")),
                actionButton("save", label = "save", icon=icon("save")),
                actionButton("refresh", label = "refresh", icon = icon("refresh"))
            )
        ),

        # main panel
        mainPanel(
            tags$h2(textOutput("helperText")),
            DT::dataTableOutput("dt_view"),
            rhandsontable::rHandsontableOutput("dt_edit")
        )
    )
)
```

It's important to note the use of `shinyjs::hidden`. When the application loads, cancel, save and refresh only apply to the editing mode. We will hide these buttons by default and show them as necessary.

In the main panel, there are two table outputs: one for `DT` and one for the `rhandsontable` output. In the server, we will use the shinyjs package to hide and show the tables. There's likely a better way to render the tables, but for now, this will help us get the application running.

Take at look at the heading.

```r
tags$h2(textOutput("helperText"))
```

The header will receive text output from the server. We will update the text depending on the current mode the user is in (i.e., viewer or editor).

We will also create two prompts, or modals using the shinyBS package. The first modal will be triggered when the save button is clicked and will ask the user, "are you sure you want to save the changes?". If the user clicks yes, then the save function will run. Once the file is saved, a confirmation message will appear (all changes were saved) and prompting you to refresh the app to view the changes. I'll put these before the `titlePanel`.

```r
# dialogue box: 'Are you sure you want to save changes?'
bsModal(id = "savePrompt",  title = "Do you want to save changes?", trigger ="save",  size = "small",
    wellPanel(    
        helpText("Saving will overwrite existing data! This cannot be undone."),
        actionButton(inputId = "no", label =  "No"),
        actionButton(inputId = "yes",label = "Yes")
    )
),
                
# dialogue box: 'Changes were saved'
bsModal(id = "saveSuccess", title = "Save was successful!", trigger = "yes", size = "small",
    wellPanel(
        helpText("Changes were saved successfully. Refresh the page for changes to take effect.")
    )
)
...
```

<span id="work-server" />

### Building the server

In the shiny server server, we will define five elements.

1. `load the data`: You can source data using a file input widget, from a repository, or a database. In this example, we will use the file located in the data folder.
2. `defaults`: We will need to define the application defaults such as setting the default view for the table, titles, and other variables that we will use in the server.
3. `view` and `cancel`: To simply things, we will create a single event that resets the app to view mode when the view button or cancel button is clicked.
4. `edit`: When the edit button is clicked, this will render the dataset as an editable table and start watching for changes. We will also update the ui by hiding and showing buttons and updating the title to "edit mode".
5. `save`: Lastly, we when the user is finished making changes, we will run some code to archive the pre-changed data and save the edited data as the new master file.

<span id="work-server-loaddata" />

#### Load data

In this example, I'm using a subset of the dataset [NYC Dog Licensing Dataset](https://data.cityofnewyork.us/Health/NYC-Dog-Licensing-Dataset/nu7n-tubp) which I saved to an rds file. 

```r
nycDogs <- readRDS("data/nyc_dogs.RDS")
```

The reason I mention this is that this application uses the file as the source of truth and will write changes to this file. By default, the pre-changed data is timestamped and archived in the `data/archived/` folder. We will revisit this a little bit later.

<span id="work-server-defaults" />

#### Application Defaults

Next, we will set the defaults for the application. We will set the default mode (view mode) for the data table and update the title. In addition, we will initiate the reactive object for the changes in editor mode and define the event for page refresh.

```r
# orientation text: mode - view vs edit
output$helperText <- renderText("View Mode")
    
# datatable default render
output$dt_view <- DT::renderDataTable({
        DT::datatable(nycDogs, selection="none")
})
    
# initiate values for edits
values <- reactiveValues()
    
# define refresh
observeEvent(input$refresh, {
    shinyjs::runjs("history.go(0)")
})
```
<span id="work-server-view" />

#### Events for View and Cancel

In the app, we want to give the user the change to exit the editor and go back to the viewer. In the ui, the two buttons `view` and `cancel` will be used to trigger this behavior. To make things easier, we can create one event for both buttons. This event will exit the editor and display the normal data table. We will also hide the save and cancel buttons as we are no longer in editing mode.

```r
observeEvent({
    input$view
    input$cancel
    },{
    shinyjs::show("view")
    shinyjs::show("edit")
    shinyjs::hide("cancel")
    shinyjs::hide("save")
    shinyjs::show("dt_view")
    shinyjs::hide("dt_edit")
        
    # modifying header text
    output$helperText <- renderText("View Mode")

    ...
)}
```

<span id="work-server-editing" />

#### Editing mode

Let's focus on the editing mode. First, we will remove the normal data table and show the rhandsontable output, as well as display the save and cancel buttons. We will also update the title to inform the user that there are in editing mode.

```r
observeEvent(input$edit, {
    shinyjs::hide("view")
    shinyjs::hide("edit")
    shinyjs::show("cancel")
    shinyjs::show("save")
    shinyjs::hide("dt_view")
    shinyjs::show("dt_edit")
    
    # update the helperText: "You are now in edit mode"
    output$helperText <- renderText("Edit Mode")
    ...
})
```

The following code allows us to make changes and directly render the changes in the ui. It also stores the changes into our reactive object values. We will use this object in the render function and send the output to the UI.

```r
# set reactive object for rhandsontable output
data <- reactive({
    if(!is.null(input$dt_edit)){
        DF = hot_to_r(input$dt_edit)
    } else {
        if(is.null(values[["DF"]])){
            DF = data.frame(nycDogs)
        } else {
            DF = values[["DF"]]
        }
    }
    
    values[["DF"]] = DF
    DF
})

# render table
output$dt_edit <- rhandsontable::renderRHandsontable({
    DF = data()
    if (!is.null(DF)){
        rhandsontable(DF, stretchH = "all")
    }
})
```


<span id="work-server-saving" />

#### Saving data

Before we write the data, it would be useful to save a backup of the master file - just in case we need to undo something or for validation. Since we want to save the data after the user has been prompted and has selected "yes", we will wrap this an event for `input$yes`. We do not need an event for `save` as the `shinyBS` package handles the opening and closing of prompts. We will also hide the save and cancel buttons and display the refresh button.

```r
# When yes is clicked, save data as RDS
observeEvent(input$yes,{
        
    # close popup 
    toggleModal(session, modalId = "savePrompt", toggle = "close")
        
    # closing: hide save buttons
    shinyjs::hide("save")
    shinyjs::hide("cancel")
    shinyjs::show("refresh")
    
    # save to RDS, but backup previous versions
    if(file.exists( "data/nyc_dogs.RDS" )){

        # c = file prefix & date & RDS
        file.rename(
            from = "data/nyc_dogs.RDS",
            to = paste0("data/archive/nyc_dogs_",format(Sys.time(),"%Y%m%d-%H%M%S"),".RDS")
        )

        # replace base file name with latest version
        saveRDS(out, "data/nyc_dogs.RDS")

    } else{
        saveRDS(out, "data/nyc_dogs.RDS")
    }
})
```        

Once the save event runs, the user will receive a notification saying that the file was saved and will inform the user to refresh the page. When the page is refreshed, the master file will be reloaded and the previous version will be uneffected as it is now stored in the archive folder.

That is it! Run the app and edit the data.

<span id="data-editor-run" />

## How can I run the demo?

The source code is available on [github](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/Data-Editor). Alternatively, you can run the demo in R using the following code.

```r
install.packages("shiny")
shiny::runGitHub(repo="shinyAppTutorials",username="davidruvolo51", subdir="Data-Editor")
```