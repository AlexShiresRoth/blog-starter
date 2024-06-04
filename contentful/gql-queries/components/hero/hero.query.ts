export const heroQuery = (id: string) => `query {
  componentHeroBanner(id: "${id}") {
    sys {
      id
    }
    __typename
    headline
    bodyText {
      json
    }
    ctaText
    externalLink
    targetPage {
      ... on Page {
        slug
      }
    }
    image {
      ... on Asset {
        url
        title
        description 
      }
    }
  }
}
`;
