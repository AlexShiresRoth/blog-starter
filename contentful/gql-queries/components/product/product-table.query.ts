export const productTableQuery = (
  id: string,
  skip?: number,
  limit?: number
): string => `
query {
  componentProductTable(id: "${id}") {
    sys {
      id
    }
    headline
    subline
    productsCollection(limit: ${limit ?? 6}, skip: ${skip ?? 0}) {
      items {
        sys {
          id
        }
        name
        description {
          json
        }
        featuredImage {
          url
          size
          description
          width
          height
        }
        targetPage {
          slug
        }
        externalLink
        externalLinkText
        price
      }
    }
  }
}
`;
