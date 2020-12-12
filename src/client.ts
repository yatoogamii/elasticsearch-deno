interface SearchParams {
  /** https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-search-api-query-params */
  queryParameters?: URLSearchParams;

  /** https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-search-api-request-body */
  body?: BodyInit;
}

/** Class representing an elasticsearch client. */
export class Client {
  readonly url: URL;

  /**
   * Create a new elasticsearch client.
   * @param {string} host URL of the host of elastic server.
   * @param {string} index index of the elastic server.
   */
  constructor(host: string, index: string) {
  this.url = new URL(host, index);
  }

  async get(params: SearchParams) {
    const url = new URL(`${this.url}/_search?${params.queryParameters ?? ""}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.body),
    });

    return response.json();
  }

  /**
   * Returns search hits that match the query defined in the request.
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-search
   * @param {SearchParams} p
   */
  // async search(p: SearchParams = { method: "GET", index: "" }) {
  //   const url = new URL(
  //     `${this.url}/${p.index}/_search?${p.queryParameters ?? ""}`
  //   );
  //   const resp = await fetch(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: p.method,
  //     body: JSON.stringify(p.body),
  //   });

  //   return resp.json();
  // }
}
