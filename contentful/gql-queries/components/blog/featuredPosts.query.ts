export const featuredPostsQuery = (id: string) => `query {
    featuredPostsSection(id: "${id}") {
      sys {
        id
      }
      title
      postsLink
      morePostsLinkTitle
      featuredPost {
        sys {
          id
        }
        title
        slug
        postImage {
          url(transform: { width: 1000, height: 1000, format: WEBP })
          width
          height
        }
        tags
        category
        briefDescription
      }
      morePostsCollection(limit: 4) {
        items {
          sys {
            id
          }
          title
          slug
          postImage {
            url(transform: { width: 1000, height: 1000, format: WEBP })
            width
            height
          }
          tags
          category
          briefDescription
        }
      }
    }
  }
  
`;
