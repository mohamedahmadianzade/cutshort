import { QUERY_PAGESIZE } from "./env";

interface BaseInterface {
  success: boolean;
  message?: string;
}

interface SuccessInterface extends BaseInterface {
  data: any;
}

export function success(data: any, message: string = ""): SuccessInterface {
  return {
    success: true,
    data,
    message,
  };
}
export function fail(error: any): BaseInterface {
  return {
    success: false,
    message: error.message,
  };
}

// =============== Hash ====================
// todo
export function hash(password: string): string {
  return password;
}
// =============== Hash ====================

// =============== Pagination ====================
export function pagination(
  page: number = 1,
  pageSize: number | undefined
): PaginationInterface {
  pageSize = pageSize
    ? pageSize
    : QUERY_PAGESIZE;
  return {
    skip: (page - 1) * pageSize,
    limit: pageSize,
  };
}

interface PaginationInterface {
  skip: number;
  limit: number;
}

export interface IPaginations {
  page?: number;
  pageSize?: number;
}

// =============== Pagination ====================
