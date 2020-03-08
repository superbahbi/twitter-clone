

export async function fetchDB(url, method, signal) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api${url}`,
    method,
    { signal }
  );
  return {
    status: response.status,
    data: await response.json()
  };
}
