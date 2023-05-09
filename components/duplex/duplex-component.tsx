import { Duplex } from "@/types/duplex-component.type";
import React from "react";
import ComponentWrapper from "../wrappers/component-wrapper";
import Image from "next/image";
import ThreeQuarterContainer from "../containers/three-quarter-container";
import RichTextRender from "../rendering/rich-text-render";
import cs from "classnames";
type Props = {
  data: Duplex;
};

const DuplexComponent = async ({ data }: Props) => {
  console.log("DuplexComponent", data);
  return (
    <ComponentWrapper classNames="py-10">
      <ThreeQuarterContainer
        containerClassNames={cs("gap-8 justify-between ", {
          "flex-row items-center": !data.containerLayout,
          "flex-col": data.containerLayout,
        })}
      >
        {!!data?.image && (
          <div
            className={cs("relative min-h-[400px]", {
              "w-1/2": !data.containerLayout,
              "w-full": data.containerLayout,
            })}
          >
            <Image
              src={data.image.url as string}
              alt={data.image.title as string}
              fill={true}
              className="h-full w-full object-cover object-center rounded"
            />
          </div>
        )}
        <div
          className={cs("flex flex-col gap-8", {
            "w-1/2": !data.containerLayout,
            "w-full": data.containerLayout,
          })}
        >
          <h2 className="self-start z-10 relative text-4xl font-bold text-blue-500 before:block before:bg-yellow-200 before:content-[' '] before:w-full before:h-2 before:absolute before:-z-10 before:bottom-1 ">
            {data.headline}
          </h2>
          <RichTextRender content={data.bodyText} />
        </div>
      </ThreeQuarterContainer>
    </ComponentWrapper>
  );
};

export default DuplexComponent;
