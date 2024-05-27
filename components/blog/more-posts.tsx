import { blogPostCollectionQuery } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { fetchGraphQL } from '@/contentful/api';
import { BlogCollectionResponseData } from '@/types/blog';
import SectionContainer from '../containers/section-container';
import PostCard from './post-card';
import AllPostsHeader from './all-posts-header';

async function getBlogPosts() {
  try {
    const res = await fetchGraphQL<BlogCollectionResponseData>(
      blogPostCollectionQuery(600, 600, 12, 5)
    );

    return res.data.blogPostCollection.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
}

export default async function MorePosts() {
  const blogPosts = await getBlogPosts();

  if (!blogPosts || blogPosts?.length === 0) return null;
  return (
    <div className="flex flex-col items-center justify-center w-full py-10 bg-stone-50 md:py-16">
      <SectionContainer>
        <AllPostsHeader
          title="More Posts"
          allPostsLink="/blog/posts"
          linkTitle="All Posts"
        />
        {/* More Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {blogPosts.map((post) => (
            <PostCard key={post.sys.id} post={post} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
