import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { getPageBySlug } from "@/contentful/page.api";
import ComponentRenderer from "@/components/rendering/component-renderer";
import Nav from "@/components/navigation/nav";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const { page, error } = await getPageBySlug({ slug: "home" });

  console.log("page", page?.topSectionCollection?.items, error);
  return (
    <main>
      <Nav />
      <ComponentRenderer
        itemsToRender={page?.topSectionCollection?.items}
        pageData={null}
      />
    </main>
  );
}
