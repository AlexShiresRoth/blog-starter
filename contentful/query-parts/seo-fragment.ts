export const seoGQL = `fragment SEOConfig on Seo {
  sys {
    id
  }
  name
  title
  noIndex
  noFollow
  __typename
}`;
