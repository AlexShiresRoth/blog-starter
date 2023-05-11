import { EntryFields, EntrySys } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface InfoBlock {
  sys: EntrySys;
  __typename: "ComponentInfoBlock";
  headline: EntryFields.Symbol;
  subline: EntryFields.Symbol;
  blocksCollection: {
    items: {
      sys: EntrySys;
      image: {
        url: EntryFields.Symbol;
        title: EntryFields.Symbol;
        description: EntryFields.Symbol;
      };
      text: {
        json: EntryFields.RichText;
      };
    }[];
  };
}
