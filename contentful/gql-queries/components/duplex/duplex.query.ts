export const duplexQuery = (id: string): string => `
query {
  componentDuplex(id: "${id}") {
    sys {
      id
    }
    containerLayout
  
    firstColumnHeadline
    firstColumn{
      json
    }
    secondColumnHeadline
    secondColumn {
      json
    }
    ctaText
   
    targetPage {
      __typename
      ... on Page {
        slug
      }
    }
  }
}
`;
