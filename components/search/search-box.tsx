import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

async function searchPosts(formData: FormData) {
  'use server';

  const query = formData.get('query') as string;

  revalidateTag('blogPosts');
  redirect(`/blog/posts?q=${query}`);
}

export default async function SearchBox() {
  return (
    <div className="w-full flex items-center justify-center py-4 md:py-10 ">
      <div className="w-full flex items-center justify-center">
        <form
          action={searchPosts}
          className="w-full max-w-md border border-stone-400 rounded-full py-2 pl-1 pr-2 flex items-center justify-between"
        >
          <input
            type="text"
            name="query"
            id="query"
            placeholder="Search"
            className="indent-2 outline-none w-full bg-transparent"
            maxLength={60}
          />
          <button className="bg-black rounded-full p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width={18}
              height={18}
            >
              <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
