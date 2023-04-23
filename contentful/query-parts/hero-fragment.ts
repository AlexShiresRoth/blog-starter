export const heroGQL = `fragment Hero on ComponentHeroBanner {
  sys {
    id
  }
  __typename 
  headline
  bodyText {
    json
  }
  ctaText
  targetPage {
    ...Page
  }
  image{
    ...Image
  }
}`;
