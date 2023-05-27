import { InfoBlock } from "@/types/info-block";
import Image from "next/image";
import React from "react";
import RichTextRender from "../rendering/rich-text-render";
import cs from "classnames";
import { fetchGraphQL } from "@/contentful/api";
import { infoBlockQuery } from "@/contentful/gql-queries/components/info-block";
import { UnknownComponent } from "@/types/component";
type Props = {
  data: InfoBlock;
};

async function getComponent(id: string): Promise<InfoBlock> {
  const res = await fetchGraphQL(infoBlockQuery(id));

  if (!res.data) throw new Error("No data returned from GraphQL");

  return res.data.componentInfoBlock;
}

const InfoBlock = async (component: UnknownComponent) => {
  const data = await getComponent(component.sys.id);

  return (
    <div className='grid grid-cols-3 gap-4'>
      {data.blocksCollection.items.map((block, index) => {
        return (
          <div
            className='flex flex-col p-4 rounded bg-white gap-6'
            key={block.sys.id}
          >
            {!!block.image && (
              <div
                className={cs(
                  "rounded-lg p-2  self-start flex justify-center items-center",
                  {
                    "bg-yellow-300": index === 0,
                    "bg-blue-300": index === 1,
                    "bg-emerald-300": index === 2,
                  }
                )}
              >
                <Image
                  src={block.image.url}
                  alt={block.image.title}
                  width={40}
                  height={40}
                />
              </div>
            )}
            {!!block && (
              <RichTextRender
                content={block.text}
                classNames='text-gray-400 gap-2'
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InfoBlock;
