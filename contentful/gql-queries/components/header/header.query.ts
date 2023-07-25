export const headerQuery = (id: string) => `
        query {
        header(id: "${id}") {
            
            sys {
                id
            }
            logo {
                __typename
                url
                title
                description
            }
            title
            phone
            actionItemsCollection {
                items {
                sys {
                    id
                }
                __typename
                displayText
                featuredPage {
                    sys {
                    id
                    }
                    slug
                }
                }
            }
            }
        }
        
  `;
