import Link from 'next/link';
import React from 'react';

type Props = {
  text: string;
  slug?: string;
  url?: string;
  altButton?: boolean;
};

const LinkClassNames =
  'px-4 py-2 rounded border border-black hover:bg-black hover:text-white transition-colors';
const altLinkClassNames =
  'px-4 py-2 rounded border border-black bg-black text-white hover:bg-white hover:text-black transition-colors';

const CtaButton = ({ text, slug, altButton = false }: Props) => {
  return (
    <Link
      href={slug ?? '/'}
      className={altButton ? altLinkClassNames : LinkClassNames}
    >
      {text}
    </Link>
  );
};

export const ExternalCTAButton = ({ text, url, altButton = false }: Props) => {
  return (
    <a href={url} className={altButton ? altLinkClassNames : LinkClassNames}>
      {text}
      {` `}
      <i className="ri-external-link-line"></i>
    </a>
  );
};

export default CtaButton;
