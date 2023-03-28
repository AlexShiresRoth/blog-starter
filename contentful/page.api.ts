import { fetchGraphQL } from "./api";
import { heroGQL } from "./query-parts/hero-fragment";
import { imageGQL } from "./query-parts/image-fragment";
import { pageGQL } from "./query-parts/page-fragment";
import { seoGQL } from "./query-parts/seo-fragment";

export async function getPageBySlug({
  slug,
}: {
  slug: string;
}): Promise<{ page: any; error: any }> {
  try {
    const query = await fetchGraphQL(`
    query {
        pageCollection(where: {slug: "${slug}"}, limit:1) {
                items {
            sys {
                id
            }
            slug
            seo {
                ...SEOConfig
            }
            pageContent {
                __typename
            }
            topSectionCollection {
                items {
                    ...Hero
                }
            }
            }
        }
    }
    ${heroGQL}
    ${pageGQL}
    ${seoGQL}
    ${imageGQL}
`);

    return { page: query?.data?.pageCollection?.items[0], error: null };
  } catch (error) {
    return { page: null, error };
  }
}
