import { fetchGraphQL } from "./api";

type Params = {
  navType: "main" | "secondary";
};

export async function getNavigationByType({
  navType,
}: Params): Promise<{ navigation: NavigationJSON }> {
  const query = await fetchGraphQL(`
  query {
    navigationMenuCollection(where: { navType:"${navType}" }) {
        items {
        sys {
            id
            __typename
        }
        __typename
        menuItemsCollection(limit: 20) {
            items {
            groupName
            sys {
                id
            }
            __typename
            groupLink {
                __typename
                ...Page
            }
            featuredPagesCollection(limit: 10) {
                items {
                __typename
                ...Page
                }
            }
            }
        }
        }
    }
    }

    fragment Page on Page {
        sys {
            id
        }
        slug
        pageName
        }
  `);

  return { navigation: query?.data?.navigationMenuCollection?.items[0] };
}
