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
        }
      }
      pageContent {
        __typename
        ... on TopicBusinessInfo {
          sys {
            id
          }
        }
      }
    }
  }
}
`;
