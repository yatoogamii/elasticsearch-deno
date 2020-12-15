import { client } from "../../../mod.ts";
import { assert, assertStrictEquals, test } from "../../../test_deps.ts";

test("get fetch", async () => {
  const elasticClient = client({
    host: "http://localhost:9200",
    index: "plateform",
  });

  const users = await elasticClient.get({ docName: "users" });

  assert(users.hits.total.value);
});

test("getById fetch", async () => {
  const elasticClient = client({
    host: "http://localhost:9200",
    index: "plateform",
  });
  const user = await elasticClient.getById<{ name: string }>({
    docName: "users",
    docId: "HsPIVnYBFrCgaxVLqpC9",
  });

  assertStrictEquals("Lucile", user._source!.name);
});
