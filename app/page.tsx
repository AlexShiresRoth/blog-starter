import { getPageBySlug } from "@/contentful/page.api";
import ComponentRenderer from "@/components/rendering/component-renderer";
import Nav from "@/components/navigation/nav";
import { getNavigationByType } from "@/contentful/navigation.api";
import { getHeader } from "@/contentful/header.api";
import Header from "@/components/header/header";

export default async function Home() {
  const { page, error } = await getPageBySlug({ slug: "home" });
  const { header } = await getHeader();
  const { navigation } = await getNavigationByType({ navType: "main" });

  // console.log("page", page, page?.topSectionCollection?.items, error);
  // console.log("navigation", navigation);
  return (
    <main className="flex flex-col">
      <Header header={header}>
        <Nav navigation={navigation} />
      </Header>
      <ComponentRenderer
        itemsToRender={page?.topSectionCollection?.items}
        pageData={null}
      />
    </main>
  );
}
