/**
 * Wrapper for an GET Response Body
 * @typeParam T - type of source
 */
export interface GetByIdResponseBody<T> {
  /**
   * The name of the index the document belongs to
   */
  _index: string;
  /**
   * The document type.
   * Elasticsearch indices now support a single document type, `_doc`
   */
  _type: string;
  /**
   * The unique identifier for the document
   */
  _id: string;
  /**
   * The document version.
   * Incremented each time the document is updated
   */
  _version: number;
  /**
   * The sequence number assigned to the document for the indexing operation.
   * Sequence numbers are used to ensure an older version of a document doesn’t overwrite a newer version
   *
   * @link concurrency control index https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html#optimistic-concurrency-control-index
   */
  _seq_no: number;
  /**
   * The primary term assigned to the document for the indexing operation
   *
   * @link concurrency control index https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html#optimistic-concurrency-control-index
   */
  _primary_term: number;
  /**
   * Indicates whether the document exists
   */
  found: boolean;
  /**
   * The explicit routing, if set
   */
  _routing?: string;
  /**
   * If `found` is `true`, contains the document data formatted in JSON.
   * Excluded if the `_source` parameter is set to `false` or the `stored_fields` parameter is set to `true`
   */
  _source?: T;
  /**
   * If the `stored_fields` parameter is set to `true` and `found` is `true`, contains the document fields stored in the index
   */
  _fields?: any;
}

export interface GetByIdQueryParams {
  /**
   * Specifies the node or shard the operation should be performed on
   *
   * @defaultValue Random
   */
  preference?: string;
  /**
   * If `true`, the request is real-time as opposed to near-real-time
   *
   * @defaultValue `true`
   */
  realtime?: boolean;
  /**
   * If `true`, Elasticsearch refreshes the affected shards to make this operation visible to search.
   * If `false`, do nothing with refreshes.
   *
   * @defaultValue `false`
   *
   * @link realtime https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html#realtime
   */
  refresh?: boolean;
  /**
   * Target the specified primary shard
   */
  routing?: string;
  /**
   * If `true`, retrieves the document fields stored in the index rather than the document `_source`.
   *
   * @defaultValue `false`
   */
  stored_fields?: boolean;
  /**
   * True or false to return the `_source` field or not, or a list of fields to return
   */
  _source?: string;
  /**
   * A comma-separated list of source fields to exclude from the response.
   *
   * You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter
   *
   * If the `_source` parameter is `false`, this parameter is ignored
   *
   * @link source fields https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-source-field.html
   */
  _source_excludes?: string;
  /**
   * A comma-separated list of source fields to include in the response.
   *
   * You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter
   *
   * If the `_source` parameter is `false`, this parameter is ignored
   *
   * @link source fields https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-source-field.html
   */
  _source_includes?: string;
  /**
   * Explicit version number for concurrency control.
   * The specified version must match the current version of the document for the request to succeed
   */
  version?: number;
  /**
   * Specific version type
   */
  version_type?: "internal" | "external" | "external_gte";
}
