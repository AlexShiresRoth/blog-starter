import ComponentRenderer from "@/components/rendering/component-renderer";
import { pageQuery } from "@/contentful/gql-queries/components/page/page.query";
import { fetchGraphQL } from "@/contentful/api";
import { PageCollectionItem } from "@/types/page.type";

async function getHome(slug: string): Promise<PageCollectionItem> {
  const res = await fetchGraphQL(pageQuery(slug));

  if (!res.data) throw new Error("Could not locate page data");

  return res.data.pageCollection.items[0];
}

//@TODO fix nav component mobile contact links to just be icons
export default async function Home() {
  const page = await getHome("home");

  return (
    <main className='flex flex-col'>
      {/* TOP Section */}
      <div>
        {page.topSectionCollection.items.length > 0 && (
          <ComponentRenderer
            itemsToRender={page?.topSectionCollection?.items}
          />
        )}
      </div>
    </main>
  );
}
