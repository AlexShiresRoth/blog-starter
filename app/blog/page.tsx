

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const page = await getPage(slug);

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