import axios from "axios";

const baseURL = `https://graphql.contentful.com/content/v1/spaces/`;

const axiosInstance = axios.create({
  baseURL,
});

//currently fetch does not work in prod
export async function fetchGraphQL(query: string): Promise<any> {
  return await fetch(`${baseURL}/${process.env.SPACE_ID}/environments/master`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}
