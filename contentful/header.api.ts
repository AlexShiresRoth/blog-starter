import { HeaderJSON } from "@/types/header.type";
import { fetchGraphQL } from "./api";

export async function getHeader(): Promise<{ header: HeaderJSON }> {
  const query = await fetchGraphQL(`
        query {
        headerCollection(limit:1) {
            items {
            sys {
                id
            }
            logo {
                __typename
                url
                title
                description
            }
            title
            phone
            actionItemsCollection {
                items {
                sys {
                    id
                }
                __typename
                displayText
                featuredPage {
                    sys {
                    id
                    }
                    slug
                }
                }
            }
            }
        }
        }
  `);

  return { header: query?.data?.headerCollection?.items[0] };
}
