import { SignUpBox } from '@/types/page.type';
import React from 'react';
import SignupForm from './signup-form';
import { UnknownComponent } from '@/types/component';
import { fetchGraphQL } from '@/contentful/api';
import { signupBoxQuery } from '@/contentful/gql-queries/components/signup-box';

interface SignupBoxResponseData {
  data: {
    signUpBox: SignUpBox;
  };
}

async function getComponent(id: string) {
  try {
    const res = await fetchGraphQL<SignupBoxResponseData>(signupBoxQuery(id));

    if (!res.data) throw new Error('Could not locate signup box data');

    return res.data.signUpBox;
  } catch (error) {
    console.error('Error fetching signup box data:', error);
    return null;
  }
}

const SignupBox = async (component: UnknownComponent) => {
  const signupBox = await getComponent(component.sys.id);

  if (!signupBox) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12  py-8 mx-4 md:mx-0 md:p-14 rounded bg-white 0 flex flex-col items-center justify-center gap-2">
        <h2 className="z-10 relative text-3xl font-bold text-blue-500 before:block before:bg-yellow-200 before:content-[' '] before:w-full before:h-2 before:absolute before:-z-10 before:bottom-1 ">
          {signupBox.headline}
        </h2>
        <p className="text-slate-500">{signupBox.subline}</p>

        <div className="w-full md:w-auto">
          <SignupForm form={signupBox.form} />
        </div>
      </div>
    </div>
  );
};

export default SignupBox;
