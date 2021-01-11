export interface UpdateByQueryArgs {
  docId?: string;
  requestBody: UpdateByQueryRequestBody;
  queryParams?: UpdateByQueryParams;
}

export interface UpdateByQueryParams {
  allow_no_indices?: boolean;
  analyzer?: string;
  analyzer_wildcard?: boolean;
  conflicts?: "abort" | "proceed";
  default_operator?: string;
  df?: string;
  expand_wildcards?: "all" | "open" | "closed" | "hidden" | "none";
  from?: number;
  ignore_unavaible?: number;
  lenient?: boolean;
  max_docs?: number;
  pipeline?: string;
  preference?: string;
  q?: string;
  request_cache?: boolean;
  refresh?: boolean;
  request_per_second?: number;
  routing?: string;
  scroll?: any;
  scroll_size?: number;
  search_type?: "query_then_fetch" | "dfs_query_then_fetch";
  search_timeout?: any;
  slices?: number;
  sort?: string;
  _source?: string;
  _source_excludes?: string;
  _source_includes?: string;
  stats?: string;
  terminate_after?: number;
  timeout?: any;
  version?: boolean;
  wait_for_active_shards?: string;
}

export interface UpdateByQueryRequestBody {
  query?: any;
  slice?: any;
  script?: any;
}

export interface UpdateByQueryResponseBody {
  took: number;
  timed_out: boolean;
  total: number;
  updated: number;
  deleted: number;
  batches: number;
  version_conflicts: number;
  noops: number;
  retries: number;
  throttled_millis: number;
  requests_per_second: number;
  throttled_until_millis: number;
  failures: any[];
}
