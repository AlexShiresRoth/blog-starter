import { fetchGraphQL } from "@/contentful/api";
import React from "react";
import ComponentRenderer from "./component-renderer";
import { EntrySys } from "contentful";

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

const RichTextEntry = async ({ entryId }: Props) => {
  const entry = await getEntry(entryId);

  if (!entry) return null;

  return (
    <ComponentRenderer
      itemsToRender={[
        {
          sys: {
            id: entryId,
          },
          __typename: entry.__typename,
        },
      ]}
    />
  );
};

export default RichTextEntry;
