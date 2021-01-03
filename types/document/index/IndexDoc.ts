export interface IndexDocArgs {
  docName: string;
  docId?: string;
  requestBody: IndexDocRequestBody;
  queryParams?: IndexDocQueryParams;
}

export interface IndexDocQueryParams {
  if_seq_no?: number;
  if_primary_term?: number;
  op_type?: "index" | "create";
  pipeline?: string;
  refresh?: string;
  routing?: string;
  master_timeout?: any;
  timeout?: any;
  version?: number;
  version_type?: "internal" | "external" | "external_gte";
  wait_for_active_shards?: string;
  require_alias?: boolean;
}

export interface IndexDocRequestBody {
  [field: string]: any;
}

export interface IndexDocResponseBody {
  _shards: {
    total: number;
    successful: number;
    failed: number;
  };
  _index: string;
  _type: string;
  _id: string;
  _version: number;
  _seq_no: number;
  _primary_term: number;
  _result: "created" | "updated";
}
