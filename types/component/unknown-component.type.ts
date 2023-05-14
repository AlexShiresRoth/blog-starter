import { EntryFields, EntrySys } from "contentful";

export interface UnknownComponent {
  sys: EntrySys;
  __typename: EntryFields.Symbol;
}
