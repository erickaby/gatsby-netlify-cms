const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const postItem = path.resolve(`./src/templates/post-item.js`);
  const productItem = path.resolve(`./src/templates/product-item.js`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        products: allMarkdownRemark(
          filter: {
            fileAbsolutePath: { regex: "/(/content/products)/.*.md$/" }
          }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
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
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.posts.nodes;

  const products = result.data.products.nodes;
  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, _) => {
      createPage({
        path: `/blog/posts${post.fields.slug}`,
        component: postItem,
        context: {
          id: post.id,
        },
      });
    });
  }

  if (products.length > 0) {
    products.forEach((product, _) => {
      createPage({
        path: product.fields.slug,
        component: productItem,
        context: {
          id: product.id,
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
