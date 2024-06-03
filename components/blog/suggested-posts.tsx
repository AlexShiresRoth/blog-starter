import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { fetchGraphQL } from '@/contentful/api';
import { blogPostCollectionQueryExcludeSlug } from '@/contentful/gql-queries';
import { BlogCollectionResponseData, BlogPostData } from '@/types/blog';
import Image from 'next/image';
import { format } from 'date-fns';

type Props = {
  excludePostSlug: string;
  category: string;
  tags: string[];
};

async function getSuggestedBlogPosts(
  excludePostSlug: string,
  postCategory: string,
  postTags: string[]
) {
  try {
    const res = await fetchGraphQL<BlogCollectionResponseData>(
      blogPostCollectionQueryExcludeSlug(
        excludePostSlug,
        postCategory,
        postTags
      ),
      120,
      ['blogPost']
    );
    return res.data.blogPostCollection.items;
  } catch (error) {
    console.error('Error fetching suggested blog posts:', error);
    return [];
  }
}

export default async function SuggestedPosts({
  excludePostSlug,
  category,
  tags,
}: Props) {
  const suggestedPosts = await getSuggestedBlogPosts(
    excludePostSlug,
    category,
    tags
  );

  if (!suggestedPosts.length || suggestedPosts.length < 3) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-stone-50 dark:bg-transparent dark:border-t dark:border-t-gray-900 w-full flex flex-col items-center">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              More like this
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Check out similar posts to this one.
            </p>
          </div>
          {/* Widescreen carousel */}
          <Carousel className="w-full relative hidden md:block">
            <CarouselContent>
              {suggestedPosts.map((_blogPost, index) => {
                if (index % 3 === 0 && index !== 0) {
                  const endIndex = index % 3 === 0 ? index : 0;
                  const startIndex = endIndex - 3 > 0 ? endIndex - 3 : 0;
                  return (
                    <CarouselItem key={index}>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 m-4 dark:m-0">
                        {suggestedPosts
                          .slice(startIndex, endIndex)
                          .map((blogPost) => (
                            <PostCarouselItem
                              blogPost={blogPost}
                              key={blogPost.sys.id}
                            />
                          ))}
                      </div>
                    </CarouselItem>
                  );
                }
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:block absolute -left-8 dark:-left-12 top-1/2 -translate-y-1/2 rounded-full bg-white/50 p-2 shadow-lg transition-colors hover:bg-white dark:bg-gray-900/50 dark:hover:bg-gray-800 dark:text-stone-300">
              <ChevronLeftIcon className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="hidden md:block absolute -right-8 dark:-right-12 top-1/2 -translate-y-1/2 rounded-full bg-white/50 p-2 shadow-lg transition-colors hover:bg-white dark:bg-gray-900/50 dark:hover:bg-gray-800 dark:text-stone-300">
              <ChevronRightIcon className="h-6 w-6 dark:text-white" />
            </CarouselNext>
          </Carousel>
          {/* Mobile carousel */}
          <Carousel className="w-full max-w-6xl relative block md:hidden">
            <CarouselContent>
              {suggestedPosts.map((_blogPost, index) => (
                <CarouselItem key={index}>
                  <div className="grid grid-cols-1 m-8 dark:m-0">
                    {suggestedPosts.slice(index, index + 1).map((blogPost) => (
                      <PostCarouselItem
                        blogPost={blogPost}
                        key={blogPost.sys.id}
                      />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function PostCarouselItem({ blogPost }: { blogPost: BlogPostData }) {
  return (
    <div className="w-full group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border dark:border-gray-900">
      <Link href={`/blog/posts/${blogPost.slug}`}>
        <Image
          alt={blogPost.postImage.title}
          className="h-48 w-full object-cover transition-all duration-300 group-hover:scale-105"
          height={400}
          src={blogPost.postImage.url}
          style={{
            aspectRatio: '600/400',
            objectFit: 'cover',
          }}
          width={600}
        />
      </Link>
      <div className="p-4">
        <p className="text-xs">{format(blogPost.sys.publishedAt, 'PP')}</p>

        <Link href={`/blog/posts/${blogPost.slug}`}>
          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-50">
            {blogPost.title}
          </h3>
        </Link>
        <p className="mt-2 text-gray-500 dark:text-gray-400 line-clamp-2">
          {blogPost.briefDescription}
        </p>
        <div className="flex gap-2 items-center my-2">
          {blogPost.category && (
            <Link
              href={`/blog/posts?q=${blogPost.category}`}
              className="text-indigo-500 font-semibold text-sm"
            >
              {blogPost.category}
            </Link>
          )}
          {blogPost.tags?.length && (
            <div className="flex gap-2">
              {blogPost.tags.map((tag, index) => (
                <Link
                  href={`/blog/posts?q=${tag}`}
                  key={index}
                  className="text-xs bg-stone-100 dark:bg-transparent rounded-full text-stone-500 dark:text-stone-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChevronLeftIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
