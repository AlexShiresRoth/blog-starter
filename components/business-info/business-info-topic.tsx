import { fetchGraphQL } from "@/contentful/api";
import { businessInfoQuery } from "@/contentful/gql-queries/components/topic-business-info";
import { UnknownComponent } from "@/types/component";
import React from "react";
import RichTextRender from "../rendering/rich-text-render";
import { TopicBusinessInfo } from "@/types/business-info";

async function getComponent(id: string): Promise<TopicBusinessInfo> {
  const res = await fetchGraphQL(businessInfoQuery(id));

  if (!res.data) throw new Error("No data returned from GraphQL");

  return res.data.topicBusinessInfo;
}

const BusinessInfoTopic = async (component: UnknownComponent) => {
  const data = await getComponent(component.sys.id);
  return (
    <div className='flex justify-center'>
      <div className='w-3/4 flex flex-col py-16 items-center'>
        <div>
          <h1 className='text-4xl font-extrabold'>{data.name}</h1>
          <div className='flex flex-col gap-4 max-w-2xl mt-4'>
            <RichTextRender
              content={data.body}
              classNames='leading-relaxed text-gray-500 text-lg'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoTopic;
