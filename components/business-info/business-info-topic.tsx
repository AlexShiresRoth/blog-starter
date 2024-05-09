import { fetchGraphQL } from '@/contentful/api';
import { businessInfoQuery } from '@/contentful/gql-queries/components/topic-business-info';
import { UnknownComponent } from '@/types/component';
import React from 'react';
import RichTextRender from '../rendering/rich-text-render';
import { TopicBusinessInfo } from '@/types/business-info';
import Image from 'next/image';

export interface BusinessInfoTopicResponseData {
  data: {
    topicBusinessInfo: TopicBusinessInfo;
  };
}

async function getComponent(id: string) {
  try {
    const res = await fetchGraphQL<BusinessInfoTopicResponseData>(
      businessInfoQuery(id)
    );

    return res.data.topicBusinessInfo;
  } catch (error) {
    console.error('Error fetching business info data:', error);
    return null;
  }
}

const BusinessInfoTopic = async (component: UnknownComponent) => {
  const data = await getComponent(component.sys.id);

  if (!data) return null;

  return (
    <div
      className="flex flex-col items-center"
      data-component-type="business-info"
    >
      {!!data.featuredImage && (
        <div className="relative w-full min-h-[170px] md:h-[300px] bg-black flex justify-center items-center">
          <Image
            src={data.featuredImage.url}
            alt={data.featuredImage.title ?? 'banner image'}
            fill
            className="object-cover object-center opacity-60"
          />

          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-7xl font-extrabold z-10 relative text-white">
              {data.name}
            </h1>
          </div>
        </div>
      )}
      <div className="w-11/12 md:w-3/4 flex flex-col my-4 md:my-12 items-center">
        <div className="flex flex-col gap-2 w-full max-w-2xl mt-4">
          {!!!data.featuredImage && (
            <h1 className="text-2xl md:text-5xl font-bold text-black ">
              {data.name}
            </h1>
          )}
          {!!data.body && (
            <RichTextRender
              content={data.body}
              classNames="leading-relaxed text-gray-500 text-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoTopic;
