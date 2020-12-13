import { GetResponseBody } from "../../types/Elasticsearch.ts";

export interface GetArgs {
  docName: string;
  body?: JSON;
}

export const get = <T>(url: URL) =>
  async (
    { docName, body }: GetArgs,
  ): Promise<GetResponseBody<T>> => {
    const query = new URL(`${url}/${docName}/_search?`);

    const response = await fetch(query.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  };

export interface GetByIdArgs {
  docName: string;
  docId: string;
}

export const getById = <T>(url: URL) =>
  async (
    { docName, docId }: GetByIdArgs,
  ): Promise<GetResponseBody<T>> => {
    const query = new URL(`${url}/${docName}/${docId}`);

    const response = await fetch(query.toString());

    return response.json();
  };