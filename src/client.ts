import { getById, GetByIdArgs } from "./document/get/get.ts";
import { search, SearchArgs } from "./search/search.ts";
import { SearchResponseBody } from "../types/search/Search.ts";
import { GetByIdResponseBody } from "../types/document/get/Get.ts";

interface ClientInfos {
  host: string;
  index: string;
}

interface ClientMethods {
  search<T>({ docName, body }: SearchArgs): Promise<SearchResponseBody<T>>;
  getById<T>({ docName, docId }: GetByIdArgs): Promise<GetByIdResponseBody<T>>;
}

export const client = ({ host, index }: ClientInfos): ClientMethods => {
  const url = new URL(index, host);

  return {
    // document APIs
    search: search(url),
    getById: getById(url),

    // search APIs
  };
};
