import { client } from "../../src/client.ts";
import { assert, assertStrictEquals, test } from "../../test_deps.ts";

test("get fetch", async () => {
  const elasticClient = client("http://localhost:9200", "plateform");

  const users = await elasticClient.get("users");

  assert(users.hits.total.value);
});

test("getById fetch", async () => {
  const elasticClient = client("http://localhost:9200", "plateform");

  const user = await elasticClient.getById("users", "HsPIVnYBFrCgaxVLqpC9");

  assertStrictEquals(user._source.name, "Lucile");
});
