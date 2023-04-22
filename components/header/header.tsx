import { HeaderJSON } from "@/types/header.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  header: HeaderJSON;
  children: React.ReactNode;
};

const Header = ({ header, children }: Props) => {
  return (
    <header className="w-full flex flex-col items-center py-4 ">
      <div className="w-3/4 flex flex-col ">
        <div className="flex items-center justify-between border-b-2 border-slate-100 py-4">
          <div className="flex items-center">
            {header.logo && (
              <Image
                src={header.logo.url}
                alt={header.logo.title}
                height={60}
                width={60}
              />
            )}
            <h2 className="relative z-10 text-5xl text-black before:h-4 before:w-full before:block before:content-[' '] before:bg-yellow-300 before:absolute before:skew-y-1 before:bottom-[2px] before:-z-10">
              {header.title}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {header.actionItemsCollection.items.map((item) => {
              return (
                <Link
                  key={item.sys.id}
                  href={item.featuredPage.slug}
                  className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition-all"
                >
                  {item.displayText}
                </Link>
              );
            })}
            <div>
              <a
                href={`tel:${header.phone}`}
                className="text-black font-semibold"
              >
                {header.phone}
              </a>
            </div>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
};

export default Header;
