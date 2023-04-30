export const DuplexFragment = `fragment Duplex on ComponentDuplex {
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
    ...Page
  } 
}`;
