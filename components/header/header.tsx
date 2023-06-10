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
    <header className='w-full flex flex-col items-center py-4 '>
      <div className='w-3/4 flex flex-col '>
        <div className='flex flex-wrap items-center justify-between border-b-2 border-slate-100 py-4'>
          <div className='flex items-center'>
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
          </div>
          <div className='flex items-center gap-4'>
            {header.actionItemsCollection.items.map((item, index) => {
              return (
                <Link
                  key={item.sys.id}
                  href={item.featuredPage.slug}
                  className={classNames(
                    "px-4 py-2  rounded-full hover:text-white hover:bg-blue-600 transition-all",
                    {
                      "bg-blue-50 text-gray-700": index === 0,
                      "bg-blue-500 text-white": index > 0,
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
                className='text-black font-semibold'
              >
                {header.phone}
              </a>
            </div>
          </div>
        </div>
        {/* Navigation */}

        {/* @ts-expect-error Async Server Component */}
        <Nav />
      </div>
    </header>
  );
};

export default Header;
