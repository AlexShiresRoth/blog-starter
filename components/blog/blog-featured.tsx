import { fetchGraphQL } from '@/contentful/api';
import { blogPostCollectionQuery } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { BlogCollectionResponseData, BlogPostData } from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';
import PostTag from './post-tag';
import PostDate from './post-date';
import SectionContainer from '../containers/section-container';

async function getFeaturedBlogPosts() {
  try {
    const res = await fetchGraphQL<BlogCollectionResponseData>(
      blogPostCollectionQuery(1000, 1000, 4, 0)
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
      <section className="w-full flex justify-center items-center py-8 mt-20 md:mt-0 lg:py-16 px-6 lg:px-0">
        <div className="w-full flex gap-8 flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <h1 className="text-4xl md:text-6xl font-bold ml-8">Featured</h1>
            <FeaturedPost post={blogPosts[0]} />
          </div>

          <div className="flex flex-row flex-wrap lg:flex-nowrap lg:flex-col gap-8 justify-between w-full lg:w-1/3">
            {blogPosts.slice(1).map((post) => (
              <Post key={post.sys.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </SectionContainer>
  );
}

const Post = ({ post }: { post: BlogPostData }) => {
  return (
    <div className="flex flex-col items-start gap-8 justify-between p-4 relative w-full bg-black rounded-xl hover:shadow-lg transition-shadow h-full min-h-56 lg:min-h-0">
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
        <div className="w-3/4 p-2 flex flex-col bg-white rounded-xl rounded-tl-none relative">
          {post.category && (
            <div className="px-8 py-1 bg-white rounded-tl-lg rounded-tr-full absolute bottom-[100%] left-0">
              <p className="text-xs text-black font-semibold">
                {post.category}
              </p>
            </div>
          )}
          {post.title && (
            <Link href={`/blog/${post.slug}`}>
              <h1 className="text-xl font-bold text-black hover:underline transition-all">
                {post.title}
              </h1>
            </Link>
          )}
        </div>
      </div>
      {post.postImage && (
        <Image
          src={post.postImage.url}
          alt={post.postImage.title}
          fill={true}
          className="rounded-xl object-cover object-center w-full h-full z-0 bg-indigo-500 opacity-80"
        />
      )}
    </div>
  );
};

const FeaturedPost = ({ post }: { post: BlogPostData }) => {
  return (
    <div
      key={post.sys.id}
      className="flex flex-col items-start justify-between p-4 relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-black rounded-xl hover:shadow-lg transition-shadow"
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
            <div className="px-8 py-2 bg-white rounded-tl-lg rounded-tr-full absolute bottom-[100%] left-0">
              <p className="text-xs text-black font-semibold">
                {post.category}
              </p>
            </div>
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
