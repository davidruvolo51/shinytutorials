---
title: "Linking Tabs - Part 3"
subtitle: "Creating links to specific elements on other pages"
abstract: "Okay. I have created custom navigation. What if my app has multiple pages with tabs. How do I go to a specific tab on another page?"
date: "2018-08-15"
updated: "2019-10-25"
keywords: ["javascript"]
---

## Contents

1.  [Why would I need this?](#about)
2.  [How does this app work?](#work)
3.  [How do I run the demo?](#run)

<!-- endexcerpt -->

<span id="about" />

## Why would I need this?

In [part 1](../internal-links-a/) and [part 2](../internal-links-b/),
we learned how to create custom links to other pages in our shiny app
and how to embed links in visualizations. But what if a shiny app uses
multiple tabPanels and tabsetPanels? Can we apply the same
concept to get to a specifc tab on another page?

Sort of. Let\'s dive into this.

<span id="work"/>

## How does this work?

Using the layout defined in the earlier example, we will expand on it to
include tabsetPanel. We then integrate the customHref function
to target a specific tab on another page.

### Building the UI

We will build the ui to include a tabsetPanel and assign the
value to each panel like we did in the earlier examples. We will
also define the server.

```r
# ui
ui <- tagList(

        # head
        tags$head(
                tags$script(src="func.js")
        ),

         # body
         navbarPage(
                tabPanel("tab 1", value="tab1",
                        tags$h1("Some Title"),
                        tags$a(...)
                ),
                tabPanel("tab 2", value="tab2",
                        tags$h1("Some Title"),
                        tabsetPanel(
                                tabPanel("subtab a", value="subtabA"),
                                tabPanel("subtab B", value="subtabB")
                        )
                )
        )
)

# server
server <- function(input,output){}  
```              

Let\'s take a closer look at the links.

### Defining the links

In code above, we will now fill in the tags\$a(). The formula is as
same as before: tags\$a(\[text to display\], \[onclick event\]). Try
setting our event as with the link to tab A on the second page.

```r
# using tags with js function
tags$a("onclick"="customHref('subtabB');","Go to the second tab on page 2")
```                

What happens? Nothing.

In order to move to specific tab on another page, we will make two calls
to the customHref function. The first call will be to the page where
the tab is located and the second is to the tab itself. We will change
our link to:

```r
# using tags with js function
tags$a("onclick"="customHref('tab2'); customHref('subtabB');","Go to the second tab on page 2")
```                

Now, set the links to go for other pages. Try adding more pages and more
tabs. Remember to get to a specific tab, first select the page the tab
is located on, and the select the tab.

<span id="run" />

## How can I run this app?

The source code is available on
[github](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/Internal-Links-Demo).
Alternatively, you can run the demo in R using the following code.

```r
# Run in R/Rstudio
install.packages("shiny")
shiny::runGitHub(repo="shinyAppTutorials",username="davidruvolo51",subdir="Internal-Links-Demo")
```
