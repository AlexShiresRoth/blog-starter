export const appQuery = (domain: string) => `query {
  appCollection(where: {domain: "${domain}"},limit:1) {
    items {
      sys {
        id
      }
      
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
