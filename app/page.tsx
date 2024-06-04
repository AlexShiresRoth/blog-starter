import ComponentRenderer from '@/components/rendering/component-renderer';
import { pageQuery } from '@/contentful/gql-queries/components/page/page.query';
import { fetchGraphQL } from '@/contentful/api';
import { PageCollectionResponseData } from '@/types/page.type';
import MainContainer from '@/components/containers/main-container';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getHome(slug: string) {
  try {
    const res = await fetchGraphQL<PageCollectionResponseData>(
      pageQuery(slug),
      60,
      ['page']
    );

    if (!res.data) throw new Error('Could not locate page data');

    return res.data.pageCollection.items[0];
  } catch (error) {
    console.error('Error fetching home data:', error);
    return null;
  }
}

export async function generateMetadata(
  _params: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getHome('home');

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: page?.pageName || 'Home',
    description: page?.seoMetadata?.description || '',
    openGraph: {
      images: [page?.seoMetadata?.image || '', ...previousImages],
      title: page?.seoMetadata?.title || 'Home',
      description: page?.seoMetadata?.description || '',
    },
  };
}

export default async function Home() {
  const page = await getHome('home');

  if (!page) return null;

  return (
    <MainContainer>
      {/* TOP Section */}
      <>
        {page.topSectionCollection.items.length > 0 && (
          <ComponentRenderer
            itemsToRender={page?.topSectionCollection?.items}
          />
        )}
      </>
      <>
        {/* BOTTOM Section */}
        {page.extraSectionCollection.items.length > 0 && (
          <ComponentRenderer
            itemsToRender={page?.extraSectionCollection?.items}
          />
        )}
      </>
    </MainContainer>
  );
}
