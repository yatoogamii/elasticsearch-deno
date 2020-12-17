export interface DeleteByIdArgs {
  docName: string;
  docId: string;
  queryParams?: DeleteByIdQueryParams;
}

export interface DeleteByIdQueryParams {
  if_seq_no?: number;
  if_primary_term?: number;
  pipeline?: string;
  refresh?: boolean | "wait_for";
  routing?: string;
  master_timeout?: any;
  timeout?: any;
  version?: number;
  version_type?: "internal" | "external" | "external_gte";
  wait_for_active_shards?: string;
}

export interface DeleteByIdResponseBody {
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
