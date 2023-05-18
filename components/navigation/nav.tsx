import Link from "next/link";
import React from "react";
import { getNavigationByType } from "@/contentful/navigation.api";
import NavItems from "./nav-items";

const Nav = async () => {
  const { navigation } = await getNavigationByType({ navType: "main" });

  return (
    <nav className='w-full flex justify-center '>
      <div className='w-full flex items-center gap-4  mt-4 py-2  '>
        <div className='w-full flex items-center gap-4 justify-between text-black'>
          <NavItems navigation={navigation} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
