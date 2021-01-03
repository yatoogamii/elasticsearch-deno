export interface SearchArgs {
  docName: string;
  requestBody?: SearchRequestBody;
  queryParams?: SearchQueryParams;
}

/**
 * Wrapper for an Search Response Body
 * @typeParam T - type of source
 */
export interface SearchResponseBody<T> {
  /**
   * Identifier for the search and its *search context*
   *
   * You can use this scroll ID with the *scroll API* to retrieve the next batch of search results for the request.
   * See *Scroll search results*.
   *
   * This parameter is only returned if the `scroll` *query parameter* is specified in the request.
   *
   * @link search context https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#scroll-search-context}
   * @link scroll API  https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html}
   * @link Scroll search results  https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#scroll-search-results}
   * @link scroll query parameter https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-api-scroll-query-param}
   */
  _scroll_id?: string;
  /**
   * Milliseconds it took Elasticsearch to execute the request
   *
   * This value is calculated by measuring the time elapsed between receipt of a request on the coordinating node and the time at which the coordinating node is ready to send the response
   *
   * Took time includes:
   * - Communication time between the coordinating node and data nodes
   * - Time the request spends in the `search` *thread pool*, queued for execution
   * - Actual execution time
   *
   * Took time does **not** include
   * - Time needed to send the request to Elasticsearch
   * - Time needed to serialize the JSON response
   * - Time needed to send the response to a client
   *
   * @link thread pool https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-threadpool.html
   */
  took: number;
  /**
   * If `true`, the request timed out before completion; returned results may be partial or empty
   */
  timed_out: boolean;
  /**
   * Contains a count of shards used for the request
   */
  _shards: {
    /**
     * Total number of shards that require querying, including unallocated shards
     */
    total: number;
    /**
     * Number of shards that executed the request successfully
     */
    successful: number;
    /**
     * Number of shards that skipped the request because a lightweight check helped realize that no documents could possibly match on this shard.
     * This typically happens when a search request includes a range filter and the shard only has values that fall outside of that range
     */
    skipped: number;
    /**
     * Number of shards that failed to execute the request.
     * Note that shards that are not allocated will be considered neither successful nor failed.
     * Having `failed+successful` less than `total` is thus an indication that some of the shards were not allocated
     */
    failed: number;
  };
  /**
   * Contains returned documents and metadata
   */
  hits: {
    /**
     * Metadata about the number of returned documents
     */
    total: {
      /**
       * Total number of returned documents
       */
      value: number;
      /**
       * Indicates whether the number of returned documents in the value parameter is accurate `eq` or a lower bound `gte`
       */
      relation: "eq" | "gte";
    };
    /**
     * Highest returned *document* `_score`.
     * This value is `null` for requests that do not sort by `_score`
     *
     * @link document _score https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-api-response-body-score
     */
    max_score: number | null;
    /**
     * Array of returned document objects
     */
    hits: Array<{
      /**
       * Name of the index containing the returned document
       */
      _index: string;
      /**
       * Mapping type of the returned document.
       *
       * @deprecated in 6.0.0. Mapping types are deprecated and will be removed in 8.0
       */
      _type: string;
      /**
       * Unique identifier for the returned document.
       * This ID is only unique within the returned index
       */
      _id: string;
      /**
       * Positive 32-bit floating point number used to determine the relevance of the returned document
       */
      _score: number;
      /**
       * Original JSON body passed for the document at index time
       *
       * You can use the `_source` parameter to exclude this property from the response or specify which source fields to return
       */
      _source?: T;
      /**
       * Contains field values for the documents.
       * These fields must be specified in the request using one or more of the following request parameters:
       * - docvalue_fields,
       * - script_fields,
       * - stored_fields
       *
       * This property is returned only if one or more of these parameters are set
       *
       * @link docvalue_fields https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-docvalue-fields-param
       * @link script_fields https://www.elastic.co/guide/en/elasticsearch/reference/current/search-fields.html#script-fields
       * @link stored_fields https://www.elastic.co/guide/en/elasticsearch/reference/current/search-fields.html#stored-fields
       */
      fields?: {
        /**
         * Key is the field name. Value is the value for the field
         */
        field: any[];
      };
    }>;
  };
}

