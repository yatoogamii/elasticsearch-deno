import { get } from "./crud/get.ts";

/** Class representing an elasticsearch client. */
export class Client {
  readonly url: URL;
  get: (docName: string, body?: JSON) => Promise<JSON>;

  /**
   * Create a new elasticsearch client.
   * @param {string} host URL of the host of elastic server.
   * @param {string} index index of the elastic server.
   */
  constructor(host: string, index: string) {
    this.url = new URL(index, host);
    this.get = get(this.url);
  }
}
