import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const ProductItem = ({ data }) => {
  const { title, description, price } = data.markdownRemark.frontmatter;

  return (
    <Layout>
      <SEO />
      <h1 itemProp="headline">{title}</h1>
      <p>{description}</p>
      <p>${price}.00</p>
    </Layout>
  );
};

export default ProductItem;

export const pageQuery = graphql`
  query ProductById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
        price
      }
    }
  }
`;
