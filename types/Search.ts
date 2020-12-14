export interface SearchResponseBody<T> {
  // Identifier for the search and its search context
  _scroll_id?: string;
  // Milliseconds it took Elasticsearch to execute the request
  took: number;
  // If true, the request timed out before completion; returned results may be partial or empty
  timed_out: boolean;
  // Contains a count of shards used for the request
  _shards: {
    // Total number of shards that require querying, including unallocated shards
    total: number;
    // Number of shards that executed the request successfully
    successful: number;
    // Number of shards that skipped the request because a lightweight check helped realize that no documents could possibly match on this shard
    skipped: number;
    // Number of shards that failed to execute the request
    failed: number;
  };
  // Contains returned documents and metadata
  hits: {
    // Metadata about the number of returned documents
    total: {
      // Total number of returned documents
      value: number;
      // Indicates whether the number of returned documents in the value parameter is accurate `eq` or a lower bound `gte`
      relation: "eq" | "gte";
    };
    // Highest returned document _score. This value is null for requests that do not sort by _score
    max_score: number | null;
    // Array of returned document objects
    hits: Array<{
      // Name of the index containing the returned document
      _index: string;
      // Mapping type of the returned document. Deprecated in 6.0.0. Mapping types are deprecated and will be removed in 8.0
      _type: string;
      // Unique identifier for the returned document. This ID is only unique within the returned index
      _id: string;
      // Positive 32-bit floating point number used to determine the relevance of the returned document
      _score: number;
      // Original JSON body passed for the document at index time
      _source?: T;
      // Contains field values for the documents. These fields must be specified in the request using one or more of the following request parameters: {docvalue_fields, script_fields, stored_fields}
      fields?: { field: any[] };
    }>;
  };
}