import { EntryFields, EntrySys } from "contentful";

export interface AppQueryResponse {
  sys: EntrySys;
  header: { sys: EntrySys; __typename: EntryFields.Symbol };
  homePage: { sys: EntrySys; __typename: EntryFields.Symbol };
  footer: { sys: EntrySys; __typename: EntryFields.Symbol };
}