export interface SearchRequestBody {
  /**
   * Array of wildcard (`*`) patterns.
   * The request returns doc values for field names matching these patterns in the `hits.fields` property of the response
   *
   * You can specify items in the array as a string or object.
   *
   * See Doc value fields https://www.elastic.co/guide/en/elasticsearch/reference/current/search-fields.html#docvalue-fields
   */
  docvalue_fields?: Array<{
    /**
     * Wildcard pattern. The request returns doc values for field names matching this pattern
     */
    field: string;
    /**
     * Format in which the doc values are returned
     *
     * For *date fields*, you can specify a date *date* `format`.
     * For *numeric fields* fields, you can specify a *DecimalFormat pattern*
     *
     * For other field data types, this parameter is not supported
     *
     * @link date field https://www.elastic.co/guide/en/elasticsearch/reference/current/date.html
     * @link date format https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html
     * @link numeric fields https://www.elastic.co/guide/en/elasticsearch/reference/current/number.html
     * @link DecimalFormat pattern https://docs.oracle.com/javase/8/docs/api/java/text/DecimalFormat.html
     */
    format?: string;
  }>;
  /**
   * Array of wildcard (`*`) patterns.
   * The request returns values for field names matching these patterns in the `hits.fields` property of the response.
   *
   * You can specify items in the array as a string or object. See *Fields* for more detail
   *
   * @link Fields https://www.elastic.co/guide/en/elasticsearch/reference/current/search-fields.html#search-fields-param
   */
  fields?: Array<{
    /**
     * Wildcard pattern. The request returns values for field names matching this pattern
     */
    field: string;
    /**
     * Format in which the values are returned
     *
     * The date fields `date` and `date_nanos` accept a *date format*. *Spatial fields* accept either `geojson` for *GeoJSON* (the default) or `wkt` for *Well Known Text*
     *
     * For other field data types, this parameter is not supported
     *
     * @link date https://www.elastic.co/guide/en/elasticsearch/reference/current/date.html
     * @link date_nanos https://www.elastic.co/guide/en/elasticsearch/reference/current/date_nanos.html
     * @link date format https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html
     * @link Spatial fields https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html#spatial_datatypes
     * @link GeoJSON http://www.geojson.org/
     * @link Well Known Text https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry
     */
    format?: string;
  }>;
  /**
   * If `true`, returns detailed information about score computation as part of a hit.
   *
   * @defaultValue `false`
   */
  explain?: boolean;
  /**
   * Starting document offset.
   *
   * By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters.
   * To page through more hits, use the *`search_after`* parameter
   *
   * @defaultValue `0`
   *
   * @link search_after https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after
   */
  from?: number;
  /**
   * Boosts the *`_score`* of documents from specified indices
   *
   * @link _score https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html#relevance-scores
   */
  indices_boost?: Array<{
    /**
     *
     * `<index>`: `<boost-value>`
     *
     * `<index>` is the name of the index or index alias.
     * Wildcard (`*`) expressions are supported
     *
     * `<boost-value>` is the factor by which scores are multiplied
     *
     * A boost value greater than `1` increases the score. A boost value between `0` and `1` decreases the score
     */
    (index: string): number;
  }>;
  /**
   * Minimum `_score` for matching documents.
   * Documents with a lower `_score` are not included in the search results
   *
   * @link _score https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html#relevance-scores
   */
  min_score?: number;
  /**
   * Defines the search definition using the *Query DSL*
   *
   * @link Query DSL https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html
   */
  query?: any;
  /**
   * If `true`, returns sequence number and primary term of the last modification of each hit.
   *
   * @link Optimistic concurrency control https://www.elastic.co/guide/en/elasticsearch/reference/current/optimistic-concurrency-control.html
   */
  seq_no_primary_term?: boolean;
  /**
   * The number of hits to return.
   *
   * By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters.
   * To page through more hits, use the *`search_after`* parameter
   *
   * @defaultValue `10`
   *
   * @link search_after https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after
   */
  size?: number;
  /**
   * Indicates which source fields are returned for matching documents.
   * These fields are returned in the `hits._source` property of the search response.
   *
   * @defaultValue `true`
   *
   * @link source fields https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-source-field.html
   */
  _source?: /**
   * If `true` the entire document source is returnerd else not
   */
  | boolean
    /**
     * Wildcard (`*`) pattern or array of patterns containing source fields to return.
     */
    | string
    | string[]
    /**
     * Object containing a list of source fields to include or exclude
     */
    | {
        /**
         * Wildcard (`*`) pattern or array of patterns containing source fields to exclude from the response
         *
         * You can also use this property to exclude fields from the subset specified in `includes` property
         */
        excludes: string | string[];
        /**
         * Wildcard (`*`) pattern or array of patterns containing source fields to return
         *
         * If this property is specified, only these source fields are returned. You can exclude fields from this subset using the `excludes` property
         */
        includes: string | string[];
      };
  /**
   * Stats groups to associate with the search.
   * Each group maintains a statistics aggregation for its associated searches.
   * You can retrieve these stats using the *indices stats API*.
   *
   * @link indices stats API https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-stats.html
   */
  stats?: string[];
  /**
   * The maximum number of documents to collect for each shard, upon reaching which the query execution will terminate early.
   *
   * @defaultValue to `0`, which does not terminate query execution early
   */
  terminate_after?: number;
  /**
   * Specifies the period of time to wait for a response.
   * If no response is received before the timeout expires, the request fails and returns an error.
   *
   * @defaultValue to no timeout.
   *
   * @link timeunits https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units
   */
  timeout?: any;
  /**
   * If `true`, returns document version as part of a hit.
   *
   * @defaultValue to `false`
   */
  version?: boolean;
}

