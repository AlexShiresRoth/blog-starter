import Header from '@/components/header/header';
import React from 'react';
import { getApp } from '../layout';

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

export default async function DynamicPageLayout({ params, children }: Props) {
  const app = await getApp(process.env.DOMAIN as string);
  return (
    <>
      <Header data={app.header} slug={params.slug} />
      {children}
    </>
  );
}
