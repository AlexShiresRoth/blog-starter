import { Duplex } from '@/types/duplex-component.type';
import React from 'react';
import ComponentWrapper from '../wrappers/component-wrapper';
import ThreeQuarterContainer from '../containers/three-quarter-container';
import RichTextRender from '../rendering/rich-text-render';
import cs from 'classnames';
import { UnknownComponent } from '@/types/component';
import { fetchGraphQL } from '@/contentful/api';
import { duplexQuery } from '@/contentful/gql-queries/components/duplex';

interface DuplexResponseData {
  data: {
    componentDuplex: Duplex;
  };
}

async function getComponent(id: string) {
  try {
    const res = await fetchGraphQL<DuplexResponseData>(duplexQuery(id));

    if (!res.data) throw new Error('Could not locate duplex data');

    return res.data.componentDuplex;
  } catch (error) {
    console.error('Error fetching duplex data:', error);
    return null;
  }
}

const DuplexComponent = async (component: UnknownComponent) => {
  const data = await getComponent(component.sys.id);
  if (!data) return null;
  return (
    <ComponentWrapper classNames="py-8 md:py-14" data-component-type="duplex">
      <ThreeQuarterContainer
        containerClassNames={cs('gap-12 justify-between ', {
          'flex-col md:flex-row ': !data.containerLayout,
          'flex-col': data.containerLayout,
        })}
      >
        {!!data.firstColumn && (
          <div
            className={cs('flex flex-col gap-4', {
              'w-full md:w-1/2': !data.containerLayout,
              'w-full': data.containerLayout,
            })}
          >
            <h2 className="self-start z-10 relative text-4xl font-bold text-blue-500 before:block before:bg-yellow-200 before:content-[' '] before:w-full before:h-2 before:absolute before:-z-10 before:bottom-1 ">
              {data.firstColumnHeadline}
            </h2>
            <RichTextRender content={data.firstColumn} />
          </div>
        )}
        {!!data.secondColumn && (
          <div
            className={cs('flex flex-col gap-4', {
              'w-full md:w-1/2': !data.containerLayout,
              'w-full ': data.containerLayout,
            })}
          >
            <h2 className="self-start z-10 relative text-4xl font-bold text-blue-500 before:block before:bg-yellow-200 before:content-[' '] before:w-full before:h-2 before:absolute before:-z-10 before:bottom-1 ">
              {data.secondColumnHeadline}
            </h2>
            <RichTextRender
              content={data.secondColumn}
              classNames="text-gray-500 leading-8"
            />
          </div>
        )}
      </ThreeQuarterContainer>
    </ComponentWrapper>
  );
};

export default DuplexComponent;
