export interface ComponentHeroBannerType {
  __typename: 'ComponentHeroBanner';
  sys: {
    id: string;
  };
  headline: string;
  ctaText: string;
  externalLink: string;
  image: {
    url: string;
    title: string;
    description: string;
  };
  targetPage: {
    sys: {
      id: string;
    };
    __typename: 'Page';
    slug: string;
  };
  bodyText: {
    json: any;
  };
}

export interface HeroBannerResponseData {
  data: {
    componentHeroBanner: ComponentHeroBannerType;
  };
}
