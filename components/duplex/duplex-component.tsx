import { Duplex } from "@/types/duplex-component.type";
import React from "react";
import ComponentWrapper from "../wrappers/component-wrapper";
import Image from "next/image";
import ThreeQuarterContainer from "../containers/three-quarter-container";
import RichTextRender from "../rendering/rich-text-render";

type Props = {
  data: Duplex;
};

const DuplexComponent = async ({ data }: Props) => {
  return (
    <ComponentWrapper classNames="py-10">
      <ThreeQuarterContainer containerClassNames="flex-col gap-8 justify-between ">
        {!!data?.image && (
          <div className="w-full relative h-[400px]">
            <Image
              src={data.image.url as string}
              alt={data.image.title as string}
              fill={true}
              className="h-full w-full object-cover object-center rounded"
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <h2 className="self-start z-10 relative text-4xl font-bold text-blue-500 before:block before:bg-yellow-200 before:content-[' '] before:w-full before:h-2 before:absolute before:-z-10 before:bottom-1 ">
            {data.headline}
          </h2>
          <RichTextRender
            content={data.bodyText}
            classNames="grid grid-cols-3 gap-8 mt-4"
          />
        </div>
      </ThreeQuarterContainer>
    </ComponentWrapper>
  );
};

export default DuplexComponent;
