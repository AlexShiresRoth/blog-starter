import { EntryFields, EntrySys } from "contentful";

export interface Form {
  internalName: EntryFields.Symbol;
  sys: EntrySys;
  submitButtonText: EntryFields.Symbol;
  headline: EntryFields.Symbol;
  subline: EntryFields.Symbol;
  inputsCollection: {
    items: {
      sys: EntrySys;
      label: EntryFields.Symbol;
      showLabel: EntryFields.Boolean;
      inputType: EntryFields.Symbol;
      inputName: EntryFields.Symbol;
      selectOptions: EntryFields.Symbol[];
      placeholderText: EntryFields.Symbol;
      required: EntryFields.Boolean;
    }[];
  };
}
