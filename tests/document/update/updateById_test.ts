import { client } from "../../../mod.ts";
import { assertStrictEquals, test } from "../../../test_deps.ts";

test("updateById request", async () => {
  const elasticClient = client({
    host: "http://localhost:9200",
    index: "plateform",
  });

  const user = await elasticClient.updateById({
    docId: "JMNvZ3YBFrCgaxVLo5B3",
    requestBody: {
      script: "ctx._source.name = 'Lucile'",
    },
  });

  console.log(user);
});
