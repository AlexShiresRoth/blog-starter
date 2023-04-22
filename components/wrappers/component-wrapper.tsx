import React from "react";

type Props = {
  children: React.ReactNode;
};

const ComponentWrapper = ({ children }: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex">{children}</div>
    </div>
  );
};

export default ComponentWrapper;
