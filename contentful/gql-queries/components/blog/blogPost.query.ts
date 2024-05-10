export const blogPostCollectionQuery = (
  imageWidth: number = 1000,
  imageHeight: number = 1000,
  limit: number = 10,
  skip: number = 0
) => `query {
    blogPostCollection(
      where: { slug_exists: true }
      limit: ${limit}
      skip: ${skip}
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
  }`;

export const blogPostQuery = (
  slug: string,
  imageWidth: number = 1000,
  imageHeight: number = 1000
) => `query {
  blogPostCollection(
    where: { slug_exists: true, slug: "${slug}" },
    limit: 1
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
}`;
