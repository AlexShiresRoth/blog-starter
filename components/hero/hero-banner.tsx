import Image from "next/image";
import React from "react";
import CtaButton from "../buttons/cta-button";

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
    <div className="w-full  relative  bg-white  flex gap-4 justify-center  items-center   bg-blue-600">
      <Image
        src={component?.image?.url}
        alt={component?.image?.title}
        className="object-cover object-center w-full h-full opacity-20 "
        fill={true}
      />
      <div className="w-3/4 relative z-0 flex flex-col gap-4  items-center h-full py-12 my-8">
        <h1 className="text-6xl font-extrabold leading-relaxed text-center text-white w-3/4 flex flex-col items-center mb-2">
          {component.headline}
        </h1>
        {/* <p>{component.bodyText.}</p> */}
        <CtaButton text={component.ctaText ?? "Learn More"} slug={``} />
      </div>
    </div>
  );
};

export default HeroBanner;
