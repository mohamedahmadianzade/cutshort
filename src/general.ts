export function success(data: any, message?: string) {
  return {
    success: true,
    data,
    message,
  };
}
export function fail(error: any) {
  return {
    success: false,
    message: error.message,
  };
}
