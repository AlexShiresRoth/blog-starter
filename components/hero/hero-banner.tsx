import Image from "next/image";
import React from "react";
import CtaButton from "../buttons/cta-button";
import RichTextRender from "../rendering/rich-text-render";
import { ComponentHeroBanner } from "@/types/page.type";
import { UnknownComponent } from "@/types/component";
import { fetchGraphQL } from "@/contentful/api";
import { heroQuery } from "@/contentful/gql-queries/components/hero/hero.query";

async function getComponent(id: string): Promise<ComponentHeroBanner> {
  const res = await fetchGraphQL(heroQuery(id));

  if (!res.data) throw new Error("Could not locate hero data");

  return res.data.componentHeroBanner;
}

const HeroBanner = async (props: UnknownComponent) => {
  const hero = await getComponent(props.sys.id);

  return (
    <div
      data-component-type='hero-banner'
      className='w-full  flex gap-4 justify-center  items-center  bg-blue-700 py-14 overflow-x-hidden'
    >
      <div className='w-11/12 mx-4 md:mx-0 md:w-3/4  flex flex-col-reverse md:flex-row gap-4 justify-between items-center '>
        <div className='w-full md:w-1/2 relative z-0 flex flex-col gap-6  h-full py-12 my-8'>
          <span className='h-[400px] w-[400px] rounded-full block absolute -z-10 top-0 -left-20 border-2 border-white/20'></span>
          <h1 className='text-2xl md:text-4xl lg:text-6xl  font-extrabold leading-relaxed  text-white  flex flex-col '>
            {hero.headline}
          </h1>
          <RichTextRender
            content={hero.bodyText}
            classNames='text-white/80 w-11/12 md:w-3/4'
          />
          <div>
            <CtaButton
              text={hero.ctaText ?? "Learn More"}
              slug={hero.targetPage.slug ?? null}
            />
          </div>
        </div>
        <div className='relative'>
          <span className='w-[60px] h-[60px] rounded-full -top-10 -right-10 absolute z-20 bg-blue-600 block skew-y-3 -translate-x-2 p-4'></span>
          <div className='relative w-[330px] h-[250px] lg:w-[400px] lg:h-[350px] xl:w-[550px] xl:h-[400px]'>
            <Image
              src={hero?.image?.url}
              alt={hero?.image?.title}
              className='object-cover object-center rounded  z-10 ring-2 ring-white'
              quality={75}
              priority
              sizes=''
              fill
            />
          </div>
          <span className='w-full h-full top-10 absolute rounded bg-yellow-300 block skew-y-3 -translate-x-2 p-4'></span>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
