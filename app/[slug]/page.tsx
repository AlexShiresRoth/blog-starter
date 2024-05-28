import ComponentRenderer from '@/components/rendering/component-renderer';
import { fetchGraphQL } from '@/contentful/api';
import {
  pageCollectionQuerySlugOnly,
  pageQuery,
} from '@/contentful/gql-queries/components/page/page.query';
import { PageCollectionResponseData } from '@/types/page.type';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const res = await fetchGraphQL<PageCollectionResponseData>(
    pageCollectionQuerySlugOnly(100, 0)
  );

  if (!res.data?.pageCollection?.items.length) return [];

  return res.data.pageCollection.items.map((page) => ({
    slug: page.slug,
  }));
}

async function getPage(slug: string) {
  try {
    const res = await fetchGraphQL<PageCollectionResponseData>(pageQuery(slug));

    if (!res.data) throw new Error('Could not locate page data');

    return res.data.pageCollection.items[0];
  } catch (error) {
    console.error('Error fetching home data:', error);
    return null;
  }
}

export async function generateMetadata(
  { params: { slug } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage(slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: page?.seoMetadata?.title || 'Page',
    description: page?.seoMetadata?.description || '',
    openGraph: {
      images: [page?.seoMetadata?.image || '', ...previousImages],
      title: page?.seoMetadata?.title,
      description: page?.seoMetadata?.description || '',
    },
  };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  if (
    !page.pageContent &&
    !page.topSectionCollection.items.length &&
    !page.extraSectionCollection.items.length
  ) {
    notFound();
  }

  return (
    <main className="flex flex-col">
      {!!page.topSectionCollection.items.length && (
        <ComponentRenderer itemsToRender={page?.topSectionCollection?.items} />
      )}

      {!!page.pageContent && (
        <ComponentRenderer itemsToRender={[page?.pageContent]} />
      )}

      {!!page.extraSectionCollection.items.length && (
        <ComponentRenderer itemsToRender={page.extraSectionCollection?.items} />
      )}
    </main>
  );
}
