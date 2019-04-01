---
title: "Linking Tabs - Part 1"
subtitle: "Creating Links to Other Pages in a Shiny App" 
excerpt: "Creating links to other pages in your shiny app can be challenging as ids are overwritten each time a shiny app launches. Instead, we will learn how to create new links using javascript."
date: "2018-03-01"
keywords: ["javascript"]
---

## Contents

1.  [Why would I need this?](#about)
2.  [How does it work?](#work)
3.  [Are there any issues?](#issues)
4.  [How do I run the demo?](#run)
5.  [What's next?](#next)


<span id="about" />

## Why would I need this?

Traditionally, web links are created by using the \<a\> element and
assigning a location through href. In shiny, you would do something
like this:

```r
# using tags
tags$a(href="target_page","Go to target page")
```                 

However, this approach will not work as every time a shiny app is
launched, the values for the href attribute in the \<a\> element(s)
are regenerated. This makes traditional hyperlink calls (as displayed
above) impossible. One way is to work with [data
attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes).

In this example, I\'ll be using the page layout navbarPage and
tabPanel. Let\'s take a look at tabPanel. As written on the
shiny reference page for
[tabPanel](https://shiny.rstudio.com/reference/shiny/latest/tabPanel.html),
tabPanel has the following arguments.

```r
# tabPanel function
tabPanel(title, ..., value=title, icon=NULL)
```                

The argument title receives the name of the tab. By default, the
argument value is assigned the value given to title. Using a
little bit of javascript, we can create a custom function that receives
a user-defined destination and searches the information in value in
order to find the tab with the matching destination.

It\'s important to note that even though value receives the values
from title by default, it is good practice to assign shorter names
to value to avoid matching errors. For example:

```r
# tabPanel function
tabPanel(title="My super duper cool home page", value="home")
```                

When shiny apps are launched, value is assigned the attribute
data-value. Using a little bit of javascript, we can use
data-value instead of href.

<span id="work" />

## How does the app work?


### Create Javascript function

The following function loops through all the values in the data-value to
look for the desired tab (adapted code from this [SO
question](https://stackoverflow.com/questions/36412407/shiny-add-link-to-another-tabpanel-in-another-tabpanel)).
When a match is found, simulate a mouse click using click (this will
advance the screen to the desired tab).

```javascript
# js file
var customHref = function(tabName) {
        var dropdownList = document.getElementsByTagName( class="value">"a");
                for (var i = 0; i < dropdownList.length; i++) {
                var link = dropdownList[i];
                if(link.getAttribute("data-value") == tabName) {
                        link.click();
                }
        }
};
```               

Using the home page we defined earlier, the custom link would look like
this:

```r
# using tags with js function
tags$a("onclick"="customHref('home')","Go to home page")
```                    

What this is saying is: 1) find me all elements with data-values and
return the values, 2) using the destination I defined, find a match in
those values, and 3) when a match is found, move to that tab.

### Setup ui.R (or app.R) file

You can either place this at the top of the UI or store in a separate
file and load using includeScript or tags\$script. In this
example, I placed the function in a separate file and reading it in
using tags\$script(src=\...).

```r
# ui.R or app.R
ui <- tagList(
        # head
        tags$head(
                tags$script(src="func.js")
        ),

        # ui
        navbarPage(
                ...
        )
)
```                 

### Create tabPanels and assign each one a unique value

Next, set up your tabs and give a unique name to the argument value.

```r
# ui.R/app.R
ui <- tagList(
        # head
        tags$head(
                tags$script(src="func.js")
        ),

        # ui
        navbarPage(
                tabPanel("tab 1", value="tab1"),
                tabPanel("tab 2", value="tab2"),
                tabPanel("tab 3", value="tab3")
        )
)   
```                  

### Define the links

In one or all the panels, make a custom link using tags\$a(). We
will also setup a blank shiny server.

```r
# ui.R/app.R
ui <- tagList(
        # head
        tags$head(
                tags$script(src="func.js")
        ),

        # ui
        navbarPage(
                tabPanel("tab 1", value="tab1",
                        tags$h1("Some Title"),
                        tags$a("onclick"="customHref('tab2')","Go to the second tab")
                ),
                tabPanel("tab 2", value="tab2",
                    tags$h1("Some Title"),
                    tags$a("onclick"="customHref('tab3')","Go to the third tab")
                ),
                tabPanel("tab 3", value="tab3",
                        tags$h1("Some Title"),
                        tags$a("onclick"="customHref('tab1')","Go to the first tab")
                )
        )
)

# server
server <- function(input,output){}
```
                    

Now our app is ready to go. Launch the app and click on the links we
setup.

<span id="issues" />

## Are there any issues?

Yes. If using bootstrap layouts, this does cause the navigation bar to
remain open on smaller devices after a link is clicked. To my knowledge,
there isn\'t a solution for this for shiny users.

<span id="run" />

## How can I run this app?

The source code is available on
[github](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/Internal-Links-Basic-Ex){.eLinks}.
Alternatively, you can run the demo in R using the following code.

```r
# Run in R/Rstudio
install.packages("shiny")
shiny::runGitHub(repo="shinyAppTutorials",username="davidruvolo51",subdir="Internal-Links-Basic-Ex")
```

<span id="next" />

## What's next?

Check out [part 2](../internal-links-b/) of this series.
