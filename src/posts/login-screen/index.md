---
title: "Login Screen"
subtitle: "Building a Simple Password Protected Shiny App"
excerpt: "In my app, I don't want every user to see every pages. Can I control this? Yes! Here's how to do it."
date: "2018-03-01"
keywords: ["access-control"]
---

## Contents

1.  [Why would I need a login screen?](#about)
2.  [How does the login screen work?](#work)
3.  [What else should I know before using this?](#whatelse)
4.  [How do I run the demo?](#run)

<span id="about" />

## Why would I need this?

You probably do not need and you should use other well-defined methods
than this one. The professional shinyapps.io account has a privacy
settings that allows you to make apps private, but it does require a
subscription. If you wanted to create an \'protected\' shiny app this
could be a potential solution that was inspired by a few SO posts. If
you setting up your own shiny server, there are tutorials and guides
available for protecting your applications using better methods.

<span id="work" />

## How does the app work?

The way to visualize the UI structure is that there are three different
\'screens\': 1) login, 2) standard user UI, and 3) admin UI. When the
user logs in, the username/password input is matched to the user account
dataset. If the credentials do not match, then an error message is
displayed. If successful, the credentials are matched to the
corresponding account type (standard or admin), which renders the
corresponding UI.

### Create a single line ui.R file.

This shiny app works by rending the UI on the server side on successful
login. The ui.R file looks like this.

```r
ui <- uiOutput("page")
```                

### Build the base **ui1()**

The base ui **ui1()** contains the structure and the styling for the
login screen. The login screen will have a short greeting and text
inputs for username and password. The function, **good\_time** returns a
time of day greeting (e.g., \'good morning\' or \'good evening\'; see R
file). Beneath the input box, we will also create a **uiOutput** for the
error message, which is described in the next step.

```r
# set ui1
ui1 <- function(){
        tagList(
                div(id="container",
                        div(id = "login",

                                # make login panel
                                wellPanel(id="well",
                                        HTML(paste0('<h2>Hello, ', good_time(),'</h2><br><h3>Sign in to your account.</h3>')),
                                        br(),
                                        textInput("userName","Username"),
                                        passwordInput("passwd", "Password"),

                                        # button
                                        actionButton("Login","Log in")
                                ),

                                # login error message
                                uiOutput("message")
                        )
                ),

                # css here
                ...
        )
}
```                   

### Define the user accounts

Create an object with allowed usernames and passwords. You can use email
addresses if that\'s easier and also assign initial passwords. You can
also generate random character strings using the
**stri\_rand\_strings()** function from the **stringi** package.

```r
# example accounts
| type     | Username       | password      |
---------------------------------------------
| standard | brooke7901     |  somePassword |
| admin    | shirley2131    |  somePassword |
| admin    | lindsey5876    |  somePassword |

# Build data.frame of user accounts
users <- data.frame(
        "User"=c("brooke7901","shirley2131","lindsey5876"),
        "Password"=c("somePassword","somePassword","somePassword"),
        stringsAsFactors=FALSE
)
```                

Make sure the user account information are stored separately and kept
secure. It would best to consult someone who is familiar with security
if you were planning to host on the web (Ideally, you would want to use
a well defined tool).

### Create an object that will handle the login status

Over on the shiny server code, let\'s create an object that will handle
the user login status (i.e., is the user logged in? yes or no?). Outside
the server code, we create the object **Logged** and set it to **FALSE**
(where **FALSE** means not logged in).

```r
# login status
Logged = FALSE
```                

We also place this into a **reactiveValue** object.

```r
# reactive values for login status
USER <- reactiveValues(Logged = Logged)
```                 

### Set Login Screen ObserveEvent

There is one **observeEvent** that checks the user inputs. This event is
triggered when the login button is clicked.

In the first block (\# render error message), the user input is checked
against the list registered users. If the credentials supplied does not
match any of the existing accounts, then it displays an error message.
The input data is matched with existing accounts by using **grep** to
scan through the data for matching username and password, and then
returns the length of the data. The return value is numeric and can only
have the values of 0 or 1 where 0 equals no match and 1 equals a
sucessful match. Both username and password have to return a value of 1
in order to move on.

The second block (\#check input) uses the same method except that when
credentials are successfully matched, it sets the object **Logged** to
TRUE. **Logged** is the current status of user where **TRUE** equals
logged in and **FALSE** equals logged out.

```r
# On login btn click
observeEvent(input$Login,{

        # render error message
        output$message <- renderUI({
                if(!is.null(input$Login)){
                        my_username <- length(users$User[grep(pattern = input$userName, x = users$User)])
                        my_password <- length(users$User[grep(pattern = input$passwd, x = users$Password)])
                        if(input$Login > 0){
                                if(my_username < 1 ||  my_password < 1){
                                        HTML(<div id='error-box'>Sorry, that's not the right username or password. Please, try again. </div>")
                                }
                        }
                }
        })

        # CHECK INPUT
        if(USER$Logged == FALSE) {
                if(!is.null(input$Login)) {
                        if(input$Login > 0) {
                            Username <- isolate(input$userName)
                            Password <- isolate(input$passwd)
                            Id.username <- which(users$User == Username)
                            Id.password <- which(users$Password == Password)
                                if(length(Id.username) > 0 & length(Id.password) > 0) {
                                        if(Id.username %in% Id.password) {
                                                USER$Logged <- TRUE
                                        }
                                }
                        }
                }
        }
})
```

### Rendering the UI When Logged = TRUE

Rendering the UI is fairly straightforward at this point and can be
triggered by a conditional statement. The following code demonstrates
how the object **logged** (as defined in the previous steps) is used to
render the UI.

If the value of **logged** == **FALSE**, then render the UI object
**ui1** that was defined in step 2. Since the initial value of
**logged** is **FALSE**, the login ui will render by default (e.g., on
app load).

```r
# render ui based on admin rights
observe({
        # when logged = FALSE
        if (USER$Logged == FALSE) {
                    output$page <- renderUI({
                        div(class="outer",do.call(bootstrapPage,c("",ui1())))
                })
        }

        # Render UI by user type when logged = TRUE
        if(USER$Logged == TRUE){
                
                # get the current user's authorization level
                user_log <- toupper(input$userName)
                    
                # if admin
                if(user_log == "ADMIN"){
                        output$page <- renderUI({
                                fluidPage(
                                        ...
                                )
                        })
                }

                # if standard user
                else{
                        output$page <- renderUI({
                                    fluidPage(
                                            ...
                                    )
                        })
                }
        }
})
```            

Setting admin rights is optional. If you do not want it, restructure the
**logged = TRUE** section as written below.

```r
# render ui without admin rights
observe({
        
        # when logged = FALSE
        if (USER$Logged == FALSE) {
                output$page <- renderUI({
                        div(class="outer",do.call(bootstrapPage,c("",ui1())))
                })
        } 

        # Render UI by user type when logged = TRUE
        if(USER$Logged == TRUE){
                output$page <- renderUI({
                        fluidPage(
                                ...
                        )
                })
        }
})
```
                    

You may replace **fluidPage** with any type of shiny ui layout (e.g.,
**sidebarLayout**, **tabsetPanel**, etc.). See
[shiny.rstudio.com/articles/layout-guide.html](https://shiny.rstudio.com/articles/layout-guide.html)
for more information.

<span id="whatelse">

## Thoughts

I\'ve used this method to create a project management tool to manage
daily activities and tasks. It was hosted on department servers and I
added this login screen only those with an account could view it. In the
live app, the account data was stored separately. I don\'t see much use
for it elsewhere and it was a pain to setup. The server side can get
messy pretty quickly, and we haven\'t added any code to build charts or
other elements. I wouldn\'t really use this if you have sensitive
information you\'d like to protect.

Alternatively, you can use the shiny package
[shinyauthr](https://paul.rbind.io/2018/11/04/introducing-shinyauthr/).

<span id="run" />

## How can I run this app?

The source code is available on
[github](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/Login-Screen).
Alternatively, you can run the demo in R using the following code. Use
one of the following accounts to login.

```r
# Run in R/Rstudio
install.packages("shiny")
shiny::runGitHub(repo="shinyAppTutorials", username="davidruvolo51", subdir="Login-Screen")

# sample accounts
| type     | Username | password |
----------------------------------
| standard | user     | password |
| standard | test     | test     |
| admin    | admin    | admin    |
```
