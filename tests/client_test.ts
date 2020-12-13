import { client } from "../src/client.ts";
import { assertEquals, test } from "../test_deps.ts";

test("Client URL", () => {
  const elasticClient = client("http://localhost:9200", "plateform");

  assertEquals(
    elasticClient.url,
    new URL("http://localhost:9200/plateform"),
  );
});
