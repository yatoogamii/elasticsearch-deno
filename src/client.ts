import { get, GetArgs, getById, GetByIdArgs } from "./crud/get.ts";
import { GetResponseBody } from "../types/Elasticsearch.ts";

interface ClientInfos {
  host: string;
  index: string;
}

interface ClientMethods {
  get<T>({ docName, body }: GetArgs): Promise<GetResponseBody<T>>;
  getById<T>(
    { docName, docId }: GetByIdArgs,
  ): Promise<GetResponseBody<T>>;
}

export const client = ({ host, index }: ClientInfos): ClientMethods => {
  const url = new URL(index, host);

  return {
    get: get(url),
    getById: getById(url),
  };
};
