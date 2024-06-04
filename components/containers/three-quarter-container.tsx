import React from "react";

type Props = {
  children: React.ReactNode;
  containerClassNames?: string;
};

const ThreeQuarterContainer = ({ children, containerClassNames }: Props) => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div
        className={
          ("w-11/12 mx-4 md:mx-0 md:w-3/4 flex " +
            containerClassNames) as string
        }
      >
        {children}
      </div>
    </div>
  );
};

export default ThreeQuarterContainer;
