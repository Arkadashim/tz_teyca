export function buildQuery(data: any) {
  return new URLSearchParams(data).toString();
}
