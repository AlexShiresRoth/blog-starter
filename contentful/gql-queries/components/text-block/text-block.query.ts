export const textBlockQuery = (id: string): string => `query {
        componentTextBlock(id: "${id}") {
            sys {
                id
            }
            __typename
            headline
            subline
            body {
            json
            }
        }
        }`;
