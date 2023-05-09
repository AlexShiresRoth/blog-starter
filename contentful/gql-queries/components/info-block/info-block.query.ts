export const infoBlockQuery = (id: string) => `query {
  componentInfoBlock(id: "${id}") {
    sys {
        id
    }
    __typename
    headline
    subline
    block1Image {
      title
      description
      url
    }
    block1Body {
      json
    }
    block2Image {
      title
      description
      url
    }
    block2Body {
      json
    }
    block3Image {
      url
      description
      title
    }
    block3Body {
      json
    }
  }
}`;
