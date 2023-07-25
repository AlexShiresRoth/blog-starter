export const assetQuery = (id: string): string => `query {
  asset(id: "${id}") {
    title
    description
    width
    height
    url
  }
}`;
