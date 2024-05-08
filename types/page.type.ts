import { EntryFields, EntrySys } from 'contentful';
import { UnknownComponent } from './component';
import { z } from 'zod';

export type InputItem = {
  sys: {
    id: string;
  };
  label: string;
  showLabel: boolean;
  selectOptions: string[];
  inputType: string;
  inputName: string;
  placeholderText: string | null;
  required?: boolean;
};

export type InputItemsCollection = {
  items: InputItem[];
};

export type Form = {
  sys: {
    id: string;
  };
  internalName: string;
  inputsCollection: InputItemsCollection;
  submitButtonText: string;
};

export const ComponentHeroBanner = z.object({
  __typename: z.literal('ComponentHeroBanner'),
  sys: z.object({ id: z.string() }),
  headline: z.string(),
  ctaText: z.string(),
  externalLink: z.string(),
  image: z.object({
    url: z.string(),
    title: z.string(),
    description: z.string(),
  }),
  targetPage: z.object({
    sys: z.object({ id: z.string() }),
    __typename: z.literal('Page'),
    slug: z.string(),
  }),
  bodyText: z.object({
    json: z.object({}),
  }),
});

export type ComponentHeroBannerType = z.infer<typeof ComponentHeroBanner>;

export type SignUpBox = {
  __typename: 'SignUpBox';
  sys: {
    id: string;
  };
  internalName: string;
  headline: string;
  subline: string;
  form: Form;
};

export type TopSectionCollection = {
  items: UnknownComponent[];
};

export type ExtraSectionCollection = {
  items: UnknownComponent[];
};

export const PossibleComponent = z.object({
  sys: z.object({ id: z.string() }),
  __typename: z.string(),
});

export const PageCollectionResponse = z.object({
  data: z.object({
    pageCollection: z.object({
      items: z.array(
        z.object({
          topSectionCollection: z.object({
            items: z.array(PossibleComponent),
          }),
          pageContent: z.object({
            __typename: z.string(),
            sys: z.object({ id: z.string() }),
          }),
          extraSectionCollection: z.object({
            items: z.array(PossibleComponent),
          }),
        })
      ),
    }),
  }),
});

export type PageCollectionResponseType = z.infer<typeof PageCollectionResponse>;

export type PossibleComponentType = z.infer<typeof PossibleComponent>;

export type PageCollectionItem = {
  topSectionCollection: TopSectionCollection;
  pageContent: {
    __typename: EntryFields.Symbol;
    sys: EntrySys;
  };
  extraSectionCollection: ExtraSectionCollection;
};

export type PageCollection = {
  items: PageCollectionItem[];
};

export type PageJSON = {
  pageCollection: PageCollection;
};
