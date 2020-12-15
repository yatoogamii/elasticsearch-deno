import { GetByIdResponseBody } from "../../../types/document/get/Get.ts";

export interface GetByIdArgs {
  docName: string;
  docId: string;
}

export const getById = (url: URL) => async <T>({
  docName,
  docId,
}: GetByIdArgs): Promise<GetByIdResponseBody<T>> => {
  const query = new URL(`${url}/${docName}/${docId}`);

  const response = await fetch(query.toString());

  return response.json();
};
