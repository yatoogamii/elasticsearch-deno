import { client } from "../../mod.ts";
import { assert, test } from "../../test_deps.ts";

test("seatch request", async () => {
  const elasticClient = client({
    host: "http://localhost:9200",
    index: "plateform",
  });

  const users = await elasticClient.get({ docName: "users" });

  assert(users.hits.total.value);
});
