import { Document } from '@contentful/rich-text-types';
import { EntryFields } from 'contentful';

export interface BlogPostData {
  sys: {
    id: string;
    publishedAt: string;
    firstPublishedAt: string;
  };
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
