export const get = (url: URL) =>
  async (docName: string, body?: JSON): Promise<any> => {
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

export const getById = (url: URL) =>
  async (docName: string, docId: string): Promise<any> => {
    const query = new URL(`${url}/${docName}/${docId}`);

    const response = await fetch(query.toString());

    return response.json();
  };
