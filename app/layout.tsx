import { fetchGraphQL } from '@/contentful/api';
import './globals.css';
import { Rubik } from 'next/font/google';
import { appQuery } from '@/contentful/gql-queries';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { SEOMetadata } from '@/types/page.type';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-abeezee',
  weight: ['400', '500', '600', '700'],
});

export interface AppQueryResponse {
  data: {
    appCollection: {
      items: {
        seoMetadata: SEOMetadata;
        sys: {
          id: string;
        };
        header: {
          sys: {
            id: string;
          };
          __typename: string;
        };
        footer: {
          sys: {
            id: string;
          };
          __typename: string;
        };
        homePage: {
          sys: {
            id: string;
          };
        };
      }[];
    };
  };
}

type Props = {
  children: React.ReactNode;
};

async function getAppData(domain: string) {
  try {
    const res = await fetchGraphQL<AppQueryResponse>(appQuery(domain));

    const app = res.data.appCollection.items[0];

    return app;
  } catch (error) {
    console.error('Error fetching app data:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const app = await getAppData(process.env.DOMAIN as string);

  if (!app) {
    return {
      title: `Blog Starter`,
      description:
        'Starting Template For a Blog Site, using contentful and NextJS 14',
    };
  }

  return {
    title: app.seoMetadata.title,
    description: app.seoMetadata.description,
    openGraph: {
      images: [app.seoMetadata.image.url],
      title: app.seoMetadata.title,
      description: app.seoMetadata.description,
    },
  };
}

export default async function RootLayout({ children }: Props) {
  const app = await getAppData(process.env.DOMAIN as string);
  if (!app) return null;
  return (
    <>
      <html lang="en" className={`${rubik.className}`}>
        <body>
          <>
            <Suspense>
              <Header data={app.header} />
            </Suspense>
            {children}
            <Footer data={app.footer} />
          </>
        </body>
      </html>
    </>
  );
}
