import { getPageBySlug } from "@/contentful/page.api";
import ComponentRenderer from "@/components/rendering/component-renderer";

export default async function Home() {
  const { page } = await getPageBySlug({ slug: "home" });

  return (
    <main className='flex flex-col'>
      {page.topSectionCollection.items.length > 0 && (
        <ComponentRenderer itemsToRender={page?.topSectionCollection?.items} />
      )}
    </main>
  );
}
