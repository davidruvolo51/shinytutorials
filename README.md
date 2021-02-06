# Shiny Tutorials

The [shinytutorials](https://davidruvolo51.github.io/shinytutorials/) repository is used for creating the static site for the [shinyAppTutorials](https://github.com/davidruvolo51/shinyAppTutorials) project.

## Getting Started

For working on the site, you will need to install a few tools and configure a few things. The following steps will help you get started.

### 1. Install Node and NPM

Make sure [Node and NPM](https://nodejs.org/en/) are installed on your machine. You may also use [Yarn](https://yarnpkg.com/en/). To test the installation or to see if these tools are already installed on your machine, run the following commands in the terminal.

```shell
node -v
npm -v
```

### 2. Clone the `shinytutorials` repository

```shell
git clone https://github.com/davidruvolo51/shinytutorials
```

### 3. Install dependencies

Next, install the npm packages that are required to run the app locally. I have decided to use [pnpm](https://github.com/pnpm/pnpm) to manage packages on my machine and across projects. To install `pnpm`, run the following command.

```shell
npm install -g pnpm
```

Once install, install the dependencies locally.

```bash
pnpm install
```

If you prefer to use `npm`, use the following.

```shell
npm install
```

### 4. Start the development servers

When everything is installed, run the following command. This will start the site at `locahost:8000`.

```bash
yarn dev
```

*Note*: If you are using `npm` instead of `yarn`, run `npm dev`.

## Writing New Posts

### 1. Create a new folder

All tutorials are stored here: `src/pages/tutorials`. Create a new folder in `tutorials` and give it a name that resembles the tutorial you want to write. For example, `data-editor`, `rmarkdown-shiny`, `using-x-in-shiny`, and so on. Make sure the name of new folders is lowercased and any space should be replaced with a dash (`-`).

```text
shinytutorials /
  -src /
    - pages /
      - tutorials /
        - my-tutorial /
```

### 2. Create a new markdown file

In the new folder, create a markdown file. This must be named `index.md`. If your post has images, stored them in the same folder as the markdown file, and then define the image tag as normal (`![a description of an image](my-image.png)`)

```text
shinytutorials /
  - src /
    - pages /
      - tutorials /
        - my-tutorial /
          index.md
          my-image.png
```

*Note*: this site does not support gifs or movie files at this point.

### 3. Writing new posts

To make things simple, I've created added the new post template as a vscode snippet (see `.vscode/markdown.code-snippets`). If you are using vscode (recommended), the snippet will be automatically available when you open the vscode workspace. Open the `index.md` file. In the command palette, type `Snippet`, hit enter, and then type `blog`.

#### Defining the YAML

The blog post template will also produce the required YAML markup for a new post.

```yaml
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
- `updated`: the date the tutorial was updated (if it is a new post, make sure you write the same date as the publication date)
- `keywords`: tags for the post in js array format `keywords: ["some", "word"]` (enter 3 max)

## Contributing

Anyone is welcome to contribute to the site: edits, new posts, etc. Feel free to get in touch with me if you are interested. Use the `dev` branch to build the site and then open a pull request.

Please see the [shinyAppTutorials](https://github.com/davidruvolo51/shinyAppTutorials) repository for ideas and open issues as this repo is mainly for the development of the site.
