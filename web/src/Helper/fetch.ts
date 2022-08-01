export async function fetchDB(
  param?: string,
  method?: RequestInit
): Promise<{ status: number; data: Promise<Response> }> {
  const api_url = process.env.REACT_APP_API_URL;
  const response = await fetch(`${api_url}/api${param}`, method);
  return {
    status: response.status,
    data: await response.json(),
  };
}
