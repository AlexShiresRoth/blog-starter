import Header from "@/components/header/header";
import "./globals.css";
import { Rubik } from "next/font/google";
import Nav from "@/components/navigation/nav";
import { getNavigationByType } from "@/contentful/navigation.api";
import { fetchGraphQL } from "@/contentful/api";
import { appQuery } from "@/contentful/gql-queries/app/app.query";
import { AppQueryResponse } from "@/types/app";
import Footer from "@/components/footer/footer";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-abeezee",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "SATACTSENSE",
  description: "Tutoring for the SAT and ACT",
};

async function getApp(domain: string): Promise<AppQueryResponse> {
  const res = await fetchGraphQL(appQuery(domain));

  if (!res.data) throw new Error("Failed to fetch app data");

  const app = res.data.appCollection.items[0];

  return app;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const app = await getApp(process.env.DOMAIN as string);

  return (
    <>
      <html lang='en' className={`${rubik.className}`}>
        <body className='bg-gray-50'>
          {!!app && (
            <>
              {/* @ts-expect-error Async Server Component */}
              <Header data={app.header} />
              <div className='flex mt-36 md:mt-0 md:hidden' />
              {children}

              {/* @ts-expect-error Async Server Component */}
              <Footer data={app.footer} />
            </>
          )}
        </body>
      </html>
    </>
  );
}
