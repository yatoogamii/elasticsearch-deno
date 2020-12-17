export interface DeleteByQueryArgs {
  docName: string;
  requestBody?: DeleteByQueryRequestBody;
  queryParams?: DeleteByQueryQueryParams;
}

export interface DeleteByQueryQueryParams {
  allow_no_indices?: boolean;
  analyzer?: string;
  analyze_wildcard?: boolean;
  conflicts?: string;
  default_operator?: string;
  df?: string;
  expand_wildcards?: "all" | "open" | "closed" | "hidden" | "none";
  from?: number;
  ignore_unavailable?: boolean;
  lenient?: boolean;
  max_docs?: number;
  preference?: string;
  q?: string;
  request_cache?: boolean;
  refresh?: boolean | "wait_for";
  request_per_second?: number;
  routing?: string;
  scroll?: any;
  scroll_size?: number;
  search_type?: string;
  search_timeout?: any;
  slices?: number;
  sort?: string;
  _source?: string;
  _source_excludes?: string;
  _source_incldues?: string;
  stats?: string;
  terminate_after?: number;
  master_timeout?: any;
  timeout?: any;
  version?: boolean;
  wait_for_active_shards?: string;
}

export interface DeleteByQueryRequestBody {
  query?: any;
}

export interface DeleteByQueryResponseBody {
  took: number;
  timed_out: boolean;
  total: number;
  deleted: number;
  batches: number;
  version_conflicts: number;
  noops: number;
  retries: {
    bulk: number;
    search: number;
  };
  throttled_millis: number;
  requests_per_second: number;
  throttled_until_millis: number;
  failures: any[];
}
