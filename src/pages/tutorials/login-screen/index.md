---
title: "Login Screen"
subtitle: "Building a Simple Password Protected Shiny App"
abstract: "In my app, I want to set up some sort of user authentication where certain groups can see some pages and some groups can see all pages. Can I do this in shiny? Yes! Here's how to do it."
date: "2018-03-01"
updated: "2019-11-07"
keywords: ["access-control"]
---

## Contents

1.  [Why would I need a login screen?](#about)
2.  [How does the login screen work?](#work)
    1. [Creating the UI Components](#work-ui)
        1. [App Container](#work-ui-container)
        2. [Sign-in page](#work-ui-signin)
        3. [Main Page](#work-ui-main)
    2. [Building the user accounts dataset](#work-users)
    3. [Writing Server Logic](#work-server)
    4. [Render the UI based on sign-in status](#work-render)
    5. [Sign out function](#work-signout)
3.  [Further Thoughts](#further-thoughts)
4.  [How do I run the app?](#run)

<!-- endexcerpt -->

<span id="about" />

## Why would I need this?

This shiny app was developed to figure out if there was a way to provide some sort of user access control for shiny applications. There are plenty of other methods and packages available (the [shinyauthr](https://github.com/PaulC91/shinyauthr) package comes to mind); however, most projects that I work on require a specific design and brand. Rather editing existing approaches that may cause things to break, it's easier to build our own.

> I would use caution before implementing this method into any production app as there may be some unforeseen security issues (I'm not a security expert). If you have sensitive data, then you should follow guidelines and advice of your organization before developing any application.   

<span id="work" />

## How does the app work?

In this application we will focus on a few aspects. 

1. Creating the UI components
2. Building our user accounts dataset
3. Writing logic to process user inputs
4. Rendering the UI based on signin status (i.e., logged or not)
5. Signing users out.

There's a lot to cover so let's get started!

<span id="work-ui" />

### Creating the UI components

To create the ui, let's think about what we want to do.

1. **Sign in page**: We want a sign in page where users enter their account details. It might also be nice to provide some sort of user feedback (i.e., incorrect username, wrong password, invalid password, etc.).
2. **Main Page**: If a user has successfully logged in, we want the app to display a message. Something like "Hello" and "Welcome, \{username\}" would be nice to display.
3. **App Container**: Since we are rendering content based on whether or not a user is logged in, we will render our ui server-side. We will need to send it somewhere so we will create a generic output container.

If you want more pages, you will need to create them and then load them accordingly (server side). For larger applications, I would recommend creating a separate R file for the sign in page and all other page as it's easier to manage as smaller components.

<span id="work-ui-container" />

#### App Container

The purpose of the app container is to receive ui that is rendered from the shiny server. In this example, it is based on whether or not the user is signed in. We will also use this opportunity to load in other files that our app will use i.e., any css and js files.

We will use the `tagList` function to create our UI. Feel free to use `fluidPage` or any other layout that you like as long as it is wrapped in the `tagList` function. The css file will be loaded into the [head](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head) of our app `tags$head` using the `tags$link`. We will load the javascript file last before the closing `)` in `tagList` (if you are using js).

Here's what our app container looks like.

```r
ui <- tagList(

    # <head> & <link> css file
    tags$head(
        tags$link(type="text/css", rel="stylesheet", href="css/styles.css")
    ),

    # ui output
    uiOutput("app")

    # load js
    tags$script(type="text/javascript", src="js/index.js")
)
```

<span id="work-ui-signin" />

#### Sign in page

What do we want for the sign in page?

- Most importantly, we will need inputs for username and password. We will also need some labels to describe what each input is for. 
- Let's also add an action button as we want to run the sign in code only when the button is clicked. 
- It would be nice to add some form validation too so we will need some where to output messages (i.e., wrong username, fields are blank, incorrect details, etc.). 

This is list if pretty good, but how do we know what elements to use? Let's go through each item on our want list.

> Most importantly, we will need inputs for username and password. We will also need some labels to describe what each input is for. 

We will use the element [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) for username and password. In shiny, this can be made using `tags$input`. There are different input types that we can use. In this example, we will use `type="text"` for the username and `type="password"` for the password input. To use the input in our shiny server, we will need to set an input id (e.g., `username` and `password`).

Using the label element must be included for each input. This provides an explanation for each input. This is important for individuals who use screen readers or other web assistive devices. 

> Let's also add an action button as we want to run the sign in code only when the button is clicked. 

This is a simple one. We will create our own button using `tags$button`. Alternatively, you can `actionButton`. I think submit button would be more appropriate in this case as this follows good semantic html practices.

> It would be nice to add some form validation too so we will need some where to output messages (i.e., wrong username, fields are blank, incorrect details, etc.). 

In the frontend, this is fairly straightforward. After each input, we will create an element to send error messages from the server side. We will use the element [output](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output) for this. When we start writing the logic for processing the user inputs, we will add an extra line at each step to send a message to the ui.

A couple of other notes. Since we are creating a sign in form, we will wrap everything in the [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) element. For following semantic html and for positioning our form, we will wrap the form in the [main](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) element.

```r
signin <- tagList(
    tags$main(class="main signin-screen",

        # create a form
        tags$form(class="signin-form",

            # create a title for the form - 
            tags$legend("Sign in to your account"),
            tags$output(id="form_status", class="error-message"),

            # username input: <label>, <input>, <output>
            tags$label(`for`="username", "Enter your username"),
            tags$input(type="text", id="username"),
            tags$output(id="user_status", class="error-message"),
            
            # password input: <label>, <input>
            tags$label(`for`="password", "Enter your password"),
            tags$input(type="password", id="password"),

            # submit button
            tags$button(id="submit", type="submit", "Submit", class="action-button shiny-bound-input")
        )
    )
)
```

A few notes about the sign-in ui.

1. For forms, `tags$legend` is required as is describes what the form is for. This is important for making shiny apps accessible.
2. I created my own input button, you can use `actionButtion(inputId="submit")` if you like. If you create your own button, you will need the following classes `action-button shiny-bound-input`.
3. All labels must be linked to the corresponding input. This can be done by using the `for` attribute and entering the id of the input the label describes.

<span id="work-ui-main" />

#### Main page

For this example, I will create a simple ui component that greets the user and displays their name. I'll also add a button that will handle the sign out trigger the sign out function (more on that later). I won't spend as much time describing this ui as this is demonstration purposes only.

```r
main <- function(username){
    tagList(
        tags$main(class="main",
            tags$header(class="header",
                tags$h1("Welcome,", tags$span(username), "!"),
                tags$p("You are now signed in."),
                actionButton(inputId="signout", "Sign out")
            )
        )
    )
}
```

<span id="work-users" />

### Building our user accounts dataset

To build a user database, we will make a data.frame and populate it with a `username` column and a `password` column. We will assign it to the object `users` (you can use any name that you like). Each row will have one account. This example will use two example accounts: a standard user account and an admin account.

```r
users <- data.frame(
    "username" = c("user", "admin"),
    "password" = c("user1234", "admin1234"),
    stringsAsFactors = FALSE
)
```

Using the [sodium](https://cran.r-project.org/web/packages/sodium/index.html) package, we can encrypt our passwords. We will use the functions `password_store` and `password_verify` for handling all password data. To encrypt user passwords using `password_store`, we must pass a single string at a time. We can use the function `sapply` to iterate over our passwords.

```r
users$password <- sapply(users$password, password_store)
```

Save the data (with encrypted passwords) in an external file (`.rds` or `feather`). In the server, we will read this data in. In this example, I've kept the users object in the server code for ease of demonstration.

<span id="work-server" />

### Writing logic to process user inputs

Perfect! We have our users database working. Now let's write our sign-in logic.

We will set two global reactive values: `username` and `logged`. The object `username`  will receive the username when the user successfully logged in. `logged` is a logical flag that determines if the user is signed in.

```r
server <- function(input, output, session){
    
    # source handlers
    source("utils/server_01_handlers.R", local=TRUE)

    # define reactive values
    username <- reactiveVal(NA)
    logged <- reactiveVal(FALSE)

}
```

**NOTE:** I'm using a custom handlers here to send data to the ui (`innerHTML`). You do not need to use this method. This functions the same way as `shinyjs::html` but uses vanilla js as opposed to jQuery. See `index.js` for the corresponding javascript function and `utils/server_01_handlers.R` for more information. I won't cover them here. Checkout the [Creating Custom JavaScript Handlers tutorial](../js-handlers) for more information.

In our sign-in logic, when the user input for username and password match, we will update the `logged` value to `TRUE` and send update the `username`. Let's focus on the logic.

Since we want our code to run with the form is submitted, we will wrap all of the logic in an `observeEvent`. For form validation, we want to return a few error messages. The messages will inform the user that there is an error with one or more of the input fields. We will send a message when -

- One or more fields are empty
- When the username is incorrect (i.e., does not exist)
- When the password is incorrect (i.e., does not match with the username)
- When the username and password combination is incorrect

Let's build the code step by step. 

The first step in our code is to reset the form (i.e., remove error messages and error stylings).

```r
observeEvent(input$submit, {

        # reset all form statuses
        innerHTML(id="form_status", "")
        innerHTML(id="user_status", "")
        innerHTML(id="password_status", "")
        removeCSS(id="form", css="invalid-all")
        removeCSS(id="form", css="invalid-usr")
        removeCSS(id="form", css="invalid-pwd")

})

```

**NOTE:** Again, these are custom js handlers, see file `utils/server_01_handlers.js` for more information.

Next, we will create an object that we will reuse across the logic. This variable will return the row.index if the input for username exists. 

```r

observeEvent(input$submit, {

        # reset all form statuses
        innerHTML(id="form_status", "")
        innerHTML(id="user_status", "")
        innerHTML(id="password_status", "")
        removeCSS(id="form", css="invalid-all")
        removeCSS(id="form", css="invalid-usr")
        removeCSS(id="form", css="invalid-pwd")

        # search users for match this returns row.index
        # use it to verify password via sodium's password_verify function
        usr <- which(users$username == input$username)

})
```

Using the `length` of `usr`, we can determine if the input is correct. We can use this logic to evaluate if the credentials are correct. We will write three primary conditions: one for if the inputs are blank, one for if the length of usr is true (i.e., username exists), and one for if the length of the usr is false (i.e., username doesn't exist). Let's start writing this out. The final `else` condition will return an error.


```r

observeEvent(input$submit, {

        ...

        # search users for match this returns row.index
        # use it to verify password via sodium's password_verify function
        usr <- which(users$username == input$username)

        # logic for form validation
        if( input$username == "" || input$password == ""){
            
            # validate inputs and send error messasges

        } else if( length(usr) ) {

            # validate password

        }  else if( !length(usr) ){
            
            # send error messagse

        } else {
            
            # fall back - send general error message and add css classes
            innerHTML(id="form_status", "The username or password is incorrect")
            addCSS(id="form", css="invalid-all")
        }
})
```

Let's work through each condition.

In the first condition, we want to check which input field is missing and provide some feedback. The conditions that we can provide feedback are: when both inputs are missing, when only the username field is blank, and when the password field is blank.

```r
if(input$username == "" && input$password == ""){

    # both inputs are blank
    innerHTML(id="form_status","Username and password is missing.")
    addCSS(id="form", css="invalid-all")

} else if (input$username == "" && !(input$password == "") ){

    # username is blank
    innerHTML(id="user_status", "Username is missing")
    addCSS(id="form", css="invalid-usr")

} else if(!(input$username == "") && input$password == "") {

    # password is blank
    innerHTML(id="password_status","No password was entered.")
    addCSS(id="form", css="invalid-pwd")

} else {

    # fallback - something went wrong 
    innerHTML(id="form_status", "Something went wrong. Please enter your details again.")
    addCSS(id="form", css="invalid-all")

}
```

The functions `innerHTML` and `addCSS` are custom js handlers. The function `innerHTML` allows us to write text to the UI and the function `addCSS` adds a specifc css class to an element of our choice. In the css file `www/css/styles.css`, there are several corresponding class that add a red border around the input that has an error (i.e., `invalid-all`, `invalid-usr`, `invalid-pwd`).

If the inputs aren't empty, then we can validate the username. In the condtion `length(usr)`, we will validate the value from the password input. We will use the function `password_verify` from the `sodium` package to verify the value from the input `password`. This will return a logical value. If the value is true, that means the username and password are correct, and then we can update the reactive values (i.e., username and logged). If the value is `false`, then we will return an error message.

```r
# validate password
pwd <- password_verify(users$password[usr], input$password)

# password logic
if( pwd ){

    # update reactive values
    username(input$username)
    logged(TRUE)

} else {

    # display error message
    innerHTML(id="password_status", string="The password is incorrect.")
    addCSS(id="form", css="invalid-pwd")

}
```

For the last condition `!length(usr)`, we will return an error messasge saying the username is incorrect. Let's put this all together.


```r
observeEvent(input$submit, {

    # reset all form statuses
    innerHTML(id="form_status", "")
    innerHTML(id="user_status", "")
    innerHTML(id="password_status", "")
    removeCSS(id="form", css="invalid-all")
    removeCSS(id="form", css="invalid-usr")
    removeCSS(id="form", css="invalid-pwd")

    # search users for match this returns row.index
    # use it to verify password via sodium's password_verify function
    usr <- which(users$username == input$username)
        
    # logic for form validation
    if( input$username == "" || input$password == ""){
        # further validate blank inputs
        if(input$username == "" && input$password == ""){
            innerHTML(id="form_status","Username and password is missing.")
            addCSS(id="form", css="invalid-all")
        } else if (input$username == "" && !(input$password == "") ){
            innerHTML(id="user_status", "Username is missing")
            addCSS(id="form", css="invalid-usr")
        } else if(!(input$username == "") && input$password == "") {
            innerHTML(id="password_status","No password was entered.")
            addCSS(id="form", css="invalid-pwd")
        } else {
            innerHTML(id="form_status", "Something went wrong. Please enter your details again.")
            addCSS(id="form", css="invalid-all")
        }
    } else if( length(usr) ) {

        # validate password
        pwd <- password_verify(users$password[usr], input$password)

        # password logic
        if( pwd ){
            username(input$username)
            logged(TRUE)
        } else {
            innerHTML(id="password_status", string="The password is incorrect.")
            addCSS(id="form", css="invalid-pwd")
        }

    }  else if( !length(usr) ){
        innerHTML(id="user_status", "The username is incorrect")
        addCSS(id="form", css="invalid-usr")
    } else {
        innerHTML(id="form_status", "The username or password is incorrect")
        addCSS(id="form", css="invalid-all")
    }
})
```

That's it, fairly straightforward. Now that we have the logic, let's render the content accordingly.

<span id="work-render" />

### Rendering the UI based on signin status

Using the reactive object `logged`, we can render the main ui accordingly. By default, `logged` is set to `false`. When it's `false`, we want to display the sign-in page (ui component `signin`). When the user has signed in (i.e., `logged = true`), then we want to display the main page (the ui component `main`). We will define another observer that evaluates `logged`.

```r
observe({
    if( !logged() ){
        output$app <- renderUI(signin)
    } else {
        output$app <- renderUI({
            main(username())
        })
    }
})
```

<span id="work-signout" />

### Signing users out

Lastly, we handle the event for when the user signs out. This is pretty easy as it's updating the value of `logged` to `false`.

```r
observeEvent(input$signout, {
    logged(FALSE)
})
```

That's it! Run the app and try signing in with one of the accounts that we defined earlier. Try entering a random username and passwords to understand the form validation.


| username | password  |
| :------- | :-----    |
| user     | user1234  |
| admin    | admin1234 |

<span id="further-thoughts">

## Further Thoughts

I didn't cover the css here as there would be a lot to cover and I wanted to focus more on the R code.

This method offers some sort of "protection" for your app. I've used this method to create a project management tool to manage daily activities and tasks. It was hosted on department servers and I added this login screen only those with an account could view it. If you have sensitive data, you should follow your organization's guidelines for best practices and security guidelines.  

More work is needed to improve the accessibility of our form and the error messages; sepecially, how to focus on error messages for those using screen readers. I'm still researching best practices. Check back for updates.

<span id="run" />

## How can I run this app?

The source code is available on [github](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/Login-Screen). Alternatively, you can run the demo in R using the following code. Use
one of the following accounts to login.

```r
# Run in R/Rstudio
install.packages("shiny")
shiny::runGitHub(repo="shinyAppTutorials", username="davidruvolo51", subdir="Login-Screen")

# sample accounts
| username | password  |
------------------------
| user     | user1234  |
| admin    | admin1234 |
```
