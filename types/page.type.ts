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

export interface PossibleComponentType {
  __typename: string;
  sys: {
    id: string;
  };
}

export interface PageCollectionResponseData {
  data: {
    pageCollection: {
      items: PageCollectionItem[];
    };
  };
}

export type SEOMetadata = {
  name: string;
  title: string;
  description: string;
  image: {
    url: string;
  };
  noIndex: boolean;
  noFollow: boolean;
};

export type PageCollectionItem = {
  pageName: string;
  slug: string;
  seoMetadata: SEOMetadata;
  topSectionCollection: {
    items: PossibleComponentType[];
  };
  pageContent: {
    __typename: string;
    sys: {
      id: string;
    };
  };
  extraSectionCollection: {
    items: PossibleComponentType[];
  };
};

export type PageCollection = {
  items: PageCollectionItem[];
};

export type PageJSON = {
  pageCollection: PageCollection;
};
