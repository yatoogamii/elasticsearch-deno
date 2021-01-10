import {
  GetByIdResponseBody,
  GetByIdArgs
} from "../../../types/document/get/GetById.ts";
import { ClientMethodsWrapper } from "../../../types/Client.ts";

export const getById = ({
  url,
  queryParamsFormater
}: ClientMethodsWrapper) => async <T>({
  docName,
  docId,
  queryParams
}: GetByIdArgs): Promise<GetByIdResponseBody<T>> => {
  const query = new URL(
    `${url}/${docName}/${docId}${queryParamsFormater(queryParams) ?? ""}`
  );

  const response = await fetch(query);

  return response.json();
};
