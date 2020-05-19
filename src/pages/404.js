////////////////////////////////////////////////////////////////////////////////
// FILE: 404.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-28
// MODIFIED: 2020-05-19
// PURPOSE: 404 page
// DEPENDENCIES: react
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import App from "../components/layouts/app"
import Hero from "../components/layouts/hero"
function ErrorPage() {
	return (
		<App title="404"
			description="A collection of methods and techniques for building shiny apps"
			author="dcruvolo"
			keywords={["shiny", "shiny tutorials", "r", "shiny examples"]}>
			<Hero
				title="ERROR 404"
				subtitle="The page you were looking for does not exist."
				image="dashboard-fail"
				className="hero-style-1 hero-404"
			/>
		</App>
	)
}
export default ErrorPage
