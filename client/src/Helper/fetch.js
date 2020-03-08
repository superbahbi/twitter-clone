export async function fetchDB(url, method, signal) {
  let api_url = `${process.env.REACT_APP_API_URL}/api${url}`;
  console.log(api_url);
  const response = await fetch(api_url, method, { signal });
  return {
    status: response.status,
    data: await response.json()
  };
}
