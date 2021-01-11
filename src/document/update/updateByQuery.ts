import { ClientMethodsWrapper } from "../../../types/Client.ts";
import {
  UpdateByQueryArgs,
  UpdateByQueryResponseBody
} from "../../../types/document/update/UpdateByQuery.ts";

export const updateByQuery = ({
  url,
  queryParamsFormater
}: ClientMethodsWrapper) => async ({
  docId,
  requestBody,
  queryParams
}: UpdateByQueryArgs): Promise<UpdateByQueryResponseBody> => {
  const query = new URL(
    `${url}/${docId ?? ""}/_update_by_query${
      queryParamsFormater(queryParams) ?? ""
    }`
  );
  const response = await fetch(query, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });
  return response.json();
};
