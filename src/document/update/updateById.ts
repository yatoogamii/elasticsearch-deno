import { ClientMethodsWrapper } from "../../../types/Client.ts";
import {
  UpdateByIdArgs,
  UpdateByIdResponseBody,
} from "../../../types/document/update/UpdateById.ts";

export const updateById = ({
  url,
  queryParamsFormater,
}: ClientMethodsWrapper) => async ({
  docId,
  requestBody,
  queryParams,
}: UpdateByIdArgs): Promise<UpdateByIdResponseBody> => {
  const query = new URL(
    `${url}/_update/${docId}${queryParamsFormater(queryParams) ?? ""}`
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
