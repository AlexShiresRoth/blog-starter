import { EntryFields, EntrySys } from 'contentful';

export interface Footer {
  sys: EntrySys;
  internalName: EntryFields.Symbol;
  brandName: EntryFields.Symbol;
  facebookLink: EntryFields.Symbol;
  instagramLink: EntryFields.Symbol;
  twitterxLink: EntryFields.Symbol;
  threadsLink: EntryFields.Symbol;
  logo: {
    url: EntryFields.Symbol;
    description: EntryFields.Symbol;
  };
  footerColumnsCollection: {
    items: {
      sys: EntrySys;
      menuTitle: EntryFields.Symbol;
      menuItemsCollection: {
        items: {
          sys: EntrySys;
          groupName: EntryFields.Symbol;
          groupLink: {
            __typename: EntryFields.Symbol;
            slug: EntryFields.Symbol;
          };
          featuredPagesCollection: {
            items: {
              sys: EntrySys;
              slug: EntryFields.Symbol;
            };
          };
        }[];
      };
    }[];
  };
}
