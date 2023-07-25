"use client";
import classNames from "classnames";
import NavItems from "./nav-items";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const MobileNav = ({ navigation }: { navigation: NavigationJSON }) => {
  const [isToggled, toggleMenu] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    toggleMenu(false);
  }, [pathname]);

  return (
    <nav className=' flex  md:hidden justify-center '>
      <div className='w-full flex items-center gap-2  py-2  '>
        <button
          title='menu-button '
          className='p-2 bg-gray-200/80  rounded'
          onClick={() => toggleMenu(!isToggled)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className='w-4 h-4 text-white stroke-blue-500'
          >
            <path d='M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z'></path>
          </svg>
        </button>
        <Menu
          isToggled={isToggled}
          navigation={navigation}
          toggleMenu={toggleMenu}
        />
      </div>
    </nav>
  );
};

const Menu = ({
  isToggled,
  navigation,
  toggleMenu,
}: {
  isToggled: boolean;
  navigation: NavigationJSON;
  toggleMenu: (val: boolean) => void;
}) => (
  <AnimatePresence>
    {isToggled && (
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className={classNames(
          "absolute top-0 left-0 bg-white p-4 w-full z-50",
          {
            "hidden opacity-0 -z-10": !isToggled,
            "flex flex-col items-center gap-4 justify-center text-black":
              isToggled,
          }
        )}
      >
        <div className='w-full flex justify-end '>
          <button
            title='close-menu-button'
            className='flex items-center gap-2 text-black'
            onClick={() => toggleMenu(!isToggled)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-8 h-8'
            >
              <path d='M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z'></path>
            </svg>
          </button>
        </div>
        <NavItems navigation={navigation} />
      </motion.div>
    )}
  </AnimatePresence>
);

export default MobileNav;
