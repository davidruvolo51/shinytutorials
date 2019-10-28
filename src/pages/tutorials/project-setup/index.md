---
title: "How I structure my shiny projects"
subtitle: "My default project structure and shortcuts"
abstract: "Over the years, I developed a standard project structure that works well with developing shinyapps. See how I structure projects and view my shortcuts for getting projects up and running."
keywords: ["workflow"]
date: "2019-04-16"
updated: "2019-10-25"
---

## Contents

- [Project Structure](#project-structure)
    - [data](#data)
    - [scripts & utils](#scripts-utils)
- [Terminal Functions](#terminal-functions)
- [Notating Scripts](#notating-scripts)

<span id="project-structure"/>

## Project Structures 

Over the years, I developed a standard project structure that works well with my workflow. Projects typically have a few child directories including the `www/` for custom css and javascript files, as well as for storing local copies of other assets needed for the project (I'm a big fan of having a copy of all assets stored locally). 

Let's take a look at a sample project structure.

![a tree structure of a project directory](https://res.cloudinary.com/dcruvolo/image/upload/v1555415966/example-project-tree_lfceib.png)

On my desktop, I created a new project called "my-shinyapp" and I created a few sample files. In "my-shinyapp", I have a few child directories.

- `data/`: all data files used to prepare data for the shinyapp
- `scripts/`: all scripts used to source and prepare data for the shinyapp, as well as visualization tests
- `utils/`: a place for functions used shinyapp or during the data sourcing process
- `www/`: all assets used in the shinyapp (imgs, css, js, etc.).

<span id="data"/>

### Data 

All data files are placed in `data`. These files follow strict naming conventions that relate to their scource and stage of the data cleaning process. For example, if my shinyapp uses data from a sql database, I will name it something like: `sql_extract_{name of table}`. Once the data is clean, I will create a new file and assign a name that resembles the stage of the data process: `sql_cleaned_{name of table}`, `sql_summarized_{name of table}`, and so forth. I will follow a similar path for different data sources (e.g., `gh_` for github, `figshare_`, etc.). When I've cleaned the data from all sources, I will merge them into a master file(s) and use the `master_*` files in the shinyapp.

This is helpful as I always have a local copy of the original data source and post-cleaning datasets. This eliminates the need to fetch the data each time I need to make a changes to the cleaning process. 

This approach saved me from delays at work when a few teams lost database access when a server upgrade reset access credentials. I could continue to develop the shinyapp, and then refresh the data when access credentials were restored.

<span id="scripts-utils"/>

### Scripts & Utils

In `scripts/`, I create all the files needed to prepare the master dataset for the shinyapp (`.R`, `.sql`, etc.). All helper functions are stored in `utils/`. I alway prefix these files with `data_*` and create a new file for each step. Most projects will the following files:

- `data_0_source.R`: pull data from the source
- `data_1_clean.R`: clean the data
- `data_2_transform.R`: reshape the data into the desired format
- `data_3_merge.R`: prepare data and write master dataset

I always start with `data_0_source.R`. Often the cleaning and transformation scripts are combined into one, but in some projects these steps can be pretty intensive. It's best to isolate these steps to "modularize" recurring procedures. This often comes in handy when more than one project uses the same data source(s) or have the same cleaning process. These files can be copied into the new project directory rather than rewriting them from scratch.

<span id="terminal-functions"/>

## Terminal Functions

I like to work through the terminal and I created a two bash functions to initialize shinyapp projects and `.Rproj` files. The function `init-rproj` creates the `.Rproj` file using the name of the current directory. The function `init-shinyapp` creates the defaults folders and commonly used files (`ui.R`, `global.R`, `server.R`). By default, the `init-shinyapp` function initiates the `init-rproj` function so you do not need to run this command separately. Here are the functions:

```bash
# init-rprojs
# define a function that initializes an .Rproj file using the name of the current directory
function init-rproj() {

    # get current pwd and get 'basename'
    rproj="$PWD"
    rproj="${rproj##*/}.Rproj"

    # init file
    touch $rproj

    # write configs to file
    printf "Version: 1.0\n\n"  >> $rproj
    printf "RestoreWorkspace: Default\n" >> $rproj
    printf "SaveWorkspace: Default\n" >> $rproj
    printf "AlwaysSaveHistory: Default\n" >> $rproj
    printf "\n" >> $rproj
    printf "EnableCodeIndexing: Yes\n" >> $rproj
    printf "UseSpacesForTab: Yes\n" >> $rproj
    printf "NumSpacesForTab: 2\n" >> $rproj
    printf "Encoding: UTF-8\n" >> $rproj
    printf "RnwWeave: Sweave\n" >> $rproj
    printf "LaTeX: pdfLaTeX\n" >> $rproj

    # display message
    echo Created: $rproj
}

# init-shinyapp
# define a function that makes default folders and files
function init-shinyapp() {

    # create dirs
    mkdir data
    mkdir scripts
    mkdir utils
    mkdir www
    mkdir www/css
    mkdir www/js
    mkdir www/imgs

    # create starter files
    touch ui.R
    touch server.R
    touch global.R

    # create .Rproj
    init-rproj

    # echo message
    echo "Complete"

}
```

To use this function, copy these functions into your `.bashrc` or `.bash_profile` file. These config files are located in your home directory. Type the following commands to find edit the files. The terminal will need to be restarted in order to the function to be executable.

```bash

# cd to $HOME
cd $HOME

# list files to confirm the file is there
ls -a

# open file in nano (depending on which you are using)
nano .bashrc
nano .bash_profile

# or open in your text editor
open -a "your_text_editor_here" .bash_profile

```
 To run, type the following:

```bash

# cd to desired location
cd path/to/dir/

# create new project
mkdir myshinyapp
cd myshinyapp

# init project
init-shinyapp
# Created: myshinyapp.Rproj
# Complete
```

<span id="notating-scripts"/>

## Notating Scripts

A lot of these workflows are based on personal preference and what works well with work projects. Perhaps the best method I use is adding a header to scripts. I use quite a few snippets and most of these are for notating scripts. The one I use the most is `headerDefault`, which produces:

```r
#'//////////////////////////////////////////////////////////
#' FILE: 
#' AUTHOR: 
#' CREATED: 16 April 2019
#' MODIFIED: 16 April 2019
#' PURPOSE: 
#' PACKAGES: 
#' STATUS: 
#' COMMENTS: 
#'//////////////////////////////////////////////////////////
#' GLOBAL OPTIONS:
options(stringsAsFactors = FALSE)
```

`headerDefault` inserts a template for me to fill out. This includes the name of the file, author (usually my name), general purpose of the script, required packages and dependencies, and current status (I usually use "in.progress", "working; complete", or "archived"), as well as writing any notes for me or my collaborators. The dates are rendered to the current date via:

```r
 `r format(Sys.Date(),"%d %B %Y")`.
```

This is critical for a lot of projects as I store my code in many palces (dropbox, shared network servers, github, or other cloud services) and I access these files from different machines. The header informs me if what the script does, what packages are required, and any other information I need in order to run the script. It's not uncommon for the time between reading/editing scripts can be months and I cannot always remember what a file does from the name alone. This provides enough context for me to resume working on a script. 

Let's see this snippet in action!

![executing the headerDefault snippet](https://res.cloudinary.com/dcruvolo/image/upload/v1555415894/r-snippets-demo_esq7gk.gif)

You can sync your snippets across machines using the [snippr](https://github.com/dgrtwo/snippr) package.

Here's the full snippet -

```r
snippet headerDefault
	#'//////////////////////////////////////////////////////////////////////////////
	#' FILE: ${1}
	#' AUTHOR: ${2}
	#' CREATED: `r format(Sys.Date(),"%d %B %Y")`
	#' MODIFIED: `r format(Sys.Date(),"%d %B %Y")`
	#' PURPOSE: ${3}
	#' PACKAGES: ${4}
	#' STATUS: ${5}
	#' COMMENTS: ${6}
	#'//////////////////////////////////////////////////////////////////////////////
	#' GLOBAL OPTIONS:
	options(stringsAsFactors = FALSE)
	${7}
```










