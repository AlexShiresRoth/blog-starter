export const ctaQuery = (id: string) => `query {
  componentCta(id: "${id}") {
    headline
    subline {
      json
    }
    urlParameters
    ctaText
    targetPage {
      ... on Page {
        slug
      }
    }
  }
}
`;
