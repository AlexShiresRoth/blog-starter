import { Asset, EntitySys, EntryFields } from "contentful";

export interface Product {
  sys: EntitySys;
  name: EntryFields.Symbol;
  description: {
    json: EntryFields.RichText;
  };
  excerpt: EntryFields.Symbol;
  isExpandable: EntryFields.Boolean;
  featuredImage: {
    url: EntryFields.Symbol;
    description: EntryFields.Symbol;
    width: EntryFields.Number;
    height: EntryFields.Number;
  };
  targetPage: {
    slug: EntryFields.Symbol;
  };
  externalLink: EntryFields.Symbol;
  externalLinkText: EntryFields.Symbol;
  price: EntryFields.Number;
}
