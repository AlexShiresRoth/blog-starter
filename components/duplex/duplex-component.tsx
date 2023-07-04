import { Duplex } from "@/types/duplex-component.type";
import React from "react";
import ComponentWrapper from "../wrappers/component-wrapper";
import Image from "next/image";
import ThreeQuarterContainer from "../containers/three-quarter-container";
import RichTextRender from "../rendering/rich-text-render";
import cs from "classnames";
import { UnknownComponent } from "@/types/component";
import { fetchGraphQL } from "@/contentful/api";
import { duplexQuery } from "@/contentful/gql-queries/components/duplex";

async function getComponent(id: string): Promise<Duplex> {
  const res = await fetchGraphQL(duplexQuery(id));

  if (!res.data) throw new Error("Could not locate duplex data");

  return res.data.componentDuplex;
}

const DuplexComponent = async (component: UnknownComponent) => {
  const data = await getComponent(component.sys.id);

  // console.log("duplex ocmponent data", data);
  return (
    <ComponentWrapper classNames='py-8 md:py-14'>
      <ThreeQuarterContainer
        containerClassNames={cs("gap-12 justify-between ", {
          "flex-col md:flex-row ": !data.containerLayout,
          "flex-col": data.containerLayout,
        })}
      >
        {!!data.firstColumn && (
          <div
            className={cs("flex flex-col gap-4", {
              "w-full md:w-1/2": !data.containerLayout,
              "w-full": data.containerLayout,
            })}
          >
            <h2 className="self-start z-10 relative text-4xl font-bold text-blue-500 before:block before:bg-yellow-200 before:content-[' '] before:w-full before:h-2 before:absolute before:-z-10 before:bottom-1 ">
              {data.firstColumnHeadline}
            </h2>
            <RichTextRender content={data.firstColumn} />
          </div>
        )}
        {!!data.secondColumn && (
          <div
            className={cs("flex flex-col gap-4", {
              "w-full md:w-1/2": !data.containerLayout,
              "w-full ": data.containerLayout,
            })}
          >
            <h2 className="self-start z-10 relative text-4xl font-bold text-blue-500 before:block before:bg-yellow-200 before:content-[' '] before:w-full before:h-2 before:absolute before:-z-10 before:bottom-1 ">
              {data.secondColumnHeadline}
            </h2>
            <RichTextRender
              content={data.secondColumn}
              classNames='text-gray-500 leading-8'
            />
          </div>
        )}
      </ThreeQuarterContainer>
    </ComponentWrapper>
  );
};

export default DuplexComponent;
