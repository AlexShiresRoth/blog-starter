import ComponentRenderer from '@/components/rendering/component-renderer';
import { pageQuery } from '@/contentful/gql-queries/components/page/page.query';
import { fetchGraphQL } from '@/contentful/api';
import BlogFeatured from '@/components/blog/blog-featured';
import MorePosts from '@/components/blog/more-posts';
import { PageCollectionResponseData } from '@/types/page.type';

async function getHome(slug: string) {
  try {
    const res = await fetchGraphQL<PageCollectionResponseData>(pageQuery(slug));

    if (!res.data) throw new Error('Could not locate page data');

    return res.data.pageCollection.items[0];
  } catch (error) {
    console.error('Error fetching home data:', error);
    return null;
  }
}

export default async function Home() {
  const page = await getHome('home');

  if (!page) return null;

  return (
    <main className="flex flex-col">
      {/* TOP Section */}
      <div>
        {page.topSectionCollection.items.length > 0 && (
          <ComponentRenderer
            itemsToRender={page?.topSectionCollection?.items}
          />
        )}
      </div>
      <BlogFeatured />
      <MorePosts />
      <div>
        {/* BOTTOM Section */}
        {page.extraSectionCollection.items.length > 0 && (
          <ComponentRenderer
            itemsToRender={page?.extraSectionCollection?.items}
          />
        )}
      </div>
    </main>
  );
}
