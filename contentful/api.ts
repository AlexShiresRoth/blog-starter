import axios from "axios";

const baseURL = `https://graphql.contentful.com/content/v1/spaces/`;

const axiosInstance = axios.create({
  baseURL,
});

//currently fetch does not work in prod
export async function fetchGraphQL(query: string) {
  return await axiosInstance({
    url: `/${process.env.SPACE_ID}/environments/master`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    data: JSON.stringify({ query }),
  }).then((response) => response.data);
}
