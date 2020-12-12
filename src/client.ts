interface SearchParams {
  /** HTTP method (GET by default). */
  method?: "GET" | "POST";

  /** Comma-separated list or wildcard expression of index names used to limit the request. */
  index?: string;

  /** https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-search-api-query-params */
  queryParameters?: URLSearchParams;

  /** https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-search-api-request-body */
  body?: BodyInit;
}

/** Class representing an elasticsearch client. */
export class Client {
  readonly url: string;

  /**
   * Create a new elasticsearch client.
   * @param {string} url URL of the elastic server.
   */
  constructor(url: string) {
    this.url = url;
  }

  /**
   * Returns search hits that match the query defined in the request.
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-search
   * @param {SearchParams} p
   */
  async search(p: SearchParams = { method: "GET", index: "" }) {
    const url = new URL(
      `${this.url}/${p.index}/_search?${p.queryParameters ?? ""}`
    );
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: p.method,
      body: JSON.stringify(p.body),
    });

    return resp.json();
  }
}
