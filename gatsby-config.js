module.exports = {
	pathPrefix: `/shinytutorials`,
	siteMetadata: {
		title: `shinyTutorials`,
		description: `a collection of how-to guides and demonstrations for building shiny apps`,
		author: `@dcruvolo`,
		siteUrl: "https://davidruvolo51.github.io/shinytutorials/"
	},
	plugins: [
		`gatsby-remark-reading-time`,
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
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				excerpt_separator: `<!-- endexcerpt -->`
			}
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
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `	
				{
					site {
						siteMetadata {
							title
							siteUrl
							author
							description
						}
					}
				}
				`,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.edges.map(edge => {
								return Object.assign({}, edge.node.frontmatter, {
									date: edge.node.frontmatter.date,
									lastBuildDate: edge.node.frontmatter.updated,
									title: edge.node.frontmatter.title,
									subtitle: edge.node.frontmatter.subtitle,
									description: edge.node.frontmatter.abstract,
									guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
									url: site.siteMetadata.siteUrl + edge.node.fields.slug,
									custom_elements: [{ 'content:encoded': edge.node.frontmatter.keywords }]
								})
							})
						},
						query: `
						{
							allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] },limit: 3) {
								edges {
									node {
										fields { 
											slug 
										}
										frontmatter {
											title
											subtitle
											abstract
											date
											updated
											keywords
										}
									}
								}
							}
						}`,
						output: "/rss.xml",
						title: "shinytutorials latest posts",
					}
				]
			}
		}
	],
}
