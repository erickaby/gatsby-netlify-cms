import React from 'react';

import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Blog = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <SEO keywords={[`blog`, `personal`, `about things`]} title="Blog" />
      <section>
        <h1 className="text-3xl font-bold">Recent Posts</h1>
        {data.posts.nodes.map((v, i) => {
          const { title, date, short_description } = v.frontmatter;
          const { slug } = v.fields;
          return (
            <Link key={i} to={`/blog/posts${slug}`} itemProp="div">
              <div className="bg-gray-100 p-5 rounded">
                <h2 className="font-bold text-2xl">{title}</h2>
                <p>{date}</p>
                <p>{short_description}</p>
              </div>
            </Link>
          );
        })}
      </section>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query BlogPage {
    markdownRemark(fields: { slug: { eq: "/posts/" } }) {
      id
      frontmatter {
        title
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(/content/posts)/.*.md$/" } }
      limit: 1000
    ) {
      nodes {
        id
        fields {
          slug
        }
        html
        frontmatter {
          title
          date
          short_description
        }
      }
    }
  }
`;
