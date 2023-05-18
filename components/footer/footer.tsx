import { fetchGraphQL } from "@/contentful/api";
import { footerQuery } from "@/contentful/gql-queries/components/footer/footer.query";
import { UnknownComponent } from "@/types/component";
import Link from "next/link";
import React from "react";

type Props = {
  data: UnknownComponent;
};

async function getFooter(id: string) {
  const res = await fetchGraphQL(footerQuery(id));

  if (!res.data) throw new Error("Could not locate footer data");

  const footer = res.data.footer;

  return footer;
}

// @TODO need to type out footer

const Footer = async ({ data }: Props) => {
  const footerData = await getFooter(data.sys.id);

  console.log("footer data", footerData);
  return (
    <footer className='w-full flex justify-center bg-blue-700'>
      <div className='md:w-3/4 flex justify-between py-12 '>
        {!!footerData.footerColumnsCollection.items.length &&
          footerData.footerColumnsCollection.items.map((column) => {
            return (
              <div key={column.sys.id} className='flex flex-col gap-2'>
                <p className='font-semibold text-white text-uppercase mb-2'>
                  {column.menuTitle}
                </p>
                {!!column.menuItemsCollection.items.length &&
                  column.menuItemsCollection.items.map((menuItem) => {
                    console.log("menu item", menuItem);
                    // @TODO handle different types like social links and such
                    return (
                      <div key={menuItem.sys.id}>
                        <Link
                          href={menuItem.groupLink.slug}
                          className='text-white/80 text-sm hover:text-yellow-300 transition-all'
                        >
                          {menuItem.groupName}
                        </Link>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </footer>
  );
};

export default Footer;
