import { getPageBySlug } from "@/contentful/page.api";
import ComponentRenderer from "@/components/rendering/component-renderer";
import Nav from "@/components/navigation/nav";
import { getNavigationByType } from "@/contentful/navigation.api";
import { getHeader } from "@/contentful/header.api";
import Header from "@/components/header/header";
import { PageCollection, PageJSON } from "@/types/page.type";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { page } = await getPageBySlug({ slug });
  const { header } = await getHeader();
  const { navigation } = await getNavigationByType({ navType: "main" });

  return (
    <main className="flex flex-col">
      <Header header={header}>
        <Nav navigation={navigation} />
      </Header>

      {page.topSectionCollection.items.length > 0 && (
        <ComponentRenderer itemsToRender={page?.topSectionCollection?.items} />
      )}
    </main>
  );
}
