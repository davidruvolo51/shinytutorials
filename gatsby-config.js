// pathPrefix: `/shinytutorials`,
module.exports = {
	siteMetadata: {
		title: `shinyTutorials`,
		description: `a collection of how-to guides and demonstrations for building shiny apps`,
		author: `@dcruvolo`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `pages`,
				path: `${__dirname}/src/pages`,
				ignore: process.env.NODE_ENV === `production` && [`**/draft-*`]
			},
		},
		`gatsby-transformer-sharp`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 600
						}
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							classPrefix: "language-",
							inlineCodeMarker: null,
							aliases: { sh: "bash" },
							showLineNumbers: false,
							noInlineHighlight: true,
						}
					}
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
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}
