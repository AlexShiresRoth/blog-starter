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
  console.log("duplex data", data.bodyText.json);
  return (
    <ComponentWrapper classNames="">
      <ThreeQuarterContainer containerClassNames="gap-8 justify-between ">
        {!!data?.image && (
          <div className="w-1/2 relative">
            <Image
              src={data.image.url as string}
              alt={data.image.title as string}
              fill={true}
              sizes="400px"
              className="w-[400px] min-h-[400px] object-cover object-center rounded"
            />
          </div>
        )}
        <div className="flex flex-col w-1/2 gap-4">
          <h2 className="font-bold text-4xl">{data.headline}</h2>
          <RichTextRender content={data.bodyText} />
        </div>
      </ThreeQuarterContainer>
    </ComponentWrapper>
  );
};

export default DuplexComponent;
