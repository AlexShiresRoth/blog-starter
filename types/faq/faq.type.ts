export interface Faq {
  internalName: string;
  faQsCollection: {
    items: {
      question: string;
      answer: string;
    }[];
  };
}
