const baseURL = `https://graphql.contentful.com/content/v1/spaces/`;

//currently fetch does not work in prod
export async function fetchGraphQL<T>(
  query: string,
  revalidate: number = 120,
  tags: string[] = []
) {
  return await fetch(`${baseURL}/${process.env.SPACE_ID}/environments/master`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    next: {
      revalidate,
      tags,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json() as T);
}
