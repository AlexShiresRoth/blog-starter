import './globals.css';
import { Rubik } from 'next/font/google';
import { fetchGraphQL } from '@/contentful/api';
import { appQuery } from '@/contentful/gql-queries/app/app.query';
import { z } from 'zod';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-abeezee',
  weight: ['400', '500', '600', '700'],
});

export const GetAppResponse = z.object({
  data: z.object({
    appCollection: z.object({
      items: z.array(
        z.object({
          sys: z.object({ id: z.string() }),
          header: z.object({
            sys: z.object({ id: z.string() }),
            __typename: z.string(),
          }),
          footer: z.object({ sys: z.object({ id: z.string() }) }),
          homePage: z.object({ sys: z.object({ id: z.string() }) }),
        })
      ),
    }),
  }),
});

export type AppQueryResponse = z.infer<typeof GetAppResponse>;

// @todo make this pull data from contentful
export async function generateMetadata() {
  return {
    title: 'Blog Starter',
    description:
      'Starting Template For a Blog Site, using contentful and NextJS 14',
  };
}

export async function getApp(domain: string) {
  const res = await fetchGraphQL<AppQueryResponse>(appQuery(domain));

  if (!res.data) throw new Error('Failed to fetch app data');

  const app = res.data.appCollection.items[0];

  return app;
}

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const app = await getApp(process.env.DOMAIN as string);

  return (
    <>
      <html lang="en" className={`${rubik.className}`}>
        <body>
          {!!app && (
            <>
              {children}

              {/* <Footer data={app.footer} /> */}
            </>
          )}
        </body>
      </html>
    </>
  );
}
