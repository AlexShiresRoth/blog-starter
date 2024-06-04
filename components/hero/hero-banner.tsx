import React from 'react';
import { HeroBannerResponseData, UnknownComponent } from '@/types/component';
import { fetchGraphQL } from '@/contentful/api';
import { heroQuery } from '@/contentful/gql-queries/components/hero/hero.query';
import SectionContainer from '../containers/section-container';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import CtaButton, { ExternalCTAButton } from '../buttons/cta-button';
import Image from 'next/image';
import { Hero } from '../ui/hero';
import { getTheme } from '@/lib/theme';

async function getComponent(id: string) {
  try {
    const res = await fetchGraphQL<HeroBannerResponseData>(heroQuery(id), 60, [
      'componentHeroBanner',
    ]);

    return res.data.componentHeroBanner;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

const HeroBanner = async (props: UnknownComponent) => {
  const hero = await getComponent(props.sys.id);

  if (!hero) return null;

  const theme = await getTheme();

  return (
    <Hero variant={theme}>
      {hero.image && (
        <Image
          src={hero.image.url}
          alt={hero.image.title}
          fill
          className="object-center object-cover h-full w-full absolute top-0 left-0 z-0 rounded opacity-30"
        />
      )}
      <SectionContainer>
        <div className="relative flex w-full">
          <div className="flex flex-col items-center justify-center mt-36 md:mt-0 pb-10 md:py-28 w-full gap-4 z-10">
            {hero.headline && <h1>{hero.headline}</h1>}
            {hero.bodyText && (
              <div className="text-center">
                {documentToReactComponents(hero.bodyText.json)}
              </div>
            )}
            <div className="flex gap-4 items-center">
              {hero.externalLink && (
                <ExternalCTAButton
                  text={hero.ctaText}
                  url={hero.externalLink}
                />
              )}
              {hero.targetPage && (
                <CtaButton
                  text={hero.ctaText}
                  slug={hero.targetPage.slug}
                  altButton
                />
              )}
            </div>
          </div>
        </div>
      </SectionContainer>
    </Hero>
  );
};

export default HeroBanner;
