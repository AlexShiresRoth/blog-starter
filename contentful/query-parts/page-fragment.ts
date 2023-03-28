export const pageGQL = `fragment Page on Page {
  sys {
    id
  }
  slug
  seo {
    ...SEOConfig
  }
}`;
