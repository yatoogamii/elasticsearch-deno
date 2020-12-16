import { client } from "../../../mod.ts";
import { test } from "../../../test_deps.ts";

test("index request", async () => {
  const elasticClient = client({
    host: "http://localhost:9200",
    index: "plateform",
  });

  const user = await elasticClient.indexDoc({
    docName: "users",
    requestBody: {
      name: "roger",
    },
  });
});
