import { ClientMethodsWrapper } from "../../../types/Client.ts";
import {
  IndexDocArgs,
  IndexDocResponseBody
} from "../../../types/document/index/IndexDoc.ts";

export const indexDoc = ({
  url,
  queryParamsFormater
}: ClientMethodsWrapper) => async ({
  docName,
  docId,
  requestBody,
  queryParams
}: IndexDocArgs): Promise<IndexDocResponseBody> => {
  const query = new URL(
    `${url}/${docName}/${docId ?? ""}${queryParamsFormater(queryParams) ?? ""}`
  );

  const response = await fetch(query, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  return response.json();
};
