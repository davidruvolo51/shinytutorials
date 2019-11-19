
# Shiny Tutorials

Repository for the [shinytutorials](https://davidruvolo51.github.io/shinytutorials/) static site based on the [shinyAppTutorials](https://github.com/davidruvolo51/shinyAppTutorials) repository.


## Development

For working on the site, you will need to install a few tools. Checkout the [gatsbyJS](https://www.gatsbyjs.org) for the latest install instructions. You will also need to install [Node](https://nodejs.org/en/). See the last section in this document for the gatsby setup.

To begin, clone this repository and start the development server.

```bash
gatsby develop
```

All tutorials can be found in `src/pages/tutorials`. Create a new folder in `tutorials` and give it a name that resembles the tutorial you want to write (i.e., `data-editor`, `rmarkdown-shiny`, etc). In the new tutorial folder, create a new markdown file (it must be called `index.md`). If your post has images, include them in the same folder as the markdown file. (**NOTE**: the site does not support gifs or movie files at this point). Here's an example new tutorial folder.

```
src/
    - pages/
        - tutorials /
            - my-tutorial/
                index.md
                an_image.png
                ..

```

All tutorials must have the following YAML definitions.

```
---
title: ""
subtitle: ""
abstract: ""
date: ""
updated: ""
keywords:
---
```

- `title`: a name for the post (similar to the name of the folder)
- `subtitle`: One sentence that describes the tutorial
- `abstract`: a three sentance description about the tutorial
- `date`: the date the tutorial was published
- `updated`: the date the tutorial was updated (initially put the publication date here)
- `keywords`: tags for the post in js array format `keywords:["some", "word"] (enter 3 max)

When you are finished drafting the post, build the site (make sure you pass in the option prefix paths)

```bash
gatsby develop --prefix-paths
```

It's a good idea to remove the `.cache` and `public` folder before starting the development server or before building the site. Run the `npm run clean` to remove these folders.

Before files are pushed to the repository, copy the `public` folder into the `docs` folder (for github pages).

## Contributing

Anyone is welcome to contribute to the site: edits, new posts, etc. Feel free to get in touch with me if you are interested. Use the `dev` branch to build the site and then open a pull request. 

Please see the [shinyAppTutorials](https://github.com/davidruvolo51/shinyAppTutorials) repository for ideas and open issues as this repo is mainly for the development of the site.

## Gatsby Info

Here is a list of the installed tools. (`gatsby info`)

```
System:
    OS: macOS 10.14.6
    CPU: (4) x64 Intel(R) Core(TM) i5-4250U CPU @ 1.30GHz
    Shell: 3.2.57 - /bin/bash
  Binaries:
    Node: 12.13.0 - /usr/local/bin/node
    Yarn: 1.19.1 - /usr/local/bin/yarn
    npm: 6.13.0 - /usr/local/bin/npm
  Languages:
    Python: 2.7.16 - /usr/bin/python
  Browsers:
    Chrome: 78.0.3904.97
    Firefox: 70.0.1
    Safari: 13.0.3
  npmPackages:
    gatsby: ^2.17.11 => 2.17.11
    gatsby-image: ^2.2.31 => 2.2.31
    gatsby-plugin-google-analytics: ^2.1.28 => 2.1.28
    gatsby-plugin-manifest: ^2.2.27 => 2.2.27
    gatsby-plugin-offline: ^3.0.19 => 3.0.19
    gatsby-plugin-react-helmet: ^3.1.14 => 3.1.14
    gatsby-plugin-sass: ^2.1.23 => 2.1.23
    gatsby-plugin-sharp: ^2.3.2 => 2.3.2
    gatsby-remark-images: ^3.1.32 => 3.1.32
    gatsby-remark-prismjs: ^3.3.23 => 3.3.23
    gatsby-source-filesystem: ^2.1.36 => 2.1.36
    gatsby-transformer-remark: ^2.6.37 => 2.6.37
    gatsby-transformer-sharp: ^2.3.3 => 2.3.3
  npmGlobalPackages:
    gatsby-cli: 2.8.8
```