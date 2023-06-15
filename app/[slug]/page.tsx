import ComponentRenderer from "@/components/rendering/component-renderer";
import { fetchGraphQL } from "@/contentful/api";
import { pageQuery } from "@/contentful/gql-queries/components/page/page.query";
import { PageCollectionItem } from "@/types/page.type";

async function getPage(slug: string): Promise<PageCollectionItem> {
  const res = await fetchGraphQL(pageQuery(slug));

  if (!res.data) throw new Error("Could not locate page data");

  return res.data.pageCollection.items[0];
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const page = await getPage(slug);

  return (
    <main className='flex flex-col'>
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
        <div className='bg-gray-100'>
          {/* Page Content */}
          <ComponentRenderer itemsToRender={[page?.pageContent]} />
        </div>
      )}

      {!!page.extraSectionCollection.items.length && (
        <div className='bg-gray-100'>
          {/* Extra Section */}
          <ComponentRenderer
            itemsToRender={page.extraSectionCollection?.items}
          />
        </div>
      )}
    </main>
  );
}
