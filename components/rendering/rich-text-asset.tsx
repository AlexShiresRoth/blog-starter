import { fetchGraphQL } from "@/contentful/api";
import { assetQuery } from "@/contentful/gql-queries/components/asset";
import { Asset } from "@/types/asset";
import Image from "next/image";
import React from "react";

type Props = {
  id: string;
};
async function getAsset(id: string): Promise<Asset> {
  const res = await fetchGraphQL(assetQuery(id));

  if (!res.data) throw new Error("Could not locate asset data");

  return res.data.asset;
}

const RichTextAsset = async ({ id }: Props) => {
  const asset = await getAsset(id);

  return (
    <div className='max-h-[500px] overflow-hidden rounded'>
      <Image
        src={asset.url}
        alt={asset.title}
        width={asset.width}
        height={asset.height}
        className=' rounded'
      />
    </div>
  );
};

export default RichTextAsset;
