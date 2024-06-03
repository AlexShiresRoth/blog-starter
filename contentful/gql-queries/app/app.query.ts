export const appQuery = (domain: string) => `query {
  appCollection(where: {domain: "${domain}"},limit:1) {
    items {
      seoMetadata {
        title
        description
        image {
          url
        }
        noIndex
        noFollow
       }
      sys {
        id
      }
      theme
      header {
        sys {
          id
        }
      }
      homePage {
        sys {
          id
        }
      }
      footer {
        sys {
          id
        }
      }
    }
  }
}`;

export const appTheme = (domain: string) => `query {
  appCollection(where: {domain: "${domain}"},limit:1) {
    items {
      theme
      sys {
        id
      }
    }
  }
 }`;
