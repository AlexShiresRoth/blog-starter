import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import RichTextAsset from "./rich-text-asset";
import { Document } from "@contentful/rich-text-types";
import RichTextEntry from "./rich-text-entry";

const customMarkdownOptions = (content: any) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
      <RichTextAsset id={node.data.target.sys.id} data={node} />
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => (
      /* @ts-expect-error Async Server Component */
      <RichTextEntry entryId={node.data.target.sys.id} />
    ),
  },
});

const RichTextRender = ({
  content,
  classNames,
}: {
  content: {
    json: Document;
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
