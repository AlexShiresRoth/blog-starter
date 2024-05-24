import { fetchGraphQL } from '@/contentful/api';
import { blogPostCollectionQuery } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { BlogCollectionResponseData, BlogPostData } from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';
import PostTag from './post-tag';
import PostDate from './post-date';
import SectionContainer from '../containers/section-container';
import { format } from 'date-fns';
import AllPostsHeader from './all-posts-header';

async function getFeaturedBlogPosts() {
  try {
    const res = await fetchGraphQL<BlogCollectionResponseData>(
      blogPostCollectionQuery(1000, 1000, 5, 0)
    );

    return res.data.blogPostCollection.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
}

export default async function BlogFeatured() {
  const blogPosts = await getFeaturedBlogPosts();

  if (!blogPosts || blogPosts?.length === 0) return null;

  return (
    <SectionContainer>
      <div className="w-full flex justify-center items-center py-8 md:mt-0 lg:py-16">
        <div className="w-full flex gap-8 flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 xl:w-2/3 flex flex-col gap-4 lg:max-w-4xl">
            <AllPostsHeader title="Featured" />
            <FeaturedPost post={blogPosts[0]} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 justify-between lg:w-1/2 xl:w-1/3 max-w-lg md:max-w-full">
            {blogPosts.slice(1).map((post) => (
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
          href={`/blog/${post.slug}`}
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
            <Link href={`/blog/${post.slug}`}>
              <h1 className="text-sm font-semibold text-black hover:underline transition-all">
                {post.title}
              </h1>
            </Link>
          )}
          {post.briefDescription && (
            <p className="text-xs text-gray-500">
              {post.briefDescription.slice(0, 60) + '...'}
            </p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {post.category && (
              <Link
                href={`/posts?q=${post.category}`}
                className="text-xs text-indigo-500"
              >
                {post.category}
              </Link>
            )}
            {!!post.tags.length &&
              post.tags.slice(0, 4).map((tag, index) => (
                <Link
                  key={index}
                  href={`/posts?q=${tag}`}
                  className="text-xs text-gray-400"
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
      <div className="flex z-10 justify-between gap-8 items-center">
        {post.sys.publishedAt && <PostDate date={post.sys.publishedAt} />}
        <div className="flex items-center gap-2 flex-wrap">
          {!!post.tags.length &&
            post.tags
              .slice(0, 4)
              .map((tag, index) => <PostTag key={index} tag={tag} />)}
        </div>
      </div>
      <div className="w-full flex flex-col z-10 justify-end">
        <div className="w-full md:w-3/4 p-4 flex flex-col bg-white rounded-xl rounded-tl-none relative">
          {post.category && (
            <Link
              href={`/posts?q=${post.category}`}
              className="px-8 py-2 bg-white rounded-tl-lg rounded-tr-full absolute bottom-[100%] left-0"
            >
              <p className="text-xs text-black font-semibold">
                {post.category}
              </p>
            </Link>
          )}
          {post.title && (
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-3xl lg:text-5xl font-bold text-black hover:underline transition-all">
                {post.title}
              </h2>
            </Link>
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
