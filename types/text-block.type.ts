import { EntryField, EntryFields, EntrySys } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface TextBlock {
  sys: EntrySys;
  __typename: EntryFields.Symbol;
  headline: EntryFields.Symbol;
  subline: EntryFields.Symbol | null;
  body: {
    json: EntryFields.RichText;
  };
}
