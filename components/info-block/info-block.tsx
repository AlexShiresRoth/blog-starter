import { InfoBlock } from "@/types/info-block";
import Image from "next/image";
import React from "react";
import RichTextRender from "../rendering/rich-text-render";

type Props = {
  data: InfoBlock;
};

const InfoBlock = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col p-4 rounded bg-white gap-4">
        {!!data.block1Image && (
          <div className="rounded-lg p-2 bg-yellow-400 self-start flex justify-center items-center">
            <Image
              src={data.block1Image.url}
              alt={data.block1Image.title}
              width={50}
              height={50}
            />
          </div>
        )}
        {!!data.block1Body && (
          <RichTextRender
            content={data.block1Body}
            classNames="text-gray-400"
          />
        )}
      </div>
      <div className="flex flex-col p-8 rounded bg-white gap-4">
        {!!data.block2Image && (
          <div className="rounded-lg p-2 bg-blue-400 self-start flex justify-center items-center">
            <Image
              src={data.block2Image.url}
              alt={data.block2Image.title}
              width={50}
              height={50}
            />
          </div>
        )}
        {!!data.block2Body && (
          <RichTextRender
            content={data.block2Body}
            classNames="text-gray-400"
          />
        )}
      </div>
      <div className="flex flex-col p-8 rounded bg-white gap-4">
        {!!data.block3Image && (
          <div className="rounded-lg p-2 bg-emerald-400 self-start flex justify-center items-center">
            <Image
              src={data.block3Image.url}
              alt={data.block3Image.title}
              width={50}
              height={50}
            />
          </div>
        )}
        {!!data.block3Body && (
          <RichTextRender
            content={data.block3Body}
            classNames="text-gray-400"
          />
        )}
      </div>
    </div>
  );
};

export default InfoBlock;
