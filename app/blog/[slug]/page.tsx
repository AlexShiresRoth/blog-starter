import RichTextRender from '@/components/rendering/rich-text-render';
import { fetchGraphQL } from '@/contentful/api';
import { blogPostQuery } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { BlogCollectionResponseData } from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';

async function getBlogPost(slug: string) {
  try {
    const res = await fetchGraphQL<BlogCollectionResponseData>(
      blogPostQuery(slug)
    );

    console.log('res:', res);
    return res.data.blogPostCollection.items[0];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(slug);
  if (!post) return null;
  return (
    <main className="w-full flex flex-col items-center py-10">
      <div className="flex flex-col items-center w-full md:w-11/12 lg:w-1/2 gap-8">
        <article className="w-3/4 flex flex-col gap-8 mt-8">
          <div className="flex flex-col items-center gap-4">
            {post.category && (
              <Link
                href={`/posts?category=${post.category}`}
                className="text-indigo-500 font-semibold"
              >
                {post.category}
              </Link>
            )}
            {!!post?.tags.length && (
              <div className="flex items-center gap-2">
                {post.tags.map((tag, index) => (
                  <Link
                    href={`/posts?tag=${tag}`}
                    key={index}
                    className="text-sm bg-stone-100 rounded-full py-1 px-2 text-stone-500"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-5xl font-bold text-center">{post.title}</h1>
            <span className="h-3 w-20 bg-indigo-500 block rounded-xl" />
            {post.briefDescription && (
              <p className="text-sm text-center italic">
                {post.briefDescription}
              </p>
            )}
          </div>
          {post.postImage && (
            <div className="relative rounded-lg w-full h-96">
              <Image
                src={post.postImage.url}
                alt={post.title}
                fill
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="mt-10 border-t border-stone-200 py-8">
            <RichTextRender content={post.postContent} />
          </div>
        </article>
      </div>
    </main>
  );
}
