export const get = (url: URL) =>
  async (docName: string, body?: JSON) => {
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
