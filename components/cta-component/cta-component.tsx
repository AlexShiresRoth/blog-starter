import { fetchGraphQL } from "@/contentful/api";
import { ctaQuery } from "@/contentful/gql-queries/components/cta";
import React from "react";
import CtaButton from "../buttons/cta-button";
import RichTextRender from "../rendering/rich-text-render";
import { CtaComponent } from "@/types/cta-component/cta-component.type";

type Props = {
  id: string;
};

// @TODO need to type out cta
async function getComponent(id: string): Promise<CtaComponent> {
  const res = await fetchGraphQL(ctaQuery(id));

  if (!res.data) throw new Error("Could not locate cta data");

  return res.data.componentCta;
}

const CtaComponent = async ({ id }: Props) => {
  const ctaData = await getComponent(id);

  if (!ctaData)
    return (
      <div>
        <p>Could not load component</p>
      </div>
    );
  return (
    <div className='w-full  bg-yellow-300  flex justify-center items-center '>
      <div className='flex items-start   py-14 rounded flex-col w-11/12 mx-4 md:mx-0 md:w-3/4 justify-between gap-4 md:flex-row md:items-center '>
        <div className='flex flex-col justify-center'>
          {!!ctaData.subline && (
            <RichTextRender
              content={ctaData.subline}
              classNames='text-blue-500'
            />
          )}
          <h2 className='font-semibold text-2xl text-black'>
            {ctaData.headline}
          </h2>
        </div>
        <CtaButton text={ctaData.ctaText} slug={ctaData.targetPage.slug} />
      </div>
    </div>
  );
};

export default CtaComponent;
