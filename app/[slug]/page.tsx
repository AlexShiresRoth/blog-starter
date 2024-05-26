import ComponentRenderer from "@/components/rendering/component-renderer";
import { fetchGraphQL } from "@/contentful/api";
import { pageQuery } from "@/contentful/gql-queries/components/page/page.query";
import { PageCollectionResponseData } from "@/types/page.type";
import { Metadata, ResolvingMetadata } from "next";

async function getPage(slug: string) {
  try {
    const res = await fetchGraphQL<PageCollectionResponseData>(pageQuery(slug));

    if (!res.data) throw new Error("Could not locate page data");

    return res.data.pageCollection.items[0];
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
}

export async function generateMetadata(
  params: { slug: string },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage(params.slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: page?.pageName,
    description: page?.seoMetadata?.description || "",
    openGraph: {
      images: [page?.seoMetadata?.image || "", ...previousImages],
      title: page?.seoMetadata?.title,
      description: page?.seoMetadata?.description || "",
    },
  };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const page = await getPage(slug);

  if (!page) return null;

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
