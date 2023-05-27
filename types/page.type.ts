import { Duplex } from "./duplex-component.type";
import { Document } from "@contentful/rich-text-types";
import { TextBlock } from "./text-block.type";
import { InfoBlock } from "./info-block";
import { EntryFields, EntrySys } from "contentful";
import { UnknownComponent } from "./component";

export type InputItem = {
  sys: {
    id: string;
  };
  label: string;
  showLabel: boolean;
  selectOptions: null;
  inputType: string;
  inputName: string;
  placeholderText: string | null;
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

export type PageCollectionItem = {
  topSectionCollection: TopSectionCollection;
  pageContent: {
    __typename: EntryFields.Symbol;
    sys: EntrySys;
  };
};

export type PageCollection = {
  items: PageCollectionItem[];
};

export type PageJSON = {
  pageCollection: PageCollection;
};
