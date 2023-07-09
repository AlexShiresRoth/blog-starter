import { TextBlock } from "@/types/text-block.type";
import React from "react";
import RichTextRender from "../rendering/rich-text-render";
import { fetchGraphQL } from "@/contentful/api";
import { textBlockQuery } from "@/contentful/gql-queries/components/text-block";
import { UnknownComponent } from "@/types/component";

async function getComponent(id: string): Promise<TextBlock> {
  const res = await fetchGraphQL(textBlockQuery(id));

  if (!res.data) throw new Error("No data returned from GraphQL");

  return res.data.componentTextBlock;
}

const TextBlockComponent = async (component: UnknownComponent) => {
  const textBlock = await getComponent(component.sys.id);

  if (!textBlock) return null;

  return (
    <div className='rounded flex flex-col gap-2 bg-white p-4'>
      {!!textBlock.headline && (
        <h3 className='font-bold text-xl text-gray-800 rounded '>
          {textBlock.headline}
        </h3>
      )}
      {!!textBlock.subline && (
        <p className='text-gray-600 font-normal'>{textBlock.subline}</p>
      )}
      {!!textBlock.body && (
        <RichTextRender
          content={textBlock.body}
          classNames='text-gray-500 leading-8 font-normal'
        />
      )}
    </div>
  );
};

export default TextBlockComponent;
