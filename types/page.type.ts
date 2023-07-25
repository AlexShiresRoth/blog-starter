import { EntryFields, EntrySys } from "contentful";
import { UnknownComponent } from "./component";

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

export type ComponentHeroBanner = {
  __typename: "ComponentHeroBanner";
  sys: {
    id: string;
  };
  headline: string;
  ctaText: string;
  image: {
    url: string;
    title: string;
    description: string;
  };
  targetPage: {
    sys: {
      id: string;
    };
    __typename: "Page";
    slug: string;
  };
  bodyText: {
    json: EntryFields.RichText;
  };
};

export type SignUpBox = {
  __typename: "SignUpBox";
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
