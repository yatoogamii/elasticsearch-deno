import { ClientMethodsWrapper } from "../../../types/Client.ts";
import {
  DeleteByQueryArgs,
  DeleteByQueryResponseBody,
} from "../../../types/document/delete/DeleteByQuery.ts";

export const deleteByQuery = ({
  url,
  queryParamsFormater,
}: ClientMethodsWrapper) => async ({
  docName,
  requestBody,
  queryParams,
}: DeleteByQueryArgs): Promise<DeleteByQueryResponseBody> => {
  const query = new URL(
    `${url}/${docName}/_delete_by_query${
      queryParamsFormater(queryParams) ?? ""
    }`
  );
  const response = await fetch(query, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  return response.json();
};
