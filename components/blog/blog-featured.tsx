import { fetchGraphQL } from '@/contentful/api';
import { blogPostCollectionQuery } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';

export const BlogPostObject = z.object({
  sys: z.object({
    id: z.string(),
    publishedAt: z.string(),
    firstPublishedAt: z.string(),
  }),
  title: z.string(),
  slug: z.string(),
  postImage: z.object({ url: z.string(), title: z.string() }),
  postContent: z.object({ json: z.object({}) }),
  briefDescription: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()),
});

export type BlogPostData = z.infer<typeof BlogPostObject>;

async function getFeaturedBlogPosts(): Promise<BlogPostData[] | null> {
  try {
    const res = await fetchGraphQL(blogPostCollectionQuery());

    if (!res.data) throw new Error('Could not locate blog posts');
    return res.data.blogPostCollection.items;
  } catch (error) {
    console.error('Error fetching blog posts', error);
    return null;
  }
}

export default async function BlogFeatured() {
  const blogPosts = await getFeaturedBlogPosts();

  if (!blogPosts || blogPosts?.length === 0) return null;

  return (
    <section className="w-full flex justify-center items-center py-10">
      <div className="md:w-3/4 flex gap-8">
        <div className="w-2/3 flex flex-col gap-4">
          <h1 className="text-6xl font-bold ml-8">Featured</h1>
          <FeaturedPost key={blogPosts[0].sys.id} post={blogPosts[0]} />
        </div>

        <div className="flex flex-col gap-8 justify-between w-1/3">
          {blogPosts.slice(1).map((post) => (
            <Post key={post.sys.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Post = ({ post }: { post: BlogPostData }) => {
  return (
    <div className="flex flex-col items-start gap-8 justify-between p-4 relative w-full bg-black rounded-xl hover:shadow-lg transition-shadow h-full">
      <div className="flex z-10 justify-between gap-8 items-center">
        {post.sys.publishedAt && (
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="font-semibold text-xs">
              {format(new Date(post.sys.publishedAt), 'PP')}
            </p>
          </div>
        )}
        {!!post.tags.length &&
          post.tags.map((tag) => (
            <div className="px-4 py-2 bg-white/90 rounded-full">
              <p className="text-xs text-indigo-400">{tag}</p>
            </div>
          ))}
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
    <div className="flex flex-col items-start justify-between p-4 relative w-full h-[600px] bg-black rounded-xl hover:shadow-lg transition-shadow">
      <div className="flex z-10 justify-between gap-8 items-center">
        {post.sys.publishedAt && (
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="font-semibold text-lg">
              {format(new Date(post.sys.publishedAt), 'PP')}
            </p>
          </div>
        )}
        {!!post.tags.length &&
          post.tags.map((tag) => (
            <div className="px-4 py-2 bg-white/90 rounded-full">
              <p className="text-xs text-indigo-400">{tag}</p>
            </div>
          ))}
      </div>
      <div className="w-full flex flex-col z-10 justify-end">
        <div className="w-3/4 p-4 flex flex-col bg-white rounded-xl rounded-tl-none relative">
          {post.category && (
            <div className="px-8 py-2 bg-white rounded-tl-lg rounded-tr-full absolute bottom-[100%] left-0">
              <p className="text-xs text-black font-semibold">
                {post.category}
              </p>
            </div>
          )}
          {post.title && (
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-5xl font-bold text-black hover:underline transition-all">
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
          className="rounded-xl object-cover object-center w-full h-full z-0 bg-indigo-500 opacity-80"
        />
      )}
    </div>
  );
};
