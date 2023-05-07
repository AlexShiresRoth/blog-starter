import React from "react";

type Props = {
  id: string;
  data: any;
};

const RichTextAsset = ({ id, data }: Props) => {
  console.log("node data", data);
  return <div>RichTextAsset</div>;
};

export default RichTextAsset;
