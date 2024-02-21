export const pageQuery = (slug: string): string => `query {
  pageCollection(where: { slug: "${slug}" }, limit:1) {
    items {
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
        ... on TopicBusinessInfo {
          sys {
            id
          }
        }
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