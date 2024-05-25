export const headerQuery = (
  id: string,
  logoWidth: number = 300,
  logoHeight: number = 300,
  isPreview?: boolean
) => `
    query {
        header(id: "${id}") {
        sys {
            id
        }
        logo {
            url(transform: { width: ${logoWidth}, height: ${logoHeight}, format: WEBP, quality: 85 })
        }
        title
        actionItemsCollection(limit:2, preview: ${!!isPreview}) {
            items {
            sys {
                id
            }
            displayText
            featuredPage {
                pageName
                slug
            }
            }
        }
        navItemsCollection(limit: 10, preview: ${!!isPreview}) {
            items {
            sys {
                id
            }
            menuTitle
            menuItemsCollection(limit: 10, preview: ${!!isPreview}) {
                items {
                    sys {
                        id
                    }
                groupName
                groupLink {
                    __typename
                    ... on Page { 
                        slug
                        pageName
                    }
                }
                featuredPagesCollection(limit: 10, preview: ${!!isPreview}) {
                    items {
                        slug
                        pageName
                    }
                            }
                        }
                    }
                }
            }
        }
    }
  `;
