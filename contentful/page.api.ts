import { PageCollection } from "@/types/page.type";
import { fetchGraphQL } from "./api";
import { heroGQL } from "./query-parts/hero-fragment";
import { imageGQL } from "./query-parts/image-fragment";
import { pageGQL } from "./query-parts/page-fragment";
import { seoGQL } from "./query-parts/seo-fragment";
import { signupBoxGQL } from "./query-parts/signup-box-fragment";
import { DuplexFragment } from "./query-parts/duplex-fragment";

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
                pageName
                slug
                seo {
                  sys {
                    id
                  }
                  name
                  title
                  description
                  noIndex
                  noFollow
                }
                topSectionCollection(limit: 10) {
                  items {
                    __typename
                    ...Duplex
                    ...Hero
                    ...SignupBox
                    ... on ComponentCta {
                      sys {
                        id
                      }
                    }
                  }
                }
                
                pageContent {
                  __typename
                }
                extraSectionCollection {
                  items {
                    __typename
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
    ${DuplexFragment}
`);

  return { page: query?.data?.pageCollection?.items[0] };
}
