import { Client } from "../src/client.ts";

const elasticClient = new Client("http://localhost:9200", "plateform")

console.log(elasticClient.url);
