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
