import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className='w-full flex justify-center'>
      <div className='w-11/12 flex items-center gap-4 py-4'>
        <h2>SATACTSENSE</h2>

        <Link href='home'>Home</Link>
        <Link href='home'>SAT Prep</Link>
        <Link href='home'>PSAT Prep</Link>
        <Link href='home'>ACT Prep</Link>
      </div>
    </nav>
  );
};

export default Nav;
