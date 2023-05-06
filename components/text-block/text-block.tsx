import { TextBlock } from "@/types/text-block.type";
import React from "react";
import RichTextRender from "../rendering/rich-text-render";
type Props = {
  textBlock: TextBlock;
};

const TextBlockComponent = ({ textBlock }: Props) => {
  return (
    <div className="rounded flex flex-col  p-4 bg-blue-50/50 gap-2 mb-8 ">
      {!!textBlock.headline && (
        <h3 className="font-bold text-2xl text-blue-900 border-b-2 border-b-blue-100 pb-2">
          {textBlock.headline}
        </h3>
      )}
      {!!textBlock.subline && (
        <p className="text-gray-400 font-normal">{textBlock.subline}</p>
      )}
      {!!textBlock.body && (
        <RichTextRender
          content={textBlock.body}
          classNames="text-gray-500 leading-8"
        />
      )}
    </div>
  );
};

export default TextBlockComponent;
