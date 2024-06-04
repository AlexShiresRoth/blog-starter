import Link from 'next/link';

export default function PostTag({ tag }: { tag: string }) {
  return (
    <Link
      href={`/blog/posts?q=${tag}`}
      className="py-1 px-2 md:px-4 md:py-1 bg-stone-100  dark:px-2 rounded-full"
    >
      <p className="text-xs text-stone-500 dark:text-stone-800">{tag}</p>
    </Link>
  );
}
