export const faqQuery = (id: string): string => `
        query {
        faq(id:"${id}") {
            sys {
                id
            }
            __typename
            internalName
            faQsCollection {
                items {
                    question
                    answer
                }
            }
        }
    }
`;
