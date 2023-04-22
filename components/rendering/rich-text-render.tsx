import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import RichTextAsset from "./rich-text-asset";

const customMarkdownOptions = (content: any) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
      <RichTextAsset id={node.data.target.sys.id} />
    ),
  },
});

const RichTextRender = ({
  content,
  classNames,
}: {
  content: any;
  classNames?: string;
}) => {
  return (
    <div className={classNames}>
      {documentToReactComponents(content.json, customMarkdownOptions(content))}
    </div>
  );
};

export default RichTextRender;
