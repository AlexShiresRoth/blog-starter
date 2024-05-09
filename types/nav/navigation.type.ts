export interface NavigationData {
  actionItemsCollection: {
    items: {
      sys: {
        id: string;
      };
      displayText: string;
      featuredPage: {
        pageName: string;
        slug: string;
      };
    }[];
  };
  navItemsCollection: {
    items: {
      sys: {
        id: string;
      };
      menuTitle: string;
      menuItemsCollection: {
        items: {
          sys: {
            id: string;
          };
          groupName: string;
          groupLink: {
            __typename: string;
            pageName: string;
            slug: string;
          };
          featuredPagesCollection: {
            items: {
              slug: string;
              pageName: string;
            }[];
          };
        }[];
      };
    }[];
  };
}
