export const duplexQuery = (id: string): string => `
query {
  componentDuplex(id: "${id}") {
    sys {
      id
    }
    containerLayout
    headline
    bodyText {
      json
    }
    firstColumnHeadline
    firstColumn{
      json
    }
    secondColumnHeadline
    secondColumn {
      json
    }
    ctaText
    image {
      title
      description
      url
    }
    targetPage {
      __typename
      ... on Page {
        slug
      }
    }
  }
}
`;
