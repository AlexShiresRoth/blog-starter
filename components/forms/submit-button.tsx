"use client";
import { Form } from "@/types/page.type";
import classNames from "classnames";
import { useMemo, useState } from "react";
// @ts-ignore
import { useFormStatus } from "react-dom";

type Props = {
  form: Form;
};

const SubmitButton = ({ form }: Props) => {
  const { pending } = useFormStatus();

  const [isDone, setIsDone] = useState<boolean>(false);

  useMemo(() => {
    if (pending) {
      setIsDone(true);
    }
  }, [pending]);

  // this may be a good use case for microcopy
  if (isDone) {
    return (
      <p className='border-[2px] p-2 rounded border-emerald-400 bg-emerald-200 text-emerald-600'>
        Thank you, your contact request has been sent!
      </p>
    );
  }

  return (
    <button
      disabled={pending}
      data-component-type='submit-button'
      className={classNames(
        "flex items-center justify-center gap-2 min-w-[200px] py-2 text-lg  text-white rounded hover:bg-blue-600 transition-all",
        {
          "bg-blue-200 cursor-wait": pending,
          "bg-blue-500": !pending,
        }
      )}
    >
      {pending && (
        <span className='h-4 w-4 rounded-full border-2 border-transparent border-t-white border-l-white animate-spin'></span>
      )}
      {pending ? "Sending..." : form.submitButtonText}
    </button>
  );
};

export default SubmitButton;
