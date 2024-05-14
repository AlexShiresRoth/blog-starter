import { BlogPostData } from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  post: BlogPostData;
};

export default function PostCard({ post }: Props) {
  return (
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
          post.tags.map((tag, index) => (
            <div key={index}>
              <p className="px-2 py-1 rounded-full bg-gray-100 text-indigo-400 text-sm">
                {tag}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
