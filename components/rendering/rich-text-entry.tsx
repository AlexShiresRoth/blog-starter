import { fetchGraphQL } from '@/contentful/api';
import React from 'react';
import ComponentRenderer from './component-renderer';
import { EntrySys } from 'contentful';

type Props = {
  entryId: string;
};

interface EntryResponseData {
  data: {
    entryCollection: {
      items: {
        __typename: string;
        sys: EntrySys;
      }[];
    };
  };
}

async function getEntry(entryId: string) {
  try {
    const res = await fetchGraphQL<EntryResponseData>(`query {
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
  } catch (error) {
    console.error('Error fetching entry data:', error);
    return null;
  }
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
