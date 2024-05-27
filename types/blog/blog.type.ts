import { Document } from '@contentful/rich-text-types';
import { EntryFields } from 'contentful';
import { SEOMetadata } from '../page.type';

export interface BlogPostData {
  sys: {
    id: string;
    publishedAt: string;
    firstPublishedAt: string;
  };
  seoMetadata: SEOMetadata;
  title: string;
  slug: string;
  postImage: {
    url: string;
    title: string;
  };
  postContent: {
    json: Document;
  };
  briefDescription?: string;
  category: string;
  tags: string[];
}

export interface BlogCollectionResponseData {
  data: {
    blogPostCollection: {
      items: BlogPostData[];
    };
  };
}

export interface FeaturedPostsSectionResponseData {
  data: {
    featuredPostsSection: {
      sys: {
        id: string;
      };
      title: string;
      postsLink: string;
      morePostsLinkTitle: string;
      featuredPost: BlogPostData;
      morePostsCollection: {
        items: BlogPostData[];
      };
    };
  };
}
