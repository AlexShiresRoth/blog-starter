import { InputItem } from "@/types/page.type";
import React from "react";

interface InputProps {
  input: InputItem;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: string;
  autoFocus?: boolean;
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
          select: <SelectInput {...props} />,
          textarea: <TextAreaInput {...props} />,
        }[input.inputType]
      }
    </>
  );
};

export const TextInput = (props: InputProps) => {
  return (
    <div className='flex flex-col items-start justify-end    w-full'>
      {props.input.showLabel && (
        <label className='text-sm text-blue-300 font-semibold ml-3 -mb-3 relative z-0 bg-blue-50 rounded px-1'>
          {props.input.label}
        </label>
      )}
      <input
        type='text'
        name={props.input.inputName}
        value={props.value}
        placeholder={props.input.placeholderText ?? ""}
        onChange={props.onChange}
        required={true}
        className='w-full p-2 pt-3 rounded border-2 border-slate-200 focus:border-blue-600/70 focus:outline-none transition-all placeholder:text-slate-300'
      />
    </div>
  );
};

export const EmailInput = (props: InputProps) => {
  return (
    <div className='flex flex-col items-start   w-full'>
      {props.input.showLabel && (
        <label className='text-sm text-blue-300 font-semibold ml-3 -mb-3 relative z-0 bg-blue-50  rounded px-1'>
          {props.input.label}
        </label>
      )}
      <input
        type='email'
        name={props.input.inputName}
        value={props.value}
        placeholder={props.input.placeholderText ?? ""}
        onChange={props.onChange}
        required={true}
        className='w-full p-2 pt-3 rounded border-2 border-slate-200 focus:border-blue-600/70 focus:outline-none transition-all placeholder:text-slate-300'
      />
    </div>
  );
};

export const PasswordInput = (props: InputProps) => {
  return (
    <div className='flex flex-col items-start  w-full'>
      {props.input.showLabel && (
        <label className='text-sm text-blue-300 font-semibold ml-3 -mb-3 relative z-0 bg-blue-50  rounded px-1'>
          {props.input.label}
        </label>
      )}
      <input
        type='password'
        name={props.input.inputName}
        value={props.value}
        placeholder={props.input.placeholderText ?? ""}
        onChange={props.onChange}
        required={true}
        className='w-full p-2 pt-3 rounded border-2 border-slate-200 focus:border-blue-600/70 focus:outline-none transition-all placeholder:text-slate-300'
      />
    </div>
  );
};

export const TelInput = (props: InputProps) => {
  return (
    <div className='flex flex-col items-start w-full'>
      {props.input.showLabel && (
        <label className='text-sm text-blue-300 font-semibold ml-3 -mb-3 relative z-0 bg-blue-50  rounded px-1'>
          {props.input.label}
        </label>
      )}
      <input
        type='tel'
        name={props.input.inputName}
        value={props.value}
        placeholder={props.input.placeholderText ?? ""}
        onChange={props.onChange}
        required={true}
        className='w-full p-2 pt-3 rounded border-2 border-slate-200 focus:border-blue-600/70 focus:outline-none transition-all placeholder:text-slate-300'
      />
    </div>
  );
};

export const SelectInput = (props: InputProps) => {
  console.log("props?", props);
  return (
    <div className='flex flex-col items-start w-full'>
      {props.input.showLabel && (
        <label className='text-sm text-blue-300 font-semibold ml-3 -mb-3 relative z-0 bg-blue-50  rounded px-1'>
          {props.input.label}
        </label>
      )}
      <select
        autoFocus={true}
        title={props.input.label ?? ""}
        name={props.input.inputName}
        placeholder={props.input.placeholderText ?? ""}
        value={props.value}
        required={props.input.required ?? false}
        className=' bg-white w-full p-2 pt-3 rounded border-2 border-slate-200 focus:outline-2 outline-blue-500 focus:border-blue-600/70  transition-all placeholder:text-slate-300'
      >
        <option>{props.input.placeholderText ?? ""}</option>
        {props.input.selectOptions.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const TextAreaInput = (props: InputProps) => {
  return (
    <div className='flex flex-col items-start justify-end w-full'>
      {props.input.showLabel && (
        <label className='text-sm text-blue-300 font-semibold ml-3 -mb-3 relative z-0 bg-blue-50 rounded px-1'>
          {props.input.label}
        </label>
      )}
      <textarea
        name={props.input.inputName}
        value={props.value}
        placeholder={props.input.placeholderText ?? ""}
        onChange={props.onChange}
        required={props.input.required ?? false}
        rows={3}
        className='w-full  p-2 pt-3 rounded border-2 border-slate-200 focus:border-blue-600/70 focus:outline-none transition-all placeholder:text-slate-300'
      />
    </div>
  );
};
export default Input;
