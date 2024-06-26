import { EntrySys, EntryFields } from "contentful";
import { PageCollectionItem } from "./page.type";
import type { Document } from "@contentful/rich-text-types";

export interface ImageFields {
  title: EntryFields.Symbol;
  description: EntryFields.Symbol;
  url: EntryFields.Symbol;
}

export interface Duplex {
  __typename: "ComponentDuplex";
  sys: EntrySys;
  containerLayout: EntryFields.Boolean;
  headline: EntryFields.Text;
  bodyText: {
    json: EntryFields.RichText;
  };
  firstColumnHeadline: EntryFields.Symbol;
  firstColumn: {
    json: EntryFields.RichText;
  };
  secondColumnHeadline: EntryFields.Symbol;
  secondColumn: {
    json: EntryFields.RichText;
  };
  ctaText: EntryFields.Text;
  image: ImageFields;
  targetPage: PageCollectionItem;
}
