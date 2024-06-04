import { blogPostCollectionQuery } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { fetchGraphQL } from '@/contentful/api';
import {
  BlogCollectionResponseData,
  MorePostsSectionResponseData,
} from '@/types/blog';
import SectionContainer from '../containers/section-container';
import PostCard from './post-card';
import AllPostsHeader from './all-posts-header';
import { morePostsSectionQuery } from '@/contentful/gql-queries/components/blog/more-posts.query';
import { PossibleComponentType } from '@/types/page.type';

async function getBlogPosts(limit: number = 12, skip: number = 5) {
  try {
    const res = await fetchGraphQL<BlogCollectionResponseData>(
      blogPostCollectionQuery(600, 600, limit, skip),
      120,
      ['blogPost', 'morePostsSection', 'featuredPostsSection']
    );

    return res.data.blogPostCollection.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
}

async function getMorePostsSection(id: string) {
  try {
    const res = await fetchGraphQL<MorePostsSectionResponseData>(
      morePostsSectionQuery(id),
      60,
      ['morePostsSection', 'featuredPostsSection']
    );

    return res.data.morePostsSection;
  } catch (error) {
    console.error('Error fetching more posts section:', error);
    return null;
  }
}

export default async function MorePosts({ ...props }: PossibleComponentType) {
  const morePostsSection = await getMorePostsSection(props.sys.id);

  if (!morePostsSection) return null;

  const blogPosts = await getBlogPosts(
    morePostsSection.maxPostsToShow,
    morePostsSection.isFeaturedSectionIncluded ? 5 : 0
  );

  if (!blogPosts || blogPosts?.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full py-10 bg-stone-50 dark:bg-transparent md:py-16">
      <SectionContainer>
        <AllPostsHeader
          title={morePostsSection.title}
          allPostsLink={morePostsSection.postsCollectionLink}
          linkTitle={morePostsSection.postsCollectionTitle}
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
