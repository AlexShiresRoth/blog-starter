import { fetchGraphQL } from "@/contentful/api";
import { businessInfoQuery } from "@/contentful/gql-queries/components/topic-business-info";
import { UnknownComponent } from "@/types/component";
import React from "react";
import RichTextRender from "../rendering/rich-text-render";
import { TopicBusinessInfo } from "@/types/business-info";
import Image from "next/image";

async function getComponent(id: string): Promise<TopicBusinessInfo> {
  const res = await fetchGraphQL(businessInfoQuery(id));

  if (!res.data) throw new Error("No data returned from GraphQL");

  return res.data.topicBusinessInfo;
}

const BusinessInfoTopic = async (component: UnknownComponent) => {
  const data = await getComponent(component.sys.id);
  return (
    <div className='flex flex-col items-center'>
      {!!data.featuredImage && (
        <div className='relative w-full h-[300px] bg-black flex justify-center items-center'>
          <Image
            src={data.featuredImage.url}
            alt={data.featuredImage.title ?? "banner image"}
            fill
            className='object-cover object-center opacity-60'
          />

          <div className='max-w-2xl'>
            <h1 className='text-7xl font-extrabold z-10 relative text-white'>
              {data.name}
            </h1>
          </div>
        </div>
      )}
      <div className='w-3/4 flex flex-col my-12 items-center'>
        <div className='flex flex-col gap-2 w-full max-w-2xl mt-4'>
          {!!!data.featuredImage && (
            <h1 className='text-5xl font-bold text-black '>{data.name}</h1>
          )}
          {!!data.body && (
            <RichTextRender
              content={data.body}
              classNames='leading-relaxed text-gray-500 text-lg'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoTopic;
