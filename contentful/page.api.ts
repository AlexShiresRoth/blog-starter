import {
  PageCollection,
  PageCollectionItem,
  PageJSON,
} from "@/types/page.type";
import { fetchGraphQL } from "./api";
import { heroGQL } from "./query-parts/hero-fragment";
import { imageGQL } from "./query-parts/image-fragment";
import { pageGQL } from "./query-parts/page-fragment";
import { seoGQL } from "./query-parts/seo-fragment";
import { signupBoxGQL } from "./query-parts/signup-box-fragment";

export async function getPageBySlug({
  slug,
}: {
  slug: string;
}): Promise<{ page: PageCollection["items"][number] }> {
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
                    ...SignupBox
                }
            }
            }
        }
    }
    ${heroGQL}
    ${pageGQL}
    ${seoGQL}
    ${imageGQL}
    ${signupBoxGQL}
`);

  return { page: query?.data?.pageCollection?.items[0] };
}
