import Link from 'next/link';

type Props = {
  title: string;
  linkTitle: string;
  allPostsLink?: string;
};

export default function AllPostsHeader({
  title,
  linkTitle,
  allPostsLink,
}: Props) {
  return (
    <div className="flex justify-between items-end w-full">
      <h2 className="md:ml-8">{title}</h2>
      <Link
        href={allPostsLink ? `/blog/${allPostsLink}` : '/blog/posts'}
        className="flex gap-2 items-center "
      >
        {linkTitle || 'All Posts'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width={16}
          height={16}
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
      </Link>
    </div>
  );
}
