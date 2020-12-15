import { get, GetArgs, getById, GetByIdArgs } from "./crud/get.ts";
import { SearchResponseBody } from "../types/Search.ts";
import { GetByIdResponseBody } from "../types/Get.ts";

interface ClientInfos {
  host: string;
  index: string;
}

interface ClientMethods {
  get<T>({ docName, body }: GetArgs): Promise<SearchResponseBody<T>>;
  getById<T>({ docName, docId }: GetByIdArgs): Promise<GetByIdResponseBody<T>>;
}

export const client = ({ host, index }: ClientInfos): ClientMethods => {
  const url = new URL(index, host);

  return {
    // document APIs
    get: get(url),
    getById: getById(url),

    // search APIs
  };
};
