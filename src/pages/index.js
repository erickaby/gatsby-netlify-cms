import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
// import catAndHumanIllustration from "../images/cat-and-human-illustration.svg";

const IndexPage = (props) => {
  const { data } = props;
  const { title, intro, background_img } = data.markdownRemark.frontmatter;

  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <section>
        <div className="grid grid-cols-2 gap-8">
          <div className="">
            <h1 className="inline-block mb-4 text-4xl font-bold">
              {title}
            </h1>
            <p className="leading-loose text-gray-500">{intro}</p>
          </div>
          <img
            alt="Cat and human sitting on a couch"
            className="block mx-auto rounded-lg"
            src={background_img}
          />
        </div>
      </section>

      <section>
        
      </section>

      <section className="text-center"></section>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query HomePage {
    markdownRemark(fields: { slug: { eq: "/home/" } }) {
      id
      frontmatter {
        title
        intro
        background_img
      }
    }
  }
`;
