import { InputItem } from "@/types/page.type";
import React from "react";

interface InputProps {
  input: InputItem;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = (props: InputProps) => {
  const { input } = props;

  return (
    <>
      {
        {
          text: <TextInput {...props} />,
          email: <EmailInput {...props} />,
          tel: <TelInput {...props} />,
        }[input.inputType]
      }
    </>
  );
};

export const TextInput = (props: InputProps) => {
  return (
    <div className="flex flex-col items-start justify-end">
      {props.input.showLabel && (
        <label className="text-sm text-blue-300 font-semibold ml-3 -mb-3 relative z-0 bg-blue-50 rounded px-1">
          {props.input.label}
        </label>
      )}
      <input
        type="text"
        name={props.input.inputName}
        value={props.value}
        placeholder={props.input.placeholderText ?? ""}
        onChange={props.onChange}
        required={true}
        className="p-2 pt-3 rounded border-2 border-slate-200 focus:border-blue-600/70 focus:outline-none transition-all placeholder:text-slate-300"
      />
    </div>
  );
};

export const EmailInput = (props: InputProps) => {
  return (
    <div className="flex flex-col items-start">
      {props.input.showLabel && (
        <label className="text-sm text-blue-300 font-semibold ml-3 -mb-3 relative z-0 bg-blue-50  rounded px-1">
          {props.input.label}
        </label>
      )}
      <input
        type="email"
        name={props.input.inputName}
        value={props.value}
        placeholder={props.input.placeholderText ?? ""}
        onChange={props.onChange}
        required={true}
        className="p-2 pt-3 rounded border-2 border-slate-200 focus:border-blue-600/70 focus:outline-none transition-all placeholder:text-slate-300"
      />
    </div>
  );
};

export const PasswordInput = (props: InputProps) => {
  return (
    <div className="flex flex-col items-start">
      {props.input.showLabel && (
        <label className="text-sm text-blue-300 font-semibold ml-3 -mb-3 relative z-0 bg-blue-50  rounded px-1">
          {props.input.label}
        </label>
      )}
      <input
        type="password"
        name={props.input.inputName}
        value={props.value}
        placeholder={props.input.placeholderText ?? ""}
        onChange={props.onChange}
        required={true}
        className="p-2 pt-3 rounded border-2 border-slate-200 focus:border-blue-600/70 focus:outline-none transition-all placeholder:text-slate-300"
      />
    </div>
  );
};

export const TelInput = (props: InputProps) => {
  return (
    <div className="flex flex-col items-start">
      {props.input.showLabel && (
        <label className="text-sm text-blue-300 font-semibold ml-3 -mb-3 relative z-0 bg-blue-50  rounded px-1">
          {props.input.label}
        </label>
      )}
      <input
        type="tel"
        name={props.input.inputName}
        value={props.value}
        placeholder={props.input.placeholderText ?? ""}
        onChange={props.onChange}
        required={true}
        className="p-2 pt-3 rounded border-2 border-slate-200 focus:border-blue-600/70 focus:outline-none transition-all placeholder:text-slate-300"
      />
    </div>
  );
};

export default Input;
