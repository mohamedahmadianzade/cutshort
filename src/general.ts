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

//=============== Hash ====================
//todo
export function hash(password: string): string {
  return password;
}
//=============== Hash ====================

//=============== Pagination ====================
export function pagination(
  page: number = 1,
  pageSize: number | undefined
): PaginationInterface {
  pageSize = pageSize
    ? pageSize
    : process.env.QUERY_PAGESIZE
    ? parseInt(process.env.QUERY_PAGESIZE)
    : 10;
  return {
    skip: (page - 1) * pageSize,
    limit: pageSize,
  };
}

interface PaginationInterface {
  skip: number;
  limit: number;
}

//=============== Pagination ====================
