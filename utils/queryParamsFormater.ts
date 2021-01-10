import { isObject, isObjectEmpty } from "./object.ts";
import { GetByIdQueryParams } from "../types/document/get/GetById.ts";
import { SearchQueryParams } from "../types/search/Search.ts";
import { IndexDocQueryParams } from "../types/document/index/IndexDoc.ts";
import { DeleteByQueryQueryParams } from "../types/document/delete/DeleteByQuery.ts";
import { UpdateByIdQueryParams } from "../types/document/update/UpdateById.ts";

export type QueryParamsFormaterArgs =
  | IndexDocQueryParams
  | GetByIdQueryParams
  | SearchQueryParams
  | DeleteByQueryQueryParams
  | UpdateByIdQueryParams
  | undefined;

export const queryParamsFormater = (queryParams: QueryParamsFormaterArgs) => {
  try {
    if (isObject(queryParams)) {
      if (isObjectEmpty(queryParams)) {
        return Object.entries(queryParams).reduce(
          (questionMark, [paramKey, paramValue]) => {
            return `${questionMark}${paramKey}=${paramValue}&`;
          },
          "?"
        );
      } else {
        throw "queryParams is empty, you can omit it";
      }
    } else {
      throw "queryParams is not a object";
    }
  } catch (e) {
    console.log(e);
  }
};
