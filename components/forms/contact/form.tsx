"use client";
import { Form } from "@/types/form";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Input from "../sign-up/inputs/Input";
import SubmitButton from "../submit-button";

type Props = {
  form: Form;
};

const ClientForm = ({ form }: Props) => {
  const [isPending, setIsPending] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isVerified, setIsVerified] = React.useState(false);
  const handleCaptchaChange = (value: string | null) => {
    console.log("Captcha value:", value);
    setIsVerified(true);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!isVerified) {
        console.error("Captcha not verified");
        setError("Captcha not verified");
        return;
      }
      setIsPending(true);
      setError("");
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("res:", data, res.status);
      if (data.error) throw new Error(data.error);

      setIsPending(false);
      setIsDone(true);
    } catch (error: any) {
      console.error("error:", error);
      setIsPending(false);
      setError(error.toString());
    }
  };
  return (
    <form className='w-full flex flex-col gap-6' onSubmit={handleSubmit}>
      {form.headline && (
        <h1 className='text-3xl md:text-5xl font-bold text-black'>
          {form.headline}
        </h1>
      )}
      {form.subline && <h4 className='text-blue-500'>{form.subline}</h4>}
      {form.inputsCollection.items.map((input, index) => {
        return (
          <Input input={input} key={input.sys.id} autoFocus={index === 0} />
        );
      })}
      <input
        name='middle_name'
        type='hidden'
        title='middle name'
        className='w-0 h-0 opacity-0'
        datatype='middle-name-input'
      />
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY as string}
        onChange={handleCaptchaChange}
      />
      <div>
        <SubmitButton
          form={form}
          pending={isPending}
          isDone={isDone}
          errorMsg={error}
          isVerified={isVerified}
        />
      </div>
    </form>
  );
};

export default ClientForm;
