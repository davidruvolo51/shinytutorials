---
title: "Landing Page"
subtitle: "Custom home pages in shiny"
abstract: "Are you tired of the same start up pages? Learn how to create a cool landing page. This demo was inspired by a post on community.rstudio.com."
date: "2018-03-02"
updated: "2019-11-19"
keywords: ["css"]
---

## Contents

1.  [Why would I need this?](#about)
2.  [How does this work?](#work)
3.  [How do I run the demo?](#run)

<span id="about" />

## Why would I need this?

Over on community.rstudio.com, there was a [question](https://community.rstudio.com/t/background-images-in-shiny/12261) on placing content on top of four images arranged in a `2x2` layout. The purpose of this tutorial will describe how to design this page. 

Here's what we will create:

![](./landing_page_preview.png)

<!-- ![](https://raw.githubusercontent.com/davidruvolo51/shinyAppTutorials/master/shiny_landing_page/preview.png) -->

> **Note**<br>
> This tutorial focuses on html and css. Some experience of html and css
> will definitely help, but not required. I\'ve tried to keep concepts
> simple and reference outside sources where possible. If you have
> suggestions for improvement or notice any errors, feel free to open a
> new [issue](https://github.com/davidruvolo51/shinytutorials/issues).

<span id="work" />

## How does this work?

To achieve this design, we will use a few generic containers also know as a `div`. We will wrap two `div` elements (we will refer to them as children) in a master `div` (we will refer to this as the parent). One child element will be used for the images and the other child will be used for the content (that to be placed over the images). In shiny this would be written as:

```r
# parent
tags$div(
        # children
        tags$div(...),
        tags$div(...)
)
```

Using this structure, let\'s start by assign css classes.

### Building the ui and setting css classes

The parent `div` will receive the css class `landing-wrapper` and the child elements will recieve the css class `landing-block`. The `div` with images will also receive a css class of `background-content` and the `div` for the content to be placed on top of the images will receive a second css class `foreground-content`.

In our app, our ui will be written using html elements made available through `tags$...()`. We will also use an external css file to arrange our content. Create a blank css file and place it in the `www` directory in your project. We will call it something generic like `styles.css`. Since we are creating a layout of two rows with two images in each, we will load four images. Let\'s also add some generic text for the `foreground-content`.

In shiny, our ui would look like this.

```r
# ui
ui <- tagList(
        # head
        tags$head(
            tags$link(href="styles.css")
        ),

        # parent
        tags$div(class="landing-wrapper",

                # child: images
                tags$div(class="landing-block background-content",
                        tags$img(src="path/to/img/img1.png", alt="a description about this image"),
                        tags$img(src="path/to/img/img2.png", alt="a description about this image"),
                        tags$img(src="path/to/img/img3.png", alt="a description about this image"),
                        tags$img(src="path/to/img/img4.png", alt="a description about this image")
                ),

                # child: content
                tags$div(class="landing-block foreground-content",
                        tags$div(class="foreground-text",
                                tags$h1("Title"),
                                tags$p("some text"),
                        )
                )

        ) # end parent div
) # end tagList
```

In the above code, I added one additional `div` in the child used for the text. This is for extra control over the positioning of the content. This will come in handy later on.

It is good practice to set the `alt` attribute. This attribute will display text when an image fails to load, but more importantly it is as a description for individuals with visual impairments. Make sure if you are using images stored locally, these images need to be stored in the `www` directory.

> It\'s important to note that these css classes are for demonstration
> purposes only, you may want to use a naming system that makes sense for
> you.

### Defining the child elements

Now we can start applying to css properties to each class. Open up the css file. You can use rstudio to edit the file or any other text editor.

Let\'s start with the class `landing-block`. The purpose of `landing-block` is to apply the same styles to all children (the `div` that contains the images and the `div` that contains the text). You can use this class to set the text color in each child to blue or make background green. For now, we will use this class to make sure the height and width of all children are the same.

```css
.landing-block {
  width: 100%;
  height: 100vh;
}
```

`Note:` `vh` is a [Viewport Percentage Length](https://developer.mozilla.org/en-US/docs/Web/CSS/length#Viewport-percentage_lengths). Essentially, this allows you to set elements to the full height of the browser's viewable area.

Next, we will stay applying properties to the class `background-content`.

### Arranging the images

To get the 2-by-2 layout, we will use [css grid](https://css-tricks.com/snippets/css/complete-guide-grid/). CSS grid is a browser native two dimensional layout system. This means that elements can be arranged by columns and rows. There are many powerful features in grid (see link for more info) in this example we will specify the desired number of columns using the property `grid-template-columns`. To use css grid, simply set the property `display` to `grid` to the class `background-content`.

```css
.background-content {
  display: grid;
}
```

How do we set the number of columns?

The desired number of columns is defined by explicity setting the widths for each column followed by a space. You can use fixed widths (e.g., 250px), but it\'s easier to use relative widths (e.g., 25%, 50%, 62.7%, etc.) as these units will respond to browser widths and adjust accordingly if the user resizes the browser window.

In our example, we want a 2x2 layout. Since we are using the relative widths (i.e., %), the widths of our columns will be half of the total width (total possible width = 100%). Therefore, each column will have a width of 50%. This will written out as: `50% 50%`.

Going back the our class `background-content`, let\'s add in the columns. The property for setting the columns is `grid-template-columns`.

```css
.background-content {
  display: grid;
  grid-template-columns: 50% 50%;
}
```

We could write this another way using the `repeat` function. The function repeat allows us to duplicate a value a given number of times. The function looks like this `repeat(n, value`) where `n` equals the number of times to repeat the `value`. In our example, we could rewrite it as `repeat(2, 50%)`. This function is super handy if you have several elements of the same width. You can also mix and match `repeat` with explict naming of columns: `25% repeat(5, 10%) 25%`.

Before we move on to styling the foreground content, we will apply a couple of properties to the images. We want to make sure the images fit within each \"cell\" in the `background-content`. By default, image do not have default properties as a `div` and this can cause images to behavior differently. To correct this, we will modify the display property to `block`.

```css
.background-content img {
  display: block;
  width: 100%;
}
```

Why did it write this as `.background-content img`? This is known as a `descendent combinator`. A `descendent combinator` is a css selector path that allows us to apply styles to a elements that follow a similar path in the DOM. We could write this with `img` only, but all images in our app will be displayed to `100%`. This isn\'t ideal if we have logos or other images that should have fixed widths. See [Mozilla.com - css selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) for more information.

At this point, we have our images arranged. Update the links with four images of your choice and start up our app. What do you see?

### Arranging the text

Now we will style the `foreground-content`.

In the original post, the navbar page layout was used. In our css file, we will need to account for the height of that navigation bar at the top of the page (skip this part if you are using are using the standard html layout). We already set the height and width (see section 2) so now we need to adjust the foreground position so it sits on top of the images.

To do this we will set the `position` to `absolute`. This removes an element from the document flow allowing the element to \"float\" on the page. We will set the property `top` (the _y_ distance from the top of the page) to `10%` (10% is roughly the height of the navigation bar; adjust as necessary).

We will also need to make sure that our content stays on top of everything else. Setting the content\'s `z-index` to a high number allows us to do layer elements accordingly. The default `z-index` is 0 by increasing the `z-index` we are allowing content to be layered on top of other elements. We will set it to `9999`.

Lastly, we will also use css [flexbox layout](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to align items within their parent element (i.e., `landing-wrapper`). We want the content to be aligned vertically and horizontally. The property `justify-content` allows us to align items horizontally and the property `align-items` allows us to align items vertically. In our case, we will set both of properties to `center`.

Here's what it looks like.

```css
.foreground-content {
  position: absolute;
  top: 10%; /* use "top: 0;" if you are using a standard html page */
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

In the ui.R, we will add content to `foreground-content`. We will add a title and short sentence, and then wrap the text in a new `div`. We will also add in the image paths (make sure images are located in the `www` directory or have a valid url).

```r
ui <- tagList(
        # head
        tags$head(
            tags$link(href="styles.css")
        ),

        # parent
        tags$div(class="landing-wrapper",

                # child: images
                tags$div(class="landing-block background-content",
                        tags$img(src="www/img1.png", alt="a description about this image"),
                        tags$img(src="www/img2.png", alt="a description about this image"),
                        tags$img(src="www/img3.png", alt="a description about this image"),
                        tags$img(src="www/img4.png", alt="a description about this image")
                ),

                # child: content
                tags$div(class="landing-block foreground-content",
                        tags$div(class="foreground-text",
                                tags$h1("Title"),
                                tags$p("some text"),
                        )
                )
        ) # end parent div
) # end tagList
```

The flexbox attributes that we defined for the class `foreground-content` will push the element `foreground-text` to the middle of the page (vertically and horizontally).

At this point, the `foreground-text` isn't anything to write home about. It's black text on a series of images. We will add some basic styles to make this element standout a bit. Let's make the background color white and add a bit of padding around the text. We will also add a drop shadow to make content to appear on top of the images.

```css
.foreground-content .foreground-text {
  width: 50%;
  padding: 7.5%;
  color: black;
  background-color: white;
  text-align: center;
  box-shadow: 0 4px 6px 2px hsla(0, 0%, 0%, 0.18);
}
```

That's it! Our app is ready to go. We have our images laid out and we've placed some content on top. Enjoy!

<span id="run" />

## How do I run the demo?

The source code is available on [github](https://github.com/davidruvolo51/shinyAppTutorials/tree/master/shiny_landing_page). Alternatively, you can run the demo in R using the following code.

```r
# Run in R/Rstudio
install.packages("shiny")
shiny::runGitHub(repo="shinyAppTutorials",username="davidruvolo51",subdir="shiny_landing_page")
```
