import { fetchGraphQL } from "@/contentful/api";
import { formQuery } from "@/contentful/gql-queries/components/form";
import { UnknownComponent } from "@/types/component";
import { Form, FormQueryResponse } from "@/types/form";
import ClientForm from "./form";

async function getForm(id: string): Promise<Form> {
  const res: FormQueryResponse = await fetchGraphQL(formQuery(id));

  if (res.errors) console.error("Errors in form query", res.errors);

  if (!res.data) throw new Error("No data returned from GraphQL");

  return res.data.form;
}

const ContactForm = async (component: UnknownComponent) => {
  const form = await getForm(component.sys.id);

  return (
    <div
      className='w-full flex flex-col items-center'
      data-component-type='contact-form'
    >
      <div className='w-full flex flex-col gap-12 bg-white rounded border-[1px] border-gray-200 p-8'>
        <ClientForm form={form} />
      </div>
    </div>
  );
};

export default ContactForm;
