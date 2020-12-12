/** Class representing an elasticsearch client. */
export class Client {
  readonly url: URL;

  /**
   * Create a new elasticsearch client.
   * @param {string} host URL of the host of elastic server.
   * @param {string} index index of the elastic server.
   */
  constructor(host: string, index: string) {
  this.url = new URL(index, host);
  }

  async get(body?: JSON) {
    const url = new URL(`${this.url}/_search?`);

    console.log(url);
    
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  }
}
