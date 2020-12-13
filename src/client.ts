import { get, getById } from "./crud/get.ts";

export const client = (host: string, index: string) => {
  const url = new URL(index, host);

  return {
    url,
    get: get(url),
    getById: getById(url),
  };
};
