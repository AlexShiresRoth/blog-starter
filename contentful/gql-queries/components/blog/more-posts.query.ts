export const morePostsSectionQuery = (id: string) => `query {
    morePostsSection(id: "${id}") {
      title
      postsCollectionLink
      postsCollectionTitle
      maxPostsToShow
      isFeaturedSectionIncluded
    }
  }`;
