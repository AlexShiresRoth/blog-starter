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
import { BlogCollectionResponseData } from '@/types/blog';
import Image from 'next/image';

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

  console.log(suggestedPosts);
  if (!suggestedPosts.length) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-stone-50 w-full flex flex-col items-center">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Suggested Blog Posts
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Check out our latest blog posts.
            </p>
          </div>
          <Carousel className="w-full max-w-6xl">
            <CarouselContent>
              <CarouselItem>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 m-4">
                  {suggestedPosts.slice(0, 3).map((blogPost) => (
                    <div
                      className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      key={blogPost.sys.id}
                    >
                      <Link
                        className="block h-full"
                        href={`/blog/posts/${blogPost.slug}`}
                      >
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
                        <div className="p-4">
                          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-50">
                            {blogPost.title}
                          </h3>
                          <p className="mt-2 text-gray-500 dark:text-gray-400 line-clamp-2">
                            {blogPost.briefDescription}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 m-4">
                  {suggestedPosts.slice(3, 6).map((blogPost) => (
                    <div
                      className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      key={blogPost.sys.id}
                    >
                      <Link
                        className="block h-full"
                        href={`/blog/posts/${blogPost.slug}`}
                      >
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
                        <div className="p-4">
                          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-50">
                            {blogPost.title}
                          </h3>
                          <p className="mt-2 text-gray-500 dark:text-gray-400 line-clamp-2">
                            {blogPost.briefDescription}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 m-4">
                  {suggestedPosts.slice(6, 9).map((blogPost) => (
                    <div
                      className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      key={blogPost.sys.id}
                    >
                      <Link
                        className="block h-full"
                        href={`/blog/posts/${blogPost.slug}`}
                      >
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
                        <div className="p-4">
                          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-50">
                            {blogPost.title}
                          </h3>
                          <p className="mt-2 text-gray-500 dark:text-gray-400 line-clamp-2">
                            {blogPost.briefDescription}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/50 p-2 shadow-lg transition-colors hover:bg-white dark:bg-gray-900/50 dark:hover:bg-gray-800">
              <ChevronLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/50 p-2 shadow-lg transition-colors hover:bg-white dark:bg-gray-900/50 dark:hover:bg-gray-800">
              <ChevronRightIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function ChevronLeftIcon(props) {
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

function ChevronRightIcon(props) {
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
