import PostCard from '@/components/blog/post-card';
import MainContainer from '@/components/containers/main-container';
import SectionContainer from '@/components/containers/section-container';
import SearchBox from '@/components/search/search-box';
import { fetchGraphQL } from '@/contentful/api';
import { blogPostCollectionQueryWithQueryParams } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { BlogCollectionResponseData } from '@/types/blog';

async function getBlogPosts(queryParam?: string) {
  try {
    const res = await fetchGraphQL<BlogCollectionResponseData>(
      blogPostCollectionQueryWithQueryParams(queryParam || '', 600, 600),
      600,
      ['blogPosts']
    );

    return res.data.blogPostCollection.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
}

/**
 * @todo add search section and use tag/category query params.
 * @todo make search very simple, just use gql with query params
 * @todo add pagination
 * @todo add sorting
 * @todo add sections above and below posts collection
 * @returns a collection of posts
 */

export default async function PostsCollection({
  searchParams,
}: {
  searchParams?: { tag: string; category: string; date: string; q: string };
}) {
  const { tag, category, date, q } = searchParams || {};
  const queryParam = tag || category || date || q;
  const posts = await getBlogPosts(tag || category || date || q);

  if (!posts) {
    return null;
  }

  return (
    <MainContainer>
      <SectionContainer>
        <SearchBox />
        <div className="mt-32 md:mt-10 ">
          <h1 className="text-3xl md:text-5xl font-bold">
            {queryParam ? `Results for ${queryParam}` : 'All Posts'}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8 md:px-0">
          {posts.map((post) => (
            <PostCard key={post.sys.id} post={post} />
          ))}
        </div>
      </SectionContainer>
    </MainContainer>
  );
}
