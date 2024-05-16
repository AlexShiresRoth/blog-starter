import { EntryFields, EntrySys } from "contentful";

export interface TopicBusinessInfo {
  sys: EntrySys;
  name: EntryFields.Symbol;
  shortDescription: EntryFields.Symbol;
  featuredImage: {
    title: EntryFields.Symbol;
    description: EntryFields.Symbol;
    url: EntryFields.Symbol;
  };
  body: { json: EntryFields.RichText };
}
