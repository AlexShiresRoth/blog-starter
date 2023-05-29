import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import RichTextAsset from "./rich-text-asset";
import { Document } from "@contentful/rich-text-types";
import RichTextEntry from "./rich-text-entry";
import { EntryFields } from "contentful";

const customMarkdownOptions = (content: any) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
      <RichTextAsset id={node.data.target.sys.id} data={node} />
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => (
      /* @ts-expect-error Async Server Component */
      <RichTextEntry entryId={node.data.target.sys.id} />
    ),
    [BLOCKS.HEADING_3]: (node: any) => (
      <h3 className='text-2xl font-bold text-gray-700'>
        {node.content[0].value}
      </h3>
    ),
  },
});

const RichTextRender = ({
  content,
  classNames,
}: {
  content: {
    json: EntryFields.RichText;
  };
  classNames?: string;
}) => {
  return (
    <div className={classNames}>
      {documentToReactComponents(content.json, customMarkdownOptions(content))}
    </div>
  );
};

export default RichTextRender;
