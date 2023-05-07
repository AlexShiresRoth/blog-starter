import Link from "next/link";
import React from "react";

type Props = {
  text: string;
  slug: string;
};

const CtaButton = ({ text, slug }: Props) => {
  return (
    <Link
      href={slug}
      className="bg-blue-500 rounded-full px-6 py-3 text-white font-semibold text-lg hover:bg-blue-300 transition-all"
    >
      {text}
    </Link>
  );
};

export default CtaButton;
