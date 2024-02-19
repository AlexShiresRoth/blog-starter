import Link from "next/link";
import React from "react";
import cs from "classnames";

type Props = {
  text: string;
  slug?: string;
  url?: string;
  colorOverride?: "yellow" | "blue" | "white";
};

const CtaButton = ({ text, slug, colorOverride = "blue" }: Props) => {
  return (
    <Link
      href={slug ?? "/"}
      className={cs(
        " rounded-full px-6 py-3  font-semibold text-lg  transition-all",
        {
          "bg-yellow-400 hover:bg-yellow-300 text-black":
            colorOverride === "yellow",
          "bg-blue-500 hover:bg-blue-300 text-white": colorOverride === "blue",
          "bg-white text-blue-500 hover:bg-blue-300": colorOverride === "white",
        }
      )}
    >
      {text}
    </Link>
  );
};

export const ExternalCTAButton = ({
  text,
  url,
  colorOverride = "blue",
}: Props) => {
  return (
    <a
      href={url}
      className={cs(
        " rounded-full px-6 py-3  font-semibold text-lg  transition-all",
        {
          "bg-yellow-400 hover:bg-yellow-300 text-black":
            colorOverride === "yellow",
          "bg-blue-500 hover:bg-blue-300 text-white": colorOverride === "blue",
          "bg-white text-blue-500 hover:bg-blue-300": colorOverride === "white",
        }
      )}
    >
      {text}
      {` `}
      <i className='ri-external-link-line'></i>
    </a>
  );
};

export default CtaButton;
