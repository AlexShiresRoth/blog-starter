export const businessInfoQuery = (id: string): string => `query {
  topicBusinessInfo(id:"${id}") {
    sys{
      id
    }
    name
    shortDescription
    featuredImage {
      title
      description
      url
    }
    body {
      json
    }
  }
}`;
