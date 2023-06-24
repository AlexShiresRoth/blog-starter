export const formQuery = (id: string): string => `query {
  form(id: "${id}") {
    sys {
      id
    }
    headline
    subline
    submitButtonText
    inputsCollection {
      items {
        sys {
          id
        }
        label
        showLabel
        inputType
        inputName
        selectOptions
        placeholderText
        required
      }
    }
  }
}
`;
