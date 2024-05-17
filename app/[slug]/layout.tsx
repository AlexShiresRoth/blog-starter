import Header from '@/components/header/header';
import { fetchGraphQL } from '@/contentful/api';
import { appQuery } from '@/contentful/gql-queries';
import React from 'react';
import { AppQueryResponse } from '../layout';

type Props = {
  children: React.ReactNode;
  params: { slug: string };
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

export default async function DynamicPageLayout({ params, children }: Props) {
  const app = await getAppData(process.env.DOMAIN as string);

  if (!app) return null;

  return (
    <>
      <Header data={app.header} slug={params.slug} />
      {children}
    </>
  );
}
