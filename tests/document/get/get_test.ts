import { client } from "../../../mod.ts";
import { assert, assertStrictEquals, test } from "../../../test_deps.ts";

test("getById request", async () => {
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
