import { fetchGraphQL } from "@/contentful/api";
import { headerQuery } from "@/contentful/gql-queries/components/header/header.query";
import { UnknownComponent } from "@/types/component";
import { HeaderJSON } from "@/types/header.type";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Nav from "../navigation/nav";

type Props = {
  data: UnknownComponent;
  children: React.ReactNode;
};

async function getHeaderData(id: string): Promise<HeaderJSON> {
  const res = await fetchGraphQL(headerQuery(id));

  if (!res.data) throw new Error("Could not locate header");

  const header = res.data.header;

  return header;
}

const Header = async ({ data }: Props) => {
  const header = await getHeaderData(data.sys.id);

  if (!header) {
    return null;
  }

  return (
    <header className='w-full flex flex-col items-center py-4 relative'>
      <div className='flex flex-row  w-11/12 mx-4  items-center justify-between border-b-2 border-gray-100 mb-4 md:mb-0 md:border-0 md:items-stretch md:mx-0 md:w-3/4 md:flex-col'>
        <div className='flex flex-col md:flex-row md:flex-wrap items-center justify-between py-4 md:border-b-2 md:border-slate-100 '>
          <HeaderLogo header={header} />
          <div className='hidden md:flex items-center gap-4'>
            <ContactLinks header={header} />
          </div>
        </div>
        {/* Navigation */}

        {/* @ts-expect-error Async Server Component */}
        <Nav />
      </div>
      <div className='w-11/12 mx-4 flex gap-4 items-center justify-between md:hidden'>
        <ContactLinks header={header} />
      </div>
    </header>
  );
};

const HeaderLogo = ({ header }: { header: HeaderJSON }) => (
  <Link href={"/"} className='flex items-center'>
    {header.logo && (
      <Image
        src={header.logo.url}
        alt={header.logo.title}
        height={60}
        width={60}
      />
    )}
    <h2 className="relative z-10 text-2xl md:text-5xl text-black before:h-4 before:w-full before:block before:content-[' '] before:bg-yellow-300 before:absolute before:skew-y-1 before:bottom-[2px] before:-z-10">
      {header.title}
    </h2>
  </Link>
);

const ContactLinks = ({ header }: { header: HeaderJSON }) => (
  <>
    {header.actionItemsCollection.items.map((item, index) => {
      return (
        <Link
          key={item.sys.id}
          href={item.featuredPage.slug ?? null}
          className={classNames(
            "py-2  rounded-full text-black font-semibold md:font-medium text-sm md:text-base md:hover:text-white md:hover:bg-blue-600 transition-all md:px-4 ",
            {
              "md:bg-blue-50 md:text-gray-700": index === 0,
              "md:bg-blue-500 md:text-white": index > 0,
            }
          )}
        >
          {item.displayText}
        </Link>
      );
    })}
    <div>
      <a
        href={`tel:${header.phone}`}
        className='flex items-center gap-2 text-black font-semibold text-sm md:text-base'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='w-4 h-4'
        >
          <path d='M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z'></path>
        </svg>
        {header.phone}
      </a>
    </div>
  </>
);

export default Header;
