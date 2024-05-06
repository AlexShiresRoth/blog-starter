import React from 'react';
import NavItems from './nav-items';
import { z } from 'zod';
import Link from 'next/link';
import classNames from 'classnames';

export const NavObject = z.object({
  actionItemsCollection: z.object({
    items: z.array(
      z.object({
        sys: z.object({
          id: z.string(),
        }),
        displayText: z.string(),
        featuredPage: z.object({
          pageName: z.string(),
          slug: z.string(),
        }),
      })
    ),
  }),
  navItemsCollection: z.object({
    items: z.array(
      z.object({
        sys: z.object({
          id: z.string(),
        }),
        menuTitle: z.string(),
        menuItemsCollection: z.object({
          items: z.array(
            z.object({
              sys: z.object({ id: z.string() }),
              groupName: z.string(),
              groupLink: z.object({
                __typename: z.string(),
                pageName: z.string(),
                slug: z.string(),
              }),
              featuredPagesCollection: z.object({
                items: z.array(
                  z.object({
                    slug: z.string(),
                    pageName: z.string(),
                  })
                ),
              }),
            })
          ),
        }),
      })
    ),
  }),
});

export type NavProps = z.infer<typeof NavObject> & { slug?: string };

const Nav = async ({
  actionItemsCollection,
  navItemsCollection,
  slug,
}: NavProps) => {
  return (
    <>
      <nav className="hidden md:flex justify-center">
        <div className="w-full flex items-center  mt-4 py-2">
          <div className="w-full flex items-center gap-4 justify-between text-black">
            {navItemsCollection.items.map((item) => (
              <div>
                {item.menuItemsCollection.items.map((menuItem) => (
                  <Link
                    href={menuItem.groupLink.slug ?? null}
                    key={menuItem.sys.id}
                    className={classNames(
                      'transition-all hover:border-b-indigo-500 hover:text-indigo-500',
                      {
                        'border-black border-b ':
                          slug === menuItem.groupLink.slug,
                        'border-transparent border-b ':
                          slug !== menuItem.groupLink.slug,
                      }
                    )}
                  >
                    {menuItem.groupName}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </nav>
      {/* <MobileNav navigation={navigation} /> */}
    </>
  );
};

export default Nav;
