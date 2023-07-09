"use client";
import React from "react";
import { SubMenu } from "./sub-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cls from "classnames";

type Props = {
  navigation: NavigationJSON;
};

const NavItems = ({ navigation }: Props) => {
  const pathname = usePathname();
  return (
    <>
      {navigation.menuItemsCollection.items.map((item) => {
        if (item.featuredPagesCollection?.items.length > 0) {
          return <SubMenu key={item.sys.id} item={item} />;
        }
        return (
          <Link
            href={item.groupLink.slug ?? null}
            key={item.sys.id}
            className={cls(
              "font-semibold transition-all p-2 hover:bg-blue-500/80 rounded hover:text-white",
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
    </>
  );
};

export default NavItems;
