import { Asset, EntitySys, EntryFields } from "contentful";

export interface Product {
  sys: EntitySys;
  name: EntryFields.Symbol;
  description: {
    json: EntryFields.RichText;
  };
  featuredImage: Asset;
  targetPage: {
    slug: EntryFields.Symbol;
  };
  externalLink: EntryFields.Symbol;
  externalLinkText: EntryFields.Symbol;
  price: EntryFields.Number;
}
