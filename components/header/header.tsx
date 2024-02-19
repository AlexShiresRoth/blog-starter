import { fetchGraphQL } from "@/contentful/api";
import { headerQuery } from "@/contentful/gql-queries/components/header/header.query";
import { UnknownComponent } from "@/types/component";
import { HeaderJSON } from "@/types/header.type";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Nav from "../navigation/nav";
import Head from "next/head";

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
    <>
      <header
        className='w-full flex flex-col items-center pb-2 md:py-4 fixed top-0 left-0 z-40 bg-white shadow-sm md:relative'
        data-component-type='header'
      >
        <div className='flex flex-row  w-11/12 mx-4  items-center justify-between border-b-2 border-gray-100 mb-2 md:mb-0 md:border-0 md:items-stretch md:mx-0 md:w-3/4 md:flex-col'>
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
        <div className='w-11/12 mx-4 mt-2 flex gap-4 items-center justify-between md:hidden'>
          <ContactLinks header={header} />
        </div>
      </header>
    </>
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
      const faqRegex = new RegExp("faq", "i");
      const contactRegex = new RegExp("contact us", "i");

      return (
        <Link
          key={item.sys.id}
          href={item.featuredPage.slug ?? null}
          className={classNames(
            "md:py-2 rounded-full text-black font-semibold md:flex md:flex-row md:items-center md:gap-2 md:font-medium text-sm  md:text-base md:hover:text-white md:hover:bg-blue-600 transition-all md:px-4 ",
            {
              "md:bg-blue-50 md:text-gray-700": index === 0,
              "md:bg-blue-200  md:text-gray-700": index > 0,
            }
          )}
        >
          {!!item.displayText.match(faqRegex) && (
            <button title='faq-button'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-6 h-6 '
              >
                <path d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM13 13.3551C14.4457 12.9248 15.5 11.5855 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.302 6.5 8.88637 7.70919 8.56731 9.31346L10.5288 9.70577C10.6656 9.01823 11.2723 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V14H13V13.3551Z'></path>
              </svg>
            </button>
          )}
          {!!item.displayText.match(contactRegex) && (
            <button title='contact us button'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-6 h-6 '
              >
                <path d='M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z'></path>
              </svg>
            </button>
          )}
          <span className='hidden md:visible md:flex'>{item.displayText}</span>
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
          className='w-6 h-6'
        >
          <path d='M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z'></path>
        </svg>
        <span className='hidden md:visible md:flex'>{header.phone}</span>
      </a>
    </div>
  </>
);

export default Header;
