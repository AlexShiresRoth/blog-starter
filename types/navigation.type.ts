interface NavigationJSON {
  sys: {
    id: string;
    __typename: string;
  };
  __typename: string;
  menuItemsCollection: {
    items: {
      groupName: string;
      sys: {
        id: string;
      };
      __typename: string;
      groupLink: {
        __typename: string;
        sys: {
          id: string;
        };
        slug: string;
      };
      featuredPagesCollection: {
        items: {
          __typename: string;
          sys: {
            id: string;
          };
          slug: string;
          pageName: string;
        }[];
      };
    }[];
  };
}
