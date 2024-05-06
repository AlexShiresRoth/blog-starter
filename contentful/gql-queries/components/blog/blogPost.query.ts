export const blogPostCollectionQuery = (imageWidth: number = 1000, imageHeight: number = 1000) => `query {
    blogPostCollection(
      where: { slug_exists: true }
      limit: 50
      order: sys_publishedAt_DESC
    ) {
      items {
        sys {
          id
          firstPublishedAt
          publishedAt
        }
        title
        slug
        postImage {
          url(transform: { width: ${imageWidth}, height: ${imageHeight}, format: WEBP, quality: 85 })
        }
        postContent {
          json
        }
        briefDescription
        category
        tags
      }
    }
  }`