import Image from "next/image";
import React from "react";

type Props = {
  component: {
    sys: { id: string };
    __typename: "ComponentHeroBanner";
    headline: string;
    bodyText: { json: any };
    ctaText: null;
    targetPage: null;
    image: {
      sys: { id: string };
      __typename: string;
      description: string;
      title: string;
      contentType: string;
      url: string;
    };
  };
};

const HeroBanner = ({ component }: Props) => {
  console.log("hero banner component", component);
  return (
    <div className='w-full relative h-[500px]'>
      <Image
        src={component?.image?.url}
        alt={component?.image?.title}
        className='w-full h-full rounded object-cover object-center'
        fill={true}
      />
    </div>
  );
};

export default HeroBanner;
