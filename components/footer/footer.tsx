import { fetchGraphQL } from "@/contentful/api";
import { footerQuery } from "@/contentful/gql-queries/components/footer/footer.query";
import { UnknownComponent } from "@/types/component";
import type { Footer } from "@/types/footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  data: UnknownComponent;
};

async function getFooter(id: string): Promise<Footer> {
  const res = await fetchGraphQL(footerQuery(id));

  if (!res.data) throw new Error("Could not locate footer data");

  return res.data.footer;
}

// @TODO need to type out footer

const Footer = async ({ data }: Props) => {
  const footerData = await getFooter(data.sys.id);

  return (
    <footer className='w-full flex flex-col items-center justify-center bg-blue-700'>
      <div className='w-3/4 flex flex-col gap-8 md:flex-row justify-between py-14 '>
        <div className='flex flex-col'>
          <h3 className='font-bold text-white text-uppercase'>
            {footerData.brandName}
          </h3>

          <Image
            src={footerData.logo.url}
            width={100}
            height={100}
            alt='logo'
          />

          <p className='text-white/80 mt-6 mb-2'>Find us on</p>
          <div className='flex gap-2'>
            <a
              title='Facebook Link'
              href={footerData.facebookLink}
              className='rounded-full p-2 bg-blue-500'
            >
              <Image src='fb.svg' width={20} height={20} alt='facebook-logo' />
            </a>
            <a
              title='Skype Link'
              href={footerData.skypeLink}
              className='rounded-full p-2 bg-blue-500'
            >
              <Image src='skype.svg' width={20} height={20} alt='skype-logo' />
            </a>
            <a
              title='Zoom Link'
              href={footerData.zoomLink}
              className='rounded-full p-2 bg-blue-500'
            >
              <Image src='zoom.svg' width={20} height={20} alt='skype-logo' />
            </a>
          </div>
        </div>
        {!!footerData.footerColumnsCollection.items.length &&
          footerData.footerColumnsCollection.items.map((column) => {
            return (
              <div key={column.sys.id} className='flex flex-col gap-2'>
                <p className='font-semibold text-white text-uppercase mb-2'>
                  {column.menuTitle}
                </p>
                {!!column.menuItemsCollection.items.length &&
                  column.menuItemsCollection.items.map((menuItem) => {
                    return (
                      <div key={menuItem.sys.id}>
                        <Link
                          href={menuItem.groupLink.slug}
                          className='text-white/80 text-sm hover:text-blue-500 transition-all'
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
      <div className='w-full border-t-2 border-blue-600 py-6 flex items-center justify-center'>
        <div className='w-3/4 flex justify-between gap-4 md:gap-0 md:items-center flex-col md:flex-row'>
          <p className='text-white/80 '>
            &copy; {footerData.brandName} All Rights Reserved
          </p>
          <p className='text-white/80'>
            Website Design & Development by{" "}
            <a
              href='https://alexshiresroth.com'
              className='font-bold text-blue-400'
            >
              Alex Roth
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
