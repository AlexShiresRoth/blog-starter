import { fetchGraphQL } from '@/contentful/api';
import { faqQuery } from '@/contentful/gql-queries/components/faq';
import { UnknownComponent } from '@/types/component';
import { Faq } from '@/types/faq/faq.type';
import React from 'react';
import ThreeQuarterContainer from '../containers/three-quarter-container';
import FaqItem from './faq-item';

interface FaqResponseData {
  data: {
    faq: Faq;
  };
}

async function getComponent(id: string) {
  try {
    const res = await fetchGraphQL<FaqResponseData>(faqQuery(id));

    return res.data.faq;
  } catch (error) {
    console.error('Error fetching faq data:', error);
    return null;
  }
}

const FAQ = async (data: UnknownComponent) => {
  const faqData = await getComponent(data.sys.id);

  if (!faqData) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.faQsCollection.items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <ThreeQuarterContainer
      containerClassNames="my-10 flex-col gap-4"
      data-component-type="faq"
    >
      <h2 className="self-start z-10 relative text-4xl font-bold text-blue-500 before:block before:bg-yellow-200 before:content-[' '] before:w-full before:h-2 before:absolute before:-z-10 before:bottom-1 ">
        FAQ
      </h2>
      <div>
        {faqData.faQsCollection.items.map((faq) => (
          <FaqItem key={faq.question} {...faq} />
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      ></script>
    </ThreeQuarterContainer>
  );
};

export default FAQ;
