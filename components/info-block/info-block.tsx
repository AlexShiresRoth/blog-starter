import { InfoBlockdata } from '@/types/info-block';
import Image from 'next/image';
import React from 'react';
import RichTextRender from '../rendering/rich-text-render';
import cs from 'classnames';
import { fetchGraphQL } from '@/contentful/api';
import { infoBlockQuery } from '@/contentful/gql-queries/components/info-block';
import { UnknownComponent } from '@/types/component';

interface InfoBlockResponseData {
  data: {
    componentInfoBlock: InfoBlockdata;
  };
}

async function getComponent(id: string) {
  try {
    const res = await fetchGraphQL<InfoBlockResponseData>(infoBlockQuery(id));

    return res.data.componentInfoBlock;
  } catch (error) {
    console.error('Error fetching info block data:', error);
    return null;
  }
}

const InfoBlock = async (component: UnknownComponent) => {
  const data = await getComponent(component.sys.id);

  if (!data) return null;

  return (
    <div
      data-component-type="info-block"
      className="flex flex-col md:grid md:grid-cols-3 gap-4"
    >
      {data.blocksCollection.items.map((block, index) => {
        return (
          <div
            className="flex flex-col p-4 rounded bg-white gap-6"
            key={block.sys.id}
          >
            {!!block.image && (
              <div
                className={cs(
                  'rounded-lg p-2  self-start flex justify-center items-center',
                  {
                    'bg-yellow-300': index === 0,
                    'bg-blue-300': index === 1,
                    'bg-emerald-300': index === 2,
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
                classNames="text-gray-400 gap-2"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InfoBlock;