/***
 * Several options for this API can be specified using a query parameter or a request body parameter.
 *
 * If both parameters are specified, only the query parameter is used
 */
export interface SearchQueryParams {
  /**
   * If `false`, the request returns an error if any wildcard expression, *index alias*, or `_all` value targets only missing or closed indices.
   * This behavior applies even if the request targets other open indices.
   * For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`
   *
   * @link index alias https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-aliases.html
   */
  allow_no_indices?: boolean;
  /**
   * If `true`, returns partial results if there are request timeouts or *shard failures*. If `false`, returns an error with no partial results.
   * To override the default for this field, set the search.default_allow_partial_results cluster setting to false
   *
   * To override the default for this field, set the `search.default_allow_partial_results` cluster setting to `false`
   *
   * @defaultValue `true`
   *
   * @link shard failures https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-replication.html#shard-failures
   */
  allow_partial_search_results?: boolean;
  /**
   * The number of shard results that should be reduced at once on the coordinating node.
   * This value should be used as a protection mechanism to reduce the memory overhead per search request if the potential number of shards in the request can be large.
   *
   * @defaultValue `512`
   */
  batched_reduce_size?: number;
  /**
   * If `true`, network round-trips between the coordinating node and the remote clusters are minimized when executing cross-cluster search (CCS) requests.
   *
   * @defaultValue `true`
   *
   * @link How cross-cluster search handles network delays https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-cross-cluster-search.html#ccs-network-delays
   */
  css_minimize_roundtrips?: boolean;
  /**
   * A comma-separated list of fields to return as the docvalue representation of a field for each hit.
   */
  docvalue_fields?: boolean;
  /**
   * Controls what kind of indices that wildcard expressions can expand to. Multiple values are accepted when separated by a comma, as in `open`,`hidden`.
   */
  expand_wildcards?: /**
   * Expand to open and closed indices, including hidden indices
   *
   * @defaultValue `open`
   *
   * @link hidden indices https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-index.html#hidden-indices
   */
  | "all"
    /**
     * Expand only to open indices
     */
    | "open"
    /**
     * Expand only to closed indices
     */
    | "closed"
    /**
     * Expansion of wildcards will include hidden indices. Must be combined with `open`, `closed`, or both
     */
    | "hidden"
    /**
     * Wildcard expressions are not accepted
     */
    | "none";
  /**
   * If `true`, returns detailed information about score computation as part of a hit.
   *
   * @defaultValue `false`
   */
  explain?: boolean;
  /**
   * Starting document offset.
   *
   * By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the *search_after* parameter
   *
   * @defaultValue `0`
   *
   * @link search_after https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after
   */
  from?: number;
  /**
   * If `true`, concrete, expanded or aliased indices will be ignored when frozen.
   *
   * @defaultValue `true`
   */
  ignore_throttled?: boolean;
  /**
   * If `true`, missing or closed indices are not included in the response
   *
   * @defaultValue `false`
   */
  ignore_unavailable?: boolean;
  /**
   * Defines the number of concurrent shard requests per node this search executes concurrently.
   * This value should be used to limit the impact of the search on the cluster in order to limit the number of concurrent shard requests
   *
   * @defaultValue `5`
   */
  max_concurrent_shard_request?: number;
  /**
   * Defines a threshold that enforces a pre-filter roundtrip to prefilter search shards based on query rewriting if the number of shards the search request expands to exceeds the threshold.
   * This filter roundtrip can limit the number of shards significantly if for instance a shard can not match any documents based on its rewrite method ie.
   * if date filters are mandatory to match but the shard bounds and the query are disjoint.
   * When unspecified, the pre-filter phase is executed if any of these conditions is met:
   * - The request targets more than `128` shards
   * - The request targets one or more read-only index
   * - The primary sort of the query targets an indexed field
   */
  pre_filter_shard_size?: number;
  /**
   * Nodes and shards used for the search.
   * @defaultValue Elasticsearch selects from eligible nodes and shards using adaptive replica selection, accounting for allocation awareness.
   */
  preference?: /**
   * Run the search only on shards on the local node
   */
  | "_only_local"
    /**
     * If possible, run the search on shards on the local node. If not, select shards using the default method
     */
    | "_local"
    /**
     * Run the search on only the specified nodes IDs.
     * If suitable shards exist on more than one selected nodes, use shards on those nodes using the default method.
     * If none of the specified nodes are available, select shards from any available node using the default method
     *
     * `_only_nodes:<node-id>,<node-id>`
     */
    | "_only_nodes"
    /**
     * If possible, run the search on the specified nodes IDs.
     * If not, select shards using the default method
     *
     * `_prefer_nodes:<node-id>,<node-id>`
     */
    | "_prefer_nodes"
    /**
     * Run the search only on the specified shards.
     * This value can be combined with other preference values, but this value must come first.
     *
     * For example: `_shards:2,3|_local`
     *
     * `_shards:<shard>,<shard>`
     */
    | "_shards"
    /**
     * Any string that does not start with `_`.
     * If the cluster state and selected shards do not change, searches using the same `<custom-string>` value are routed to the same shards in the same order
     *
     * `<custom-string>`
     */
    | string;
  /**
   * Query in the Lucene query string syntax
   *
   * You can use the `q` parameter to run a query parameter search. Query parameter searches do not support the full Elasticsearch *Query DSL* but are handy for testing
   *
   * **The q parameter overrides the query parameter in the request body**
   *
   *  @link Query DSL https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html
   */
  q?: string;
  /**
   * If `true`, the caching of search results is enabled for requests where `size` is `0`. See *Shard request cache settings*.
   *
   * @defaultValue to index level settings
   *
   * @link Shard request cache settings https://www.elastic.co/guide/en/elasticsearch/reference/current/shard-request-cache.html
   */
  request_cache?: boolean;
  /**
   * Indicates whether hits.total should be rendered as an integer or an object in the rest search response.
   *
   * @defaultValue `false`
   */
  rest_total_hits_as_int?: boolean;
  /**
   * Target the specified primary shard
   */
  routing?: string;
  /**
   * Period to retain the *search context* for scrolling.
   *
   * By default, this value cannot exceed `1d` (24 hours).
   * You can change this limit using the `search.max_keep_alive` cluster-level setting
   *
   * @link search context https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#scroll-search-context
   * @link Scroll search results https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#scroll-search-results
   */
  scroll?: any;
  /**
   * How *distributed term frequencies* are calculated for *relevance scoring*
   *
   * @link distributed term frequencies https://en.wikipedia.org/wiki/Tf%E2%80%93idf
   * @link relevance scoring https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html#relevance-scores
   */
  search_type?: /**
   * Distributed term frequencies are calculated locally for each shard running the search.
   * We recommend this option for faster searches with potentially less accurate scoring
   */
  | "query_then_fetch"
    /**
     * Distributed term frequencies are calculated globally, using information gathered from all shards running the search.
     * While this option increases the accuracy of scoring, it adds a round-trip to each shard, which can result in slower searches
     */
    | "dfs_query_then_fetch";
  /**
   * If `true`, returns sequence number and primary term of the last modification of each hit.
   *
   * @link Optimistic concurrency control https://www.elastic.co/guide/en/elasticsearch/reference/current/optimistic-concurrency-control.html
   */
  seq_no_primary_term?: boolean;
  /**
   * Defines the number of hits to return.
   *
   * By default, you cannot page through more than 10,000 hits using the *from* and *size* parameters.
   * To page through more hits, use the *search_after* parameter.
   *
   * @defaultValue `10`
   *
   * @link search_filter https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after
   */
  size?: string;
  /**
   * A comma-separated list of <field>:<direction> pairs
   */
  sort?: string;
  /**
   * Indicates which source fields are returned for matching documents.
   * These fields are returned in the `hits._source` property of the search response.
   *
   * @defaultValue `true`
   *
   * @link source fields https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-source-field.html
   */
  _source?: /**
   * If `true` the entire document source is returned, else not
   */
  | boolean
    /**
     * Comma-separated list of source fields to return. Wildcard (`*`) patterns are supported
     */
    | string;
  /**
   * A comma-separated list of *source fields* to exclude from the response
   *
   * You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter.
   *
   * If the `_source` parameter is `false`, this parameter is ignored
   *
   * @link source fields https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-source-field.html
   */
  _source_excludes?: string;
  /**
   * A comma-separated list of *source fields* to include in the response
   *
   * If this parameter is specified, only these source fields are returned. You can exclude fields from this subset using the `_source_excludes` query parameter
   *
   * If the `_source` parameter is `false`, this parameter is ignored
   *
   * @link source fields https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-source-field.html
   */
  _source_includes?: string;
  /**
   * Specific `tag` of the request for logging and statistical purposes
   */
  stats?: string;
  /**
   * A comma-separated list of stored fields to return as part of a hit.
   * If no fields are specified, no stored fields are included in the response
   *
   * If this field is specified, the `_source` parameter defaults to `false`.
   * You can pass `_source`: `true` to return both source fields and stored fields in the search response
   */
  stored_fields?: string;
  /**
   * Specifies which field to use for suggestions
   */
  suggest_field?: string;
  /**
   * The source text for which the suggestions should be returned
   */
  sugges_text?: string;
  /**
   * The maximum number of documents to collect for each shard, upon reaching which the query execution will terminate early
   *
   * @defaultValue `0` which does not terminate query execution early
   */
  terminate_after?: number;
  /**
   * Specifies the period of time to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
   *
   * @defaultValue to no timeout.
   */
  timeout?: any;
  /**
   * If `true`, calculate and return document scores, even if the scores are not used for sorting.
   *
   * @defaultValue `false`
   */
  track_scores?: boolean;
  /**
   * Number of hits matching the query to count accurately.
   *
   * @defaultValue `10000`
   */
  track_total_hits?: /**
   *
   */
  | number
    /**
     * If `true`, the exact number of hits is returned at the cost of some performance.
     * If `false`, the response does not include the total number of hits matching the query
     */
    | boolean;
  /**
   * If `true`, aggregation and suggester names are be prefixed by their respective types in the response.
   *
   * @defaultValue `true`
   */
  typed_keys?: boolean;
  /**
   * If `true`, returns document version as part of a hit.
   *
   * @defaultValue `false`
   */
  version?: boolean;
}
