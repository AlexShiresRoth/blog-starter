import { EntryFields } from "contentful";

export interface CtaComponent {
  headline: EntryFields.Symbol;
  subline: { json: EntryFields.RichText };
  urlParameters: EntryFields.Symbol;
  ctaText: EntryFields.Symbol;
  targetPage: { slug: EntryFields.Symbol };
}
