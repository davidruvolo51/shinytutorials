---
title: "Setting Document Attributes"
subtitle: "Improving the accessibility of Shiny apps"
abstract: "When evaluating Shiny applications in terms of web accessibility, assessment tools will always throw an error: 'Document language missing'. Shiny does not set this attribute and others like it by default. In this tutorial, we will learn how to fix this."
date: "2020-07-28"
updated: "2020-07-28"
keywords: ["js", "a11y"]
---

## Contents

1. [Why would I need this?](#about)
2. [How does this app work?](#work)
    1. [Define an R function to generate the required HTML](#work-r-func)
    2. [Write a JavaScript function that updates the document's attributes](#work-js-func)
    3. [Integrate the R and JS functions into the app](#work-shiny-app)
3. [What do I need to know before I integrate this into my app?](#know)
4. [How do I run the demo](#run)
5. [Further reading](#further-reading)

<!-- endexcerpt -->

<span id="about" />

## Why would I need this?

Recently, I have been focusing on improving the accessibility of shiny applications. When developing web-based projects, I use the [Web Accessibility Evaluation Tool (or WAVE)](https://wave.webaim.org) to make sure the content is accessible. This helps identify errors in the page structure and appearance. For building custom Shiny applications, using WAVE or other similar tool is essential. However, running the WAVE extension on shiny apps will always return the error: "Document language missing". To describe this error and how it can be fixed, let's take a look at the basic structure of a web document.

All websites, including shiny apps, have the same basic HTML structure: the document declaration (or `<!DOCTYPE *>`), the root element `<html>`, a `<head>` element (for defining meta properties, loading external files, etc.), and the `<body>` of the document (where all content goes).

```html
<!DOCTYPE html>
<html>
<head>...</head>
<body>...</body>
</html>
```

By default, the document language is unknown. Specifying the language does not only follow good web development practices, but it is important for individuals who use screen readers as "Identifying the language of a page allows screen readers to read the content in the appropriate language" (WAVE FireFox extension, accessed 17 July 2020). Setting the document language is also important if you have content that is written in one or more languages. To specify the language, add the property `lang` to the `<html>` element.

In addition to language, it is important to specify the direction of the content (either "left to right" or "right to left"). The direction of the content can be defined by adding the attribute `dir` to the `<html>` element by using "ltr" for left-to-right content or "rtl" for right-to-left content.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>...</head>
<body>...</body>
</html>
```

Adding the `lang` and `dir` attributes in shiny applications is not as easy as editing an HTML document. Shiny does not set the document language or direction by default nor is there a straightforward way to do so. Therefore, we must set these values using JavaScript.

In this tutorial, we will develop a simple shiny app that allows you to set and modify the document's HTML attributes using JavaScript. We will create an R function that will automate this process and write a couple of JavaScript functions to help process these values.

<span id="work" />

## How does this app work?

To build the app, here is what we will go over.

1. Define an R Function to generate the required HTML
2. Write a JavaScript function that updates the document's attributes
3. Integrate the R and JS functions into the app

<span id="work-r-func" />

### Define an R function to generate the required HTML

First, we will write an R function that renders the desired attribute values into an HTML element, which can be added to the document using JavaScript. This will make the process of modifying attribute values easier and allow you to add or remove attributes depending on the needs of your shiny app. 

In this example, we will be setting the HTML attributes `lang` and `dir`. The [lang attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) allows you to specify the language of the content. The [dir attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir) is the direction of the content. Direction can be "ltr" (for left-to-right content), "rtl" (for right-to-left content), or "auto".

I will give this R function a simple name `set_html_attribs` and set default values for language (`en` for English) and direction (`ltr` for left-to-right). The output of this R function is a hidden span element that has the html attributes defined as custom data attributes (visit [Mozilla's guide on data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) for more information). The span element will be assigned a unique ID that will be used to select element in the JavaScript function.

```r
set_html_attribs <- function(lang = "en", dir = "ltr") {

    # validate
    if (!is.character(lang)) stop("argument 'lang' must be a character")
    if (!is.character(dir)) stop("argument 'dir' must be a character")
    if (!dir %in% c("ltr", "rtl", "auto")) {
        stop("value for 'dir' is invalid. Use 'ltr', 'rtl', or 'dir'.")
    }

    # render hidden inline <span> element
    tags$span(
        id = "shiny__html_attribs",
        style = "display: none;",
        `data-html-lang` = lang,
        `data-html-dir` = dir
    )
}
```

<span id="work-js-func" />

### Write a JavaScript function that updates the document's attributes

Now we will create a JavaScript function that finds the span element and extracts the values from the custom data attributes. Using these values, we can set the language and direction attributes to the `<html>` element.

```js
function set_html_attribs() {
    const targetElem = document.getElementsByTagName("html")[0];
    const refElem = document.getElementById("shiny__html_attribs");
    targetElem.lang = refElem.getAttribute("data-html-lang");
    targetElem.dir = refElem.getAttribute("data-html-dir");
}
```

Next, create an event listener that runs the `set_html_attribs` function only when the page is loaded (i.e., `DOMContentLoaded`). Use the option `once` to remove the event after it has completed.

```js
window.addEventListener("DOMContentLoaded", function(e) {
    set_html_attribs();
}, { once: true });
```

<span id="work-shiny-app" />

### Integrate the R and JS functions into the app

Finally, let's build the demo app. Load the R function into the app and call the function `set_html_attribs` at the start of the shiny UI. At the end of the ShinyUI, call the JS file. (You may need to wrap your app in `tagList` if using other ShinyUI layouts.) 

Run the app and view the page source to find the `<html>` tag (it will be at the top of the page). This tag will now have the attributes `lang` and `dir`.

```r
# pkgs
library(shiny)

# source function
source("set_html_attribs.R")

# ui
ui <- tagList(
    set_html_attribs(),
    tags$h2("Setting HTML Attributes"),
    tags$p(
        "Use 'view page source' to see where the html attributes were added."
    ),
    tags$script(src = "set_html_attribs.js")
)

# server
server <- function(input, output) {

}

# app
shinyApp(ui, server)
```

<span id="know" />

## What do I need to know before I integrate this into my app?

You may want to add other important document tags for responsive design, good semantic HTML practices and for ensuring that your applications are accessible. These elements and attributes are not generated by shiny and there is not a clear way to add these without using JavaScript. For many of my apps, the `set_html_attribs` function looks like this.

```r
set_html_attribs <- function(title = "", lang = "en", dir = "ltr") {

    # validate
    if (!is.character(title)) stop("arugment 'title' must be a string")
    if (title == "") warning("value for 'title' is missing.")
    if (!is.character(lang)) stop("argument 'lang' must be a character")
    if (!is.character(dir)) stop("argument 'dir' must be a character")
    if (!dir %in% c("ltr", "rtl", "auto")) {
        stop("value for 'dir' is invalid. Use 'ltr', 'rtl', or 'dir'.")
    }

    # content to append to <head> + html attributes 
    tagList(

        # <head>
        tags$head(
            
            # document encoding
            tags$meta(charset = "utf-8"),

            # for MS Edge
            tags$meta(
                `http-quiv` = "x-ua-compatible",
                content = "ie=edge"
            ),

            # mobile optimization
            tags$meta(
                name = "viewport",
                content = "width=device-width, initial-scale=1"
            ),

            # link to stylesheets
            tags$link(
                rel = "stylesheet",
                href = "path/to/stylesheet"
            ),

            # document title
            tags$title(title)
        ),

        # render hidden inline <span> element
        tags$span(
            id = "shiny__html_attribs",
            style = "display: none;",
            `data-html-lang` = lang,
            `data-html-dir` = dir
        )
    )
}
```

Depending on the language of your application, you may need to specify a language subtag for regional dialects. If this is the case, I would recommend using the [Language Tag and Subtag finder](https://r12a.github.io/app-subtags/) to determine the appropriate language code.

<span id="run" />

## How do I run the example?

You can run this demo by cloning the [GitHub repository](https://github.com/davidruvolo51/shinyAppTutorials), opening the R project in `setting-html-attributes` folder, and clicking "Run App". Alternatively, you can run the app through the R console using the following command.

```r
shiny::runGithub(
    repo="shinyAppTutorials",
    username="davidruvolo51",
    subdir="setting-html-attributes"
)
```

<span id="further-reading" />

## Further Reading

Here is a list of all resources linked in this tutorial and more.

- [IANA's Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
- [Language Tag and Subtag finder](https://r12a.github.io/app-subtags/)
- [Mozilla's guide on the direction attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
- [Mozilla's guide on the language attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
- [W3's guide on specifying a language](https://www.w3.org/International/questions/qa-html-language-declarations)
- [W3's guide on specifying the dir attribute](https://www.w3.org/International/questions/qa-html-dir)
- [W3's QA on specifying right-to-left content](https://www.w3.org/International/questions/qa-scripts.en)
- [W3's specifications on the language attribute](https://www.w3.org/TR/html51/dom.html#the-lang-and-xmllang-attributes)


