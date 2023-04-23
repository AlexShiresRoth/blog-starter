export const signupBoxGQL = `fragment SignupBox on SignUpBox {
  sys {
    id
  }
  __typename
  internalName
  headline
  subline
  form {
    sys {
      id
    }
    submitButtonText
    internalName
    inputsCollection(limit:5) {
      items {
        sys {
            id
        }
        label
        showLabel
        inputName
        selectOptions
        inputType
        placeholderText
      }
    }
  }
}`;
