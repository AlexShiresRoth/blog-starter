import { EntryFields } from 'contentful';

export interface CtaComponentType {
  headline: EntryFields.Symbol;
  subline: { json: EntryFields.RichText };
  urlParameters: EntryFields.Symbol;
  ctaText: EntryFields.Symbol;
  targetPage: { slug: EntryFields.Symbol };
}
