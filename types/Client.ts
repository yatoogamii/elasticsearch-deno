import { GetByIdArgs, GetByIdResponseBody } from "./document/get/GetById.ts";
import { IndexDocArgs } from "./document/index/IndexDoc.ts";
import { SearchArgs, SearchResponseBody } from "./search/Search.ts";
import { QueryParamsFormaterArgs } from "../utils/queryParamsFormater.ts";

export interface ClientInfos {
  host: string;
  index: string;
}

export interface ClientMethods {
  /**
   * search by `queryParams` or `requestBody`
   */
  search<T>({
    docName,
    requestBody,
    queryParams,
  }: SearchArgs): Promise<SearchResponseBody<T>>;
  /**
   * get by `docId`
   */
  getById<T>({
    docName,
    docId,
    queryParams,
  }: GetByIdArgs): Promise<GetByIdResponseBody<T>>;
  /**
   * create / update element by `queryParams` or `requestBody` or `docId`
   */
  indexDoc({
    docName,
    docId,
    requestBody,
    queryParams,
  }: IndexDocArgs): Promise<any>;
}

export interface ClientMethodsWrapper {
  url: URL;
  queryParamsFormater: (
    queryParams: QueryParamsFormaterArgs
  ) => string | undefined;
}
