import { fetchGraphQL } from '@/contentful/api';
import { assetQuery } from '@/contentful/gql-queries/components/asset';
import { Asset } from '@/types/asset';
import Image from 'next/image';
import React from 'react';

type Props = {
  id: string;
};

interface AssetResponseData {
  data: {
    asset: Asset;
  };
}

async function getAsset(id: string) {
  try {
    const res = await fetchGraphQL<AssetResponseData>(assetQuery(id));

    return res.data.asset;
  } catch (error) {
    console.error('Error fetching asset data:', error);
    return null;
  }
}

const RichTextAsset = async ({ id }: Props) => {
  const asset = await getAsset(id);

  if (!asset) return null;

  return (
    <div className="max-h-[500px] overflow-hidden rounded">
      <Image
        src={asset.url}
        alt={asset.title}
        width={asset.width}
        height={asset.height}
        className=" rounded"
      />
    </div>
  );
};

export default RichTextAsset;
