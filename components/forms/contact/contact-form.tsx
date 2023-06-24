import { fetchGraphQL } from "@/contentful/api";
import { formQuery } from "@/contentful/gql-queries/components/form";
import { UnknownComponent } from "@/types/component";
import { Form, FormQueryResponse } from "@/types/form";
import React from "react";
import Input from "../sign-up/inputs/Input";
import { submitForm } from "@/app/actions/submit-form";

async function getForm(id: string): Promise<Form> {
  const res: FormQueryResponse = await fetchGraphQL(formQuery(id));

  if (res.errors) console.error("Errors in form query", res.errors);

  if (!res.data) throw new Error("No data returned from GraphQL");

  return res.data.form;
}

// @NOTE not sure if server actions will make sense for this, if we can't show loading state
const ContactForm = async (component: UnknownComponent) => {
  const form = await getForm(component.sys.id);

  console.log("is this a client component?");

  return (
    <div className='w-full flex flex-col items-center my-4'>
      <div className='w-1/2 flex flex-col gap-12 bg-white rounded border-[1px] border-gray-200 p-8'>
        {/* @ts-ignore */}
        <form className='w-full flex flex-col gap-6' action={submitForm}>
          {form.headline && (
            <h1 className='text-5xl font-bold text-black'>{form.headline}</h1>
          )}
          {form.subline && <h4 className='text-blue-500 '>{form.subline}</h4>}
          {form.inputsCollection.items.map((input) => {
            return <Input input={input} key={input.sys.id} />;
          })}
          <div>
            <button className='min-w-[200px] py-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all'>
              {form.submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
