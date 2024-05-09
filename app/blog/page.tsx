import ComponentRenderer from '@/components/rendering/component-renderer';
import { fetchGraphQL } from '@/contentful/api';
import { pageQuery } from '@/contentful/gql-queries/components/page/page.query';
import { PageCollectionResponseData } from '@/types/page.type';

async function getPage(slug: string) {
  try {
    const res = await fetchGraphQL<PageCollectionResponseData>(pageQuery(slug));

    if (!res.data) throw new Error('Could not locate page data');

    return res.data.pageCollection.items[0];
  } catch (error) {
    console.error('Error fetching page data:', error);
    return null;
  }
}

export default async function Page() {
  const page = await getPage('blog');

  if (!page) return null;

  return (
    <main className="flex flex-col">
      {!!page.topSectionCollection.items.length && (
        <>
          <div>
            {/* TOP SECTION */}
            <ComponentRenderer
              itemsToRender={page?.topSectionCollection?.items}
            />
          </div>
        </>
      )}

      {!!page.pageContent && (
        <div className="bg-gray-100">
          {/* Page Content */}
          <ComponentRenderer itemsToRender={[page?.pageContent]} />
        </div>
      )}

      {!!page.extraSectionCollection.items.length && (
        <div className="bg-gray-100">
          {/* Extra Section */}
          <ComponentRenderer
            itemsToRender={page.extraSectionCollection?.items}
          />
        </div>
      )}
    </main>
  );
}
