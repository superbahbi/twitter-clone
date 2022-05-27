export async function fetchDB(param, method, signal) {
  const api_url = process.env.REACT_APP_API_URL;
  const response = await fetch(`${api_url}/api${param}`, method, { signal });
  return {
    status: response.status,
    data: await response.json()
  };
}
