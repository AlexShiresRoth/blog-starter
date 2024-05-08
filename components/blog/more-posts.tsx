import { blogPostCollectionQuery } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { BlogPostData } from './blog-featured';
import { fetchGraphQL } from '@/contentful/api';
import Image from 'next/image';
import Link from 'next/link';

async function getBlogPosts(): Promise<BlogPostData[] | null> {
  try {
    const res = await fetchGraphQL(blogPostCollectionQuery(600, 600, 12, 4));

    if (!res.data) throw new Error('Could not locate blog posts');
    return res.data.blogPostCollection.items;
  } catch (error) {
    console.error('Error fetching blog posts', error);
    return null;
  }
}

export default async function MorePosts() {
  const blogPosts = await getBlogPosts();

  if (!blogPosts || blogPosts?.length === 0) return null;
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full py-10 px-8 lg:px-0 bg-stone-100">
        <div className="w-full md:w-11/12 lg:w-3/4">
          <h2 className="text-3xl font-semibold ml-8">More Posts</h2>
        </div>
        {/* More Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full md:w-11/12 lg:w-3/4">
          {blogPosts.map((post) => (
            <div key={post.sys.id} className="flex flex-col gap-4 py-4">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline flex flex-col gap-4"
              >
                <div className="relative w-full h-[320px]">
                  <Image
                    src={post.postImage.url}
                    alt={post.postImage.title}
                    fill
                    className="rounded-lg object-cover object-center w-full h-full"
                  />
                </div>
                <h1 className="text-2xl font-bold">{post.title}</h1>
              </Link>
              <p className="text-gray-500">{post.briefDescription}</p>
              <div className="flex gap-4 items-center">
                <div>
                  <p className=" px-4 py-2 rounded-full bg-black text-white text-sm">
                    {post.category}
                  </p>
                </div>
                {!!post.tags?.length &&
                  post.tags.map((tag) => (
                    <div>
                      <p className="px-2 py-1 rounded-full bg-gray-100 text-indigo-400 text-sm">
                        {tag}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
