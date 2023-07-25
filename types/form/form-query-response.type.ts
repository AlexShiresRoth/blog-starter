import { Form } from "./form.type";

export interface FormQueryResponse {
  errors: any[];
  data: {
    form: Form;
  };
}
