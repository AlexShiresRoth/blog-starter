"use client";
import { Form } from "@/types/page.type";
import classNames from "classnames";
// @ts-ignore

type Props = {
  form: Form;
  pending: boolean;
  isDone: boolean;
  isVerified: boolean;
  errorMsg?: string;
};

const SubmitButton = ({
  form,
  pending,
  isDone,
  errorMsg,
  isVerified,
}: Props) => {
  // this may be a good use case for microcopy
  if (isDone) {
    return (
      <p className='border-[2px] p-2 rounded border-emerald-400 bg-emerald-200 text-emerald-600'>
        Thank you, your contact request has been sent!
      </p>
    );
  }

  return (
    <>
      {errorMsg && (
        <p className='border-[2px] p-2 rounded border-red-400 bg-red-200 text-red-600'>
          {errorMsg}
        </p>
      )}
      <button
        disabled={pending || !isVerified}
        data-component-type='submit-button'
        className={classNames(
          "flex items-center justify-center gap-2 min-w-[200px] py-2 text-lg  text-white rounded hover:bg-blue-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed",
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
    </>
  );
};

export default SubmitButton;
