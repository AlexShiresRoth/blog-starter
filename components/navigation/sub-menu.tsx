"use client";

import Link from "next/link";
import { useState } from "react";

export const SubMenu = ({
  item,
}: {
  item: NavigationJSON["menuItemsCollection"]["items"][number];
}) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div
      className='relative flex flex-col justify-end font-semibold '
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link
        href={item.groupLink.slug}
        className='flex items-center gap-2 text-gray-700'
      >
        {item.groupName}{" "}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </Link>
      {show && (
        <div className='absolute z-10 shadow-lg p-2 rounded bg-white flex flex-col top-[100%] min-w-[150px]'>
          {item.featuredPagesCollection?.items.map((page) => {
            return (
              <Link
                href={page.slug}
                key={page.sys.id}
                className='hover:bg-blue-300 text-gray-700 hover:text-white transition-all p-2 rounded'
              >
                {page.pageName}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
