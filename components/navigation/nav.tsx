"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import cls from "classnames";
type Props = {
  navigation: NavigationJSON;
};

const Nav = ({ navigation }: Props) => {
  const pathname = usePathname();

  console.log("pathname>>>>", pathname, "navigation>>>>", navigation);
  return (
    <nav className="w-full flex justify-center ">
      <div className="w-full flex items-center gap-4  my-4 py-2  ">
        <div className="w-full flex items-center gap-4 justify-between text-black">
          {navigation.menuItemsCollection.items.map((item) => {
            if (item.featuredPagesCollection?.items.length > 0) {
              return <SubMenu key={item.sys.id} item={item} />;
            }
            return (
              <Link
                href={item.groupLink.slug}
                key={item.sys.id}
                className={cls(
                  "font-semibold transition-all p-2 hover:bg-blue-500/30 rounded hover:text-white",
                  {
                    "bg-blue-50 rounded text-blue-500 ":
                      pathname.replace("/", "") === item.groupLink.slug,
                    "text-gray-700":
                      pathname.replace("/", "") !== item.groupLink.slug,
                  }
                )}
              >
                {item.groupName}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

const SubMenu = ({
  item,
}: {
  item: NavigationJSON["menuItemsCollection"]["items"][number];
}) => {
  console.log("item", item);

  const [show, setShow] = useState<boolean>(false);
  return (
    <div
      className="relative flex flex-col justify-end font-semibold "
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link
        href={item.groupLink.slug}
        className="flex items-center gap-2 text-gray-700"
      >
        {item.groupName}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </Link>
      {show && (
        <div className="absolute z-10 shadow-lg p-2 rounded bg-white flex flex-col top-[100%] min-w-[150px]">
          {item.featuredPagesCollection?.items.map((page) => {
            return (
              <Link
                href={page.slug}
                key={page.sys.id}
                className="hover:bg-blue-300 text-gray-700 hover:text-white transition-all p-2 rounded"
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

export default Nav;
