import { SearchArgs, SearchResponseBody } from "../../types/search/Search.ts";
import { ClientMethodsWrapper } from "../../types/Client.ts";

export const search = ({
  url,
  queryParamsFormater,
}: ClientMethodsWrapper) => async <T>({
  docName,
  requestBody,
  queryParams,
}: SearchArgs): Promise<SearchResponseBody<T>> => {
  const query = new URL(
    `${url}/${docName}/_search/${queryParamsFormater(queryParams) ?? ""}`
  );

  const response = await fetch(query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return response.json();
};
