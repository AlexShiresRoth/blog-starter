import { EntryFields, EntrySys } from 'contentful';

export interface InfoBlockdata {
  sys: EntrySys;
  __typename: 'ComponentInfoBlock';
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
