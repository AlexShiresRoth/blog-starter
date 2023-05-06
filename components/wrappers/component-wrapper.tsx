import cs from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  fullWidth?: boolean;
  classNames?: string;
};

const ComponentWrapper = ({
  children,
  fullWidth = true,
  classNames,
}: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className={cs(`flex ${classNames}`, {
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
