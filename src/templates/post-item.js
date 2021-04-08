import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const PostItem = ({ data }) => {
  const { html } = data.markdownRemark;
  const { title, date } = data.markdownRemark.frontmatter;

  return (
    <Layout>
      <SEO title={`Post | ${title}`} />
      <h1 className="font-bold text-4xl">{title}</h1>
      <p>{date}</p>
      <div
        className="tracking-normal text-base"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </Layout>
  );
};

export default PostItem;

export const pageQuery = graphql`
  query PostById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date
      }
    }
  }
`;
