import { EntryFields, EntrySys } from "contentful";
import { Document } from "@contentful/rich-text-types";
export interface InfoBlock {
  sys: EntrySys;
  __typename: "ComponentInfoBlock";
  headline: EntryFields.Symbol;
  subline: EntryFields.Symbol;
  block1Image: {
    title: EntryFields.Symbol;
    description: EntryFields.Symbol;
    url: EntryFields.Symbol;
  };
  block1Body: {
    json: Document;
  };
  block2Image: {
    title: EntryFields.Symbol;
    description: EntryFields.Symbol;
    url: EntryFields.Symbol;
  };
  block2Body: {
    json: Document;
  };
  block3Image: {
    title: EntryFields.Symbol;
    description: EntryFields.Symbol;
    url: EntryFields.Symbol;
  };
  block3Body: {
    json: Document;
  };
}
