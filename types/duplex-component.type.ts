import { EntrySys, EntryFields, Asset } from "contentful";
import { PageCollectionItem } from "./page.type";

export interface Duplex {
  __typename: "ComponentDuplex";
  sys: EntrySys;
  containerLayout: EntryFields.Boolean;
  headline: EntryFields.Text;
  bodyText: EntryFields.RichText;
  ctaText: EntryFields.Text;
  image: Asset;
  targetPage: PageCollectionItem;
}
