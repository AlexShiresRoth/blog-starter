import MainContainer from '@/components/containers/main-container';
import RichTextRender from '@/components/rendering/rich-text-render';
import { fetchGraphQL } from '@/contentful/api';
import { blogPostQuery } from '@/contentful/gql-queries/components/blog/blogPost.query';
import { BlogCollectionResponseData } from '@/types/blog';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getBlogPost(slug: string) {
  try {
    const res = await fetchGraphQL<BlogCollectionResponseData>(
      blogPostQuery(slug)
    );
    return res.data.blogPostCollection.items[0];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata(
  { params: { slug } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getBlogPost(slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: page?.title || 'Missing SEO Title',
    description: page?.seoMetadata?.description || 'Missing SEO Description',
    openGraph: {
      images: [page?.seoMetadata?.image || '', ...previousImages],
      title: page?.seoMetadata?.title,
      description: page?.seoMetadata?.description || '',
    },
  };
}

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(slug);
  if (!post) return null;
  return (
    <MainContainer>
      <article className="w-11/12 px-4 py-8 md:px-0 md:w-1/2 container flex flex-col gap-8 mt-32 md:mt-8">
        <div className="flex flex-col items-center gap-4">
          {post.category && (
            <Link
              href={`/blog/posts?q=${post.category}`}
              className="text-indigo-500 font-semibold"
            >
              {post.category}
            </Link>
          )}
          {!!post?.tags.length && (
            <div className="flex items-center gap-2">
              {post.tags.map((tag, index) => (
                <Link
                  href={`/blog/posts?q=${tag}`}
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
        <div className="mt-10">
          <RichTextRender content={post.postContent} />
        </div>
      </article>
    </MainContainer>
  );
}
