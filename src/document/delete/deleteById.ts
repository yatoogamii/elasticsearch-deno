import { ClientMethodsWrapper } from "../../../types/Client.ts";
import {
  DeleteByIdArgs,
  DeleteByIdResponseBody,
} from "../../../types/document/delete/DeleteById.ts";

export const deleteById = ({
  url,
  queryParamsFormater,
}: ClientMethodsWrapper) => async ({
  docName,
  docId,
  queryParams,
}: DeleteByIdArgs): Promise<DeleteByIdResponseBody> => {
  const query = new URL(
    `${url}/${docName}/${docId}${queryParamsFormater(queryParams) ?? ""}`
  );
  const response = await fetch(query, {
    method: "DELETE",
  });
  return response.json();
};
