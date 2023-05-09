import { fetchGraphQL } from "@/contentful/api";
import React from "react";
import ComponentRenderer from "./component-renderer";
import { EntrySys } from "contentful";
import { TextBlock } from "@/types/text-block.type";
import { textBlockQuery } from "@/contentful/gql-queries/components/text-block";
import { infoBlockQuery } from "@/contentful/gql-queries/components/info-block";

type Props = {
  entryId: string;
};

async function getEntry(
  entryId: string
): Promise<{ __typename: string; sys: EntrySys }> {
  const res = await fetchGraphQL(`query {
    entryCollection(where:{sys :{id: "${entryId}"}}) {
        items {
        __typename
            sys {
                id
            }
        }
    }
    }`);
  const entry = res.data.entryCollection.items[0];
  return entry;
}

async function getEntryByTypename(
  entryId: string,
  typename: string
): Promise<TextBlock | undefined> {
  switch (typename) {
    case "ComponentTextBlock":
      return await fetchGraphQL(textBlockQuery(entryId)).then(
        (res) => res.data.componentTextBlock
      );

    case "ComponentInfoBlock":
      return await fetchGraphQL(infoBlockQuery(entryId)).then(
        (res) => res.data.componentInfoBlock
      );

    default:
      console.error("No entry could be located", typename, entryId);
      return;
  }
}

const RichTextEntry = async ({ entryId }: Props) => {
  const entry = await getEntry(entryId);

  if (!entry) return null;

  const entryData = await getEntryByTypename(entryId, entry.__typename);

  if (!entryData) return null;

  return <ComponentRenderer itemsToRender={[entryData]} />;
};

export default RichTextEntry;
