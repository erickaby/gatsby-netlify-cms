import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
// import dogIllustration from "../images/dog-illustration.svg";

const AboutPage = ({ data }) => {
  const { name, quote, portrait } = data.markdownRemark.frontmatter;

  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="About"
      />

      <section className="flex flex-col items-center md:flex-row">
        <div className="md:w-2/3 md:mr-8">
          <blockquote className="pl-4 font-serif leading-loose text-justify border-l-4 border-gray-900">
            {quote}
          </blockquote>

          <cite className="block mt-4 text-xs font-bold text-right uppercase">
            – {name}
          </cite>
        </div>

        <figure className="w-2/3 md:w-1/3">
          <img
            className="object-cover rounded-full h-36 w-36 flex items-center justify-center"
            alt="A dog relaxing"
            src={portrait}
          />
        </figure>
      </section>
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutPage {
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      id
      frontmatter {
        name
        quote
        portrait
      }
    }
  }
`;
