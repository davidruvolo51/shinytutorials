
# Shiny Tutorials

Repository for the [shinytutorials](https://davidruvolo51.github.io/shinytutorials/) static site based on the [shinyAppTutorials](https://github.com/davidruvolo51/shinyAppTutorials) repository.


## Development

For working on the site, you will need to install a few tools. Checkout the [gatsbyJS](https://www.gatsbyjs.org) docs for the latest install instructions. You will also need to install [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm). Afterwards, install all plugins using the following command (this will install all plugins listed in `package.json`).

```bash
npm install
```

To start the developer server, run the following command. (make sure you are working from the `dev` branch).

```bash
gatsby develop
```

This will start the site at `locahost:8000`.

All tutorials can be found in `src/pages/tutorials`. Create a new folder in `tutorials` and give it a name that resembles the tutorial you want to write (i.e., `data-editor`, `rmarkdown-shiny`, etc). In the new tutorial folder, create a new markdown file (it must be called `index.md`). If your post has images, include them in the same folder as the markdown file. (**NOTE**: the site does not support gifs or movie files at this point). Here's an example new tutorial folder.

```
src/
    - pages/
        - tutorials /
            - my-tutorial/
                index.md
                some_image.png
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

When you are finished drafting the post, build the site (make sure you pass in the option prefix paths). It's a good idea to remove the `.cache` and `public` folder before starting the development server or before building the site. Run the `npm run clean` to remove these folders. Before files are pushed to the repository, copy the `public` folder into the `docs` folder (for github pages).

```bash
npm run clean
gatsby build --prefix-paths
mv public docs
```

When ready, commit the changes and push to the dev branch and open a pull request.

```bash
git add .
git commit -m "a meaningful message here"
git push origin dev
```

## Contributing

Anyone is welcome to contribute to the site: edits, new posts, etc. Feel free to get in touch with me if you are interested. Use the `dev` branch to build the site and then open a pull request. 

Please see the [shinyAppTutorials](https://github.com/davidruvolo51/shinyAppTutorials) repository for ideas and open issues as this repo is mainly for the development of the site.