import './globals.css';
import { Rubik } from 'next/font/google';
import { fetchGraphQL } from '@/contentful/api';
import { z } from 'zod';
import { appQuery } from '@/contentful/gql-queries';

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
    title: `Blog Starter`,
    description:
      'Starting Template For a Blog Site, using contentful and NextJS 14',
  };
}

export async function getApp(domain: string) {
  const res = await fetchGraphQL<AppQueryResponse>(appQuery(domain));

  const app = res.data.appCollection.items[0];

  return app;
}

type Props = {
  children: React.ReactNode;
};

// @note I don't think we can use zod

export default async function RootLayout({ children }: Props) {
  const app = await getApp(process.env.DOMAIN as string);

  if (!app) return null;

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
