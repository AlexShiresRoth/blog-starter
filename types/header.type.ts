interface NavButton {
  sys: {
    id: string;
  };
  __typename: string;
  displayText: string;
  featuredPage: {
    sys: {
      id: string;
    };
    slug: string;
  };
}

export interface HeaderJSON {
  sys: {
    id: string;
  };
  logo: {
    __typename: string;
    url: string;
    title: string;
    description: string;
  };
  title: string;
  phone: string;
  actionItemsCollection: {
    items: NavButton[];
  };
}
