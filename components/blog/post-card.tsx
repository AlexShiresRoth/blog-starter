import { BlogPostData } from '@/types/blog';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  post: BlogPostData;
};

export default function PostCard({ post }: Props) {
  return (
    <div key={post.sys.id} className="flex flex-col gap-4 py-4">
      <Link
        href={`/blog/posts/${post.slug}`}
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
      </Link>
      <div className="flex flex-col gap-2">
        <p className="text-sm -mb-2">{format(post.sys.publishedAt, 'PP')}</p>
        <Link href={`/blog/posts/${post.slug}`} className="hover:underline">
          <h3 className="text-2xl font-bold">{post.title}</h3>
        </Link>
        <p className="text-gray-500">{post.briefDescription}</p>
        <div className="flex gap-4 items-center">
          <Link href={`/blog/posts?q=${post.category}`}>
            <p className="px-2 py-1 rounded-full bg-black text-white dark:px-0 text-sm">
              {post.category}
            </p>
          </Link>
          {!!post.tags?.length &&
            post.tags.map((tag, index) => (
              <Link key={index} href={`/blog/posts?q=${tag}`}>
                <p className="px-2 py-1 rounded-full bg-gray-100 text-indigo-400 dark:bg-transparent dark:px-0 dark:hover:text-indigo-600 transition-colors text-sm">
                  {tag}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
