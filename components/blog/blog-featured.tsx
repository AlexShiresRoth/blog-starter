import { fetchGraphQL } from '@/contentful/api';
import {
  BlogCollectionResponseData,
  BlogPostData,
  FeaturedPostsSectionResponseData,
} from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';
import PostTag from './post-tag';
import PostDate from './post-date';
import SectionContainer from '../containers/section-container';
import { format } from 'date-fns';
import AllPostsHeader from './all-posts-header';
import { PossibleComponentType } from '@/types/page.type';
import {
  blogPostCollectionQuery,
  featuredPostsQuery,
} from '@/contentful/gql-queries';

async function getFeaturedPostsSection(id: string) {
  try {
    const res = await fetchGraphQL<FeaturedPostsSectionResponseData>(
      featuredPostsQuery(id),
      60,
      ['featuredPostsSection', 'blogPost']
    );

    return res.data.featuredPostsSection;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
}

async function getMostRecentPosts() {
  try {
    const res = await fetchGraphQL<BlogCollectionResponseData>(
      blogPostCollectionQuery(600, 600, 5, 0)
    );

    return res.data.blogPostCollection.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
}

export default async function BlogFeatured({
  ...props
}: PossibleComponentType) {
  const featuredSection = await getFeaturedPostsSection(props.sys.id);

  if (!featuredSection) return null;

  const mostRecentPosts = await getMostRecentPosts();

  if (!mostRecentPosts || mostRecentPosts?.length === 0) return null;

  return (
    <SectionContainer>
      <div className="w-full flex justify-center items-center py-8 md:mt-0 lg:py-16">
        <div className="w-full flex gap-8 flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 xl:w-2/3 flex flex-col gap-4 lg:max-w-4xl">
            <AllPostsHeader
              title={featuredSection.title}
              linkTitle={featuredSection.morePostsLinkTitle}
              allPostsLink={featuredSection.postsLink}
            />
            <FeaturedPost post={mostRecentPosts[0]} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 justify-between lg:w-1/2 xl:w-1/3 max-w-lg md:max-w-full">
            {mostRecentPosts.slice(1).map((post) => (
              <Post key={post.sys.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

const Post = ({ post }: { post: BlogPostData }) => {
  return (
    <div className="flex items-start gap-4 justify-between relative w-full">
      {post.postImage && (
        <Link
          href={`/blog/posts/${post.slug}`}
          className="h-[133px] w-[200px] relative"
        >
          <Image
            src={post.postImage.url}
            alt={post.postImage.title}
            fill
            className="rounded-xl object-cover object-center h-full"
          />
        </Link>
      )}
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          {post.sys.publishedAt && (
            <p className="text-xs">{format(post.sys.publishedAt, 'PP')}</p>
          )}
        </div>
        <div className="w-full flex flex-col z-10 justify-end gap-2">
          {post.title && (
            <Link href={`/blog/posts/${post.slug}`}>
              <h4 className="text-sm font-semibold hover:underline transition-all">
                {post.title}
              </h4>
            </Link>
          )}
          {post.briefDescription && (
            <p className="text-xs">
              {post.briefDescription.slice(0, 90) + '...'}
            </p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {post.category && (
              <Link
                href={`/blog/posts?q=${post.category}`}
                className="text-xs text-indigo-500"
              >
                {post.category}
              </Link>
            )}
            {!!post.tags.length &&
              post.tags.slice(0, 4).map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog/posts?q=${tag}`}
                  className="text-xs text-gray-500"
                >
                  {tag}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedPost = ({ post }: { post: BlogPostData }) => {
  return (
    <div
      key={post.sys.id}
      className="flex flex-col items-start justify-between p-4 relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[520px] bg-black rounded-xl hover:shadow-lg transition-shadow"
    >
      <div className="flex z-10 justify-between gap-8 items-center flex-wrap">
        {post.sys.publishedAt && <PostDate date={post.sys.publishedAt} />}
      </div>
      <div className="w-full flex flex-col z-10 justify-end">
        <div className="w-full md:w-3/4 p-4 flex flex-col bg-white dark:bg-transparent rounded-xl rounded-tl-none relative">
          {post.category && (
            <Link
              href={`/blog/posts?q=${post.category}`}
              className="px-8 py-2 bg-white dark:bg-transparent dark:px-6 rounded-tl-lg rounded-tr-full absolute bottom-[100%] left-0"
            >
              <p className="text-xs text-black dark:text-white font-semibold">
                {post.category}
              </p>
            </Link>
          )}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {!!post.tags.length &&
              post.tags
                .slice(0, 4)
                .map((tag, index) => <PostTag key={index} tag={tag} />)}
          </div>

          {post.title && (
            <Link href={`/blog/posts/${post.slug}`}>
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-black dark:text-white hover:underline transition-all">
                {post.title}
              </h2>
            </Link>
          )}

          {post.briefDescription && (
            <p>{post.briefDescription.substring(0, 90) + '...'}</p>
          )}
        </div>
      </div>
      {post.postImage && (
        <Image
          src={post.postImage.url}
          alt={post.postImage.title}
          fill={true}
          priority
          className="rounded-xl object-cover object-center w-full h-full z-0 bg-indigo-500 opacity-80"
        />
      )}
    </div>
  );
};
