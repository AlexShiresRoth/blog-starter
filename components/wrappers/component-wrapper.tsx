import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  fullWidth?: boolean;
};

const ComponentWrapper = ({ children, fullWidth = true }: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className={classNames(`flex`, {
          "w-full": fullWidth,
          "w-3/4": !fullWidth,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default ComponentWrapper;
