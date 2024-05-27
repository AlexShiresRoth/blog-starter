export const pageQuery = (slug: string): string => `query {
  pageCollection(where: { slug: "${slug}" }, limit:1) {
    items {
        seoMetadata {
            name
            title
            description
            image {
              url(transform: { width: 500, height: 500, format: WEBP, quality: 65 })
            }
            noIndex
            noFollow
          }
          pageName
          slug
      topSectionCollection {
        items {
            __typename
          ... on ComponentHeroBanner {
            sys {
              id
            }
          }
          ... on ComponentCta {
            sys {
              id
            }
          }
          ... on ComponentDuplex {
            sys {
              id
            }
          }
          ... on ComponentInfoBlock {
            sys {
              id
            }
          }
          ... on SignUpBox {
            sys {
              id
            }
          }
          ... on ComponentTextBlock {
            sys {
              id
            }
          }
          ... on Form {
            sys {
              id
            }
          }
          ... on Faq { 
            sys {
              id
            }
          }
        }
      }
      pageContent {
        __typename
       
         ... on ComponentProductTable {
          sys {
            id
          }
        }
      }
      extraSectionCollection {
        items {
            __typename
          ... on ComponentCta {
            sys {
              id
            }
          }
          ... on ComponentDuplex {
            sys {
              id
            }
          }
          ... on ComponentInfoBlock {
            sys {
              id
            }
          }
          ... on SignUpBox {
            sys {
              id
            }
          }
          ... on ComponentTextBlock {
            sys {
              id
            }
          }
          ... on Form {
            sys {
              id
            }
          }
          ... on Faq {
            sys {
              id
            }
          }
        }
      }
    }
  }
}
`;
