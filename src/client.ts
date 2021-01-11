import { ClientInfos, ClientMethods } from "../types/Client.ts";
import { getById } from "./document/get/getById.ts";
import { search } from "./search/search.ts";
import { indexDoc } from "./document/index/indexDoc.ts";
import { deleteById } from "./document/delete/deleteById.ts";
import { deleteByQuery } from "./document/delete/deleteByQuery.ts";
import { queryParamsFormater } from "../utils/queryParamsFormater.ts";
import { updateById } from "./document/update/updateById.ts";
import { updateByQuery } from "./document/update/updateByQuery.ts";

export const client = ({ host, index }: ClientInfos): ClientMethods => {
  const url = new URL(index, host);

  return {
    // document APIs
    getById: getById({ url, queryParamsFormater }),
    indexDoc: indexDoc({ url, queryParamsFormater }),
    deleteById: deleteById({ url, queryParamsFormater }),
    deleteByQuery: deleteByQuery({ url, queryParamsFormater }),
    updateById: updateById({ url, queryParamsFormater }),
    updateByQuery: updateByQuery({ url, queryParamsFormater }),

    // search APIs
    search: search({ url, queryParamsFormater })
  };
};
