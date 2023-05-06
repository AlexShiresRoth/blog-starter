import { getPageBySlug } from "@/contentful/page.api";
import ComponentRenderer from "@/components/rendering/component-renderer";
import Nav from "@/components/navigation/nav";
import { getNavigationByType } from "@/contentful/navigation.api";
import { getHeader } from "@/contentful/header.api";
import Header from "@/components/header/header";

// @TOdo pull in next component from contentful
export default async function Home() {
  const { page } = await getPageBySlug({ slug: "home" });
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
