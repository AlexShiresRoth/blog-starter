import { fetchGraphQL } from "@/contentful/api";
import { formQuery } from "@/contentful/gql-queries/components/form";
import { UnknownComponent } from "@/types/component";
import { Form, FormQueryResponse } from "@/types/form";
import React from "react";
import Input from "../sign-up/inputs/Input";
import { submitForm } from "@/app/actions/submit-form";
import SubmitButton from "../submit-button";

async function getForm(id: string): Promise<Form> {
  const res: FormQueryResponse = await fetchGraphQL(formQuery(id));

  if (res.errors) console.error("Errors in form query", res.errors);

  if (!res.data) throw new Error("No data returned from GraphQL");

  return res.data.form;
}

const ContactForm = async (component: UnknownComponent) => {
  const form = await getForm(component.sys.id);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex flex-col gap-12 bg-white rounded border-[1px] border-gray-200 p-8'>
        {/* @ts-ignore */}
        <form className='w-full flex flex-col gap-6' action={submitForm}>
          {form.headline && (
            <h1 className='text-5xl font-bold text-black'>{form.headline}</h1>
          )}
          {form.subline && <h4 className='text-blue-500 '>{form.subline}</h4>}
          {form.inputsCollection.items.map((input, index) => {
            return (
              <Input input={input} key={input.sys.id} autoFocus={index === 0} />
            );
          })}
          <div>
            <SubmitButton form={form} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
