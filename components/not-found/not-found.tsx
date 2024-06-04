import Link from 'next/link';

export function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-[80dvh] px-4 md:px-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-6xl font-bold tracking-tighter">404</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Oops! It looks like the page you{`'`}re looking for doesn{`'`}t exist.
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
