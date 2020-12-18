import { ClientMethodsWrapper } from "../../../types/Client.ts";
import {
  UpdateByIdArgs,
  UpdateByIdResponseBody,
} from "../../../types/document/update/UpdateById.ts";

export const updateById = ({
  url,
  queryParamsFormater,
}: ClientMethodsWrapper) => async ({
  docName,
  docId,
  queryParams,
}: UpdateByIdArgs): Promise<UpdateByIdResponseBody> => {
  const query = new URL(
    `${url}/${docName}/${docId}${queryParamsFormater(queryParams) ?? ""}`
  );
  const response = await fetch(query, {
    method: "POST",
  });
  return response.json();
};
