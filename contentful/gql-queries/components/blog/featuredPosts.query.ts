export const featuredPostsQuery = (id: string) => `query {
    featuredPostsSection(id: "${id}") {
      sys {
        id
      }
      title
      postsLink
      morePostsLinkTitle
    }
  }
  
`;
