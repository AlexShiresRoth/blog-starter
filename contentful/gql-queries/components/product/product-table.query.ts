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
    productsCollection(limit: ${limit ?? 12}, skip: ${skip ?? 0}) {
      items {
        sys {
          id
        }
        name
        description {
          json
        }
        excerpt
        isExpandable
        featuredImage {
          url
          size
          description
          width
          height
        }
        targetPage {
          slug
          pageName
        }
        externalLink
        externalLinkText
        price
      }
    }
  }
}
`;
