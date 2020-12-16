import { ClientInfos, ClientMethods } from "../types/Client.ts";
import { getById } from "./document/get/getById.ts";
import { search } from "./search/search.ts";
import { indexDoc } from "./document/index/indexDoc.ts";
import { queryParamsFormater } from "../utils/queryParamsFormater.ts";

export const client = ({ host, index }: ClientInfos): ClientMethods => {
  const url = new URL(index, host);

  return {
    // document APIs
    getById: getById({ url, queryParamsFormater }),
    indexDoc: indexDoc({ url, queryParamsFormater }),

    // search APIs
    search: search({ url, queryParamsFormater }),
  };
};
