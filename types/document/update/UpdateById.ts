export interface UpdateByIdArgs {
  docId: string;
  requestBody: UpdateByIdRequestBody;
  queryParams?: UpdateByIdQueryParams;
}

export interface UpdateByIdQueryParams {
  if_seq_no?: number;
  if_primary_term?: number;
  lang?: string;
  require_alies?: boolean;
  refresh?: "wait_for" | boolean;
  retry_on_conflict?: number;
  routing?: string;
  _source?: string[] | boolean;
  _source_excludes?: string[];
  _source_includes?: string[];
  timeout?: any;
  wait_for_active_shards?: string;
}

export interface UpdateByIdRequestBody {
  script?: any;
  doc?: any;
  detect_noop?: boolean;
  upsert?: any;
  scripted_upsert?: boolean;
  doc_as_upsert?: boolean;
}

export interface UpdateByIdResponseBody {
  _shards: {
    total: number;
    failed: number;
    successful: number;
  };
  _index: string;
  _type: string;
  _id: string;
  _version: number;
  _primary_term: number;
  _seq_no: number;
  result: "created" | "updated";
}
