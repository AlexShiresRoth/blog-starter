"use client";
import { Form } from "@/types/page.type";
import React, { useMemo, useState } from "react";
import Input from "./inputs/Input";

const SignupForm = ({ form }: { form: Form }) => {
  const [formState, setFormState] = useState<any>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  useMemo(() => {
    setFormState((prevState: any) => {
      const inputMap = form.inputsCollection.items.reduce((acc: any, input) => {
        acc[input.inputName] = "";
        return acc;
      }, {});

      return inputMap;
    });
  }, [form.inputsCollection.items]);

  return (
    <form className="my-2 gap-4 flex gap-4 items-end ">
      {form.inputsCollection.items.map((input) => {
        return (
          <Input
            input={input}
            key={input.sys.id}
            onChange={onChange}
            value={formState[input.inputName]}
          />
        );
      })}
      <button className="py-2 px-8 text-lg bg-blue-600 text-white font-semibold rounded hover:bg-blue-400 transition-all">
        {form.submitButtonText}
      </button>
    </form>
  );
};

export default SignupForm;