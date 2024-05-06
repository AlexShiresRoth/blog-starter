import ComponentRenderer from '@/components/rendering/component-renderer';
import { pageQuery } from '@/contentful/gql-queries/components/page/page.query';
import { fetchGraphQL } from '@/contentful/api';
import { PageCollectionItem } from '@/types/page.type';
import { getApp } from './layout';
import Header from '@/components/header/header';
import BlogFeatured from '@/components/blog/blog-featured';

async function getHome(slug: string): Promise<PageCollectionItem> {
  const res = await fetchGraphQL(pageQuery(slug));

  if (!res.data) throw new Error('Could not locate page data');

  return res.data.pageCollection.items[0];
}

export default async function Home() {
  const page = await getHome('home');
  const app = await getApp(process.env.DOMAIN as string);
  return (
    <main className="flex flex-col">
      <Header data={app.header} />

      <BlogFeatured />
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
