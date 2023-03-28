export const imageGQL = `fragment Image on Asset {
    sys {
      id
    }
    __typename
    description
    title
    contentType
    url
}`;
