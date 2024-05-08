import ComponentRenderer from '@/components/rendering/component-renderer';
import { pageQuery } from '@/contentful/gql-queries/components/page/page.query';
import { fetchGraphQL } from '@/contentful/api';
import { getApp } from './layout';
import Header from '@/components/header/header';
import BlogFeatured from '@/components/blog/blog-featured';
import MorePosts from '@/components/blog/more-posts';
import { z } from 'zod';
import { PossibleComponent } from '@/types/page.type';

export const HomeObject = z.object({
  data: z.object({
    pageCollection: z.object({
      items: z.array(
        z.object({
          sys: z.object({
            id: z.string(),
            __typename: z.string(),
          }),
          topSectionCollection: z.object({
            items: z.array(PossibleComponent),
          }),
          extraSectionCollection: z.object({
            items: z.array(PossibleComponent),
          }),
        })
      ),
    }),
  }),
});

export type HomePageData = z.infer<typeof HomeObject>;

async function getHome(slug: string) {
  const res = await fetchGraphQL<HomePageData>(pageQuery(slug));

  if (!res.data) throw new Error('Could not locate page data');

  return res.data.pageCollection.items[0];
}

export default async function Home() {
  const page = await getHome('home');
  const app = await getApp(process.env.DOMAIN as string);
  console.log('page', page.topSectionCollection);
  return (
    <main className="flex flex-col">
      <Header data={app.header} />
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
