import { SignUpBox } from "@/types/page.type";
import React from "react";
import SignupForm from "./signup-form";

const SignupBox = ({ signupBox }: { signupBox: SignUpBox }) => {
  return (
    <div className="w-full">
      <div className="p-8 rounded bg-white 0 flex flex-col items-center justify-center gap-2">
        <h2 className="z-10 relative text-3xl font-bold text-blue-500 before:block before:bg-yellow-200 before:content-[' '] before:w-full before:h-2 before:absolute before:-z-10 before:bottom-1 ">
          {signupBox.headline}
        </h2>
        <p className="text-slate-500">{signupBox.subline}</p>

        <div>
          <SignupForm form={signupBox.form} />
        </div>
      </div>
    </div>
  );
};

export default SignupBox;
