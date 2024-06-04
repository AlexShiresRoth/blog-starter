export const blogPostCollectionQuery = (
  imageWidth: number = 1000,
  imageHeight: number = 1000,
  limit: number = 10,
  skip: number = 0
) => `query {
    blogPostCollection(
      where: {
        slug_exists: true
      }
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
        seoMetadata {
          name
          title
          description
          image {
            url(transform: { width: 500, height: 500, format: WEBP, quality: 65 })
          }
          noIndex
          noFollow
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

export const blogPostCollectionQueryExcludeSlug = (
  slug: string,
  category: string,
  tags: string[],
  limit: number = 9
) => `query {
  blogPostCollection(
    where: {
      slug_exists: true
      slug_not: "${slug}"
      OR: [{ tags_contains_some: ${JSON.stringify(
        tags
      )} }, { category_in: ["${category}"] }]
    }
    limit: ${limit}
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
        url(transform: { width: 300, height: 300, format: WEBP, quality: 85 })
      }
      postContent {
        json
      }
      briefDescription
      category
      tags
    }
  }
}
  `;

export const blogPostsCollectionQuerySlugOnly = (
  limit: number = 100,
  skip: number = 0
) => `query {
    blogPostCollection(
      where: {
        slug_exists: true
      }
      limit: ${limit}
      skip: ${skip}
    ) {
      items {
        slug
      }
    }
   }`;

export const blogPostCollectionQueryWithQueryParams = (
  queryParam: string,
  sort: string,
  imageWidth: number = 1000,
  imageHeight: number = 1000
) => `query {
    blogPostCollection(
      where: {
        slug_exists: true
        OR: [
          { title_contains: "${queryParam}" }
          { tags_contains_some: ["${queryParam}"] }
          { category_contains: "${queryParam}" }
          { slug_contains: "${queryParam}" }
        ]
      },
      order: sys_publishedAt_${sort === 'latest' || !sort ? 'DESC' : 'ASC'}
    ) {
      items {
        sys {
          id
          firstPublishedAt
          publishedAt
        }
        seoMetadata {
          name
          title
          description
          image {
            url(transform: { width: 500, height: 500, format: WEBP, quality: 65 })
          }
          noIndex
          noFollow
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
       seoMetadata {
          name
          title
          description
          image {
            url(transform: { width: 500, height: 500, format: WEBP, quality: 65 })
          }
          noIndex
          noFollow
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
