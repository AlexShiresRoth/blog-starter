import RichTextRender from '@/components/rendering/rich-text-render';
import { fetchGraphQL } from '@/contentful/api';
import { blogPostQuery } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { BlogCollectionResponseData } from '@/types/blog';
import Image from 'next/image';

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
    <main className="w-full flex flex-col items-center">
      <div className="flex flex-col w-full md:w-11/12  lg:w-3/4">
        {post.postImage && (
          <Image
            src={post.postImage.url}
            alt={post.title}
            width={1000}
            height={500}
          />
        )}
        <article className="w-1/2 flex flex-col gap-4 mt-8">
          <h1>{post.title}</h1>
          <RichTextRender content={post.postContent} />
        </article>
      </div>
    </main>
  );
}
