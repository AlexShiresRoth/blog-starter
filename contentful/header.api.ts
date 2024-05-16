import { HeaderJSON } from "@/types/header.type";
import { fetchGraphQL } from "./api";

export async function getHeader(id: string): Promise<{ header: HeaderJSON }> {
  const query = await fetchGraphQL(`
        query {
        header(id: "${id}") {
            
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
        
  `);

  return { header: query?.data?.headerCollection?.items[0] };
}
