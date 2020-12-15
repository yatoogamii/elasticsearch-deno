import { SearchResponseBody } from "../../types/search/Search.ts";

export interface SearchArgs {
  docName: string;
  body?: JSON;
}

export const search = (url: URL) => async <T>({
  docName,
  body,
}: SearchArgs): Promise<SearchResponseBody<T>> => {
  const query = new URL(`${url}/${docName}/_search?`);

  const response = await fetch(query.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
};
