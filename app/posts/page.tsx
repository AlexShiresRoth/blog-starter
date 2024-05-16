import PostCard from '@/components/blog/post-card';
import MainContainer from '@/components/containers/main-container';
import SectionContainer from '@/components/containers/section-container';
import SearchBox from '@/components/search/search-box';
import SearchFilter from '@/components/search/search-filter';
import { fetchGraphQL } from '@/contentful/api';
import { blogPostCollectionQueryWithQueryParams } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { BlogCollectionResponseData } from '@/types/blog';
import Link from 'next/link';

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

// @todo add date to search
// @todo add date to posts

export default async function PostsCollection({
  searchParams,
}: {
  searchParams?: { q: string };
}) {
  const { q } = searchParams || {};

  const posts = await getBlogPosts(q);

  if (!posts) {
    return null;
  }

  return (
    <div className="py-28 md:py-0">
      <MainContainer>
        <SectionContainer>
          <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl md:text-5xl">Our Posts</h1>
            <p>Search from our vast collection of posts</p>
          </div>
          <SearchBox />
          <div className="mt-2 md:mt-10 flex items-center gap-4 w-full justify-between">
            <SearchFilter queryParam={q} />
            <h2 className="text-xl md:text-3xl">
              {q ? `${posts.length} Results for ${q}` : 'All Posts'}
            </h2>
            <div></div>
          </div>
          {!!posts.length && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 px-8 md:px-0">
              {posts.map((post) => (
                <PostCard key={post.sys.id} post={post} />
              ))}
            </div>
          )}
          {!posts.length && (
            <div className="py-20 flex flex-col items-center gap-4 ">
              <h2 className="text-3xl font-bold">No posts found</h2>
              <Link href="/posts">
                <button className="bg-black rounded-full text-white px-4 py-2 text-sm">
                  Reset Search
                </button>
              </Link>
            </div>
          )}
        </SectionContainer>
      </MainContainer>
    </div>
  );
}
