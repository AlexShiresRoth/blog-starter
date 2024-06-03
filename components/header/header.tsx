import { fetchGraphQL } from '@/contentful/api';
import { headerQuery } from '@/contentful/gql-queries/components/header/header.query';
import { UnknownComponent } from '@/types/component';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Nav from '../navigation/nav';
import { NavigationData } from '@/types/nav';
import { cn } from '@/lib/utils';
import { AppTheme, AppThemeResponse } from '@/app/layout';
import { appTheme } from '@/contentful/gql-queries';
import { Header as UIHeader } from '../ui/header';

type Props = {
  data?: UnknownComponent;
  slug?: string;
};

export interface Header {
  sys: {
    id: string;
    __typename: string;
  };
  logo: {
    url: string;
    title: string;
  };
  title: string;
  actionItemsCollection: NavigationData['actionItemsCollection'];
  navItemsCollection: NavigationData['navItemsCollection'];
}

export interface HeaderResponseData {
  data: {
    header: Header;
  };
}

async function getHeaderData(id: string) {
  try {
    const res = await fetchGraphQL<HeaderResponseData>(headerQuery(id));

    const header = res.data.header;

    return header;
  } catch (error) {
    console.error('Error fetching header data:', error);
    return null;
  }
}

async function getAppTheme(domain: string) {
  try {
    const res = await fetchGraphQL<AppThemeResponse>(appTheme(domain));

    const app = res.data.appCollection.items[0];

    return app.theme;
  } catch (error) {
    console.error('Error fetching app theme data:', error);
    return null;
  }
}

export default async function Header({ data, slug }: Props) {
  if (!data) return null;

  const header = await getHeaderData(data.sys.id);

  if (!header) {
    return null;
  }

  const theme = (await getAppTheme(process.env.DOMAIN as string)) || 'Basic';

  return (
    <>
      {theme === 'Basic' && (
        <span className="w-full bg-gradient-to-l from-rose-400 via-fuchsia-500 to-indigo-700 h-2 block"></span>
      )}
      <UIHeader variant={theme}>
        <div className="flex flex-col md:flex-row md:flex-wrap items-center py-4">
          <HeaderLogo logo={header.logo} title={header.title} theme={theme} />
        </div>
        <Nav
          actionItemsCollection={header.actionItemsCollection}
          navItemsCollection={header.navItemsCollection}
          slug={slug}
        />
      </UIHeader>
    </>
  );
}

const LogoClassNamesBase = `relative z-10 text-2xl md:text-2xl text-black before:h-3 before:rounded-full before:w-[105%] before:block before:content-[' '] before:bg-indigo-500 before:absolute before:skew-y-1 before:-left-[7px] before:bottom-[2px] before:-z-10`;
const LogoClassNamesModern = `text-base font-normal px-2 py-1 border-r border-b dark:border-white rounded-br`;
const LogoClassNamesDarkMode = `dark:text-white`;

const LogoVariants = {
  Basic: LogoClassNamesBase,
  Modern: LogoClassNamesModern,
  Playful: '',
  Elegant: '',
};

const HeaderLogo = ({
  logo,
  title,
  theme,
}: Pick<Header, 'logo' | 'title'> & { theme: AppTheme }) => (
  <Link href={'/'} className="flex items-center">
    {logo && <Image src={logo.url} alt={logo.title} height={60} width={60} />}
    <h2 className={cn([LogoVariants[theme], LogoClassNamesDarkMode])}>
      {title}
    </h2>
  </Link>
);
