import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import GoodDog from "../images/good-dog.svg"

const NotFoundPage = () => (

  <Layout>
    <SEO title="404: Not found" />
    <div className="four-o-four-page">
      <h1>PAGE NOT FOUND</h1>
      <p>This page does not exist. Follow the good dog to get back on track.</p>
      <Link to="/">
        <GoodDog/>
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
