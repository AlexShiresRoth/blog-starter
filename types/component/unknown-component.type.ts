import { EntryFields, EntrySys } from "contentful";

export interface UnknownComponent {
  sys: {
    id: EntrySys["id"];
  };
  __typename: EntryFields.Symbol;
}
