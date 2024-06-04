export const infoBlockQuery = (id: string) => `query {
  componentInfoBlock(id: "${id}") {
    sys {
        id
    }
    __typename
    headline
    subline
        blocksCollection(limit: 3) {
            items {
              sys {
                id
              }
              image {
                url
                title
                description
              }
              text {
                json
              }
            }
        }
  }
}`;
