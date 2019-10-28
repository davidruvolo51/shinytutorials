module.exports = {
  siteMetadata: {
    title: `shinyTutorials`,
    description: `a collection of how-to guides and demonstrations for building shiny apps`,
    author: `@dcruvolo`,
  },
  pathPrefix: "/shinytutorials",
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
        ignore: process.env.NODE_ENV === `production` && [`**/draft-*`]
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `/components/images/`,
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
            }
          },
          "gatsby-remark-copy-linked-files",
        ]
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-76117337-11",
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: ["/preview/**", "/do-not-track/me/too/"],
      },
    },
  ],
}
