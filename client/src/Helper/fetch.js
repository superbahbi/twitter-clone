export async function fetchDB(param, method, signal) {
  console.log(api_url);
  const response = await fetch(
    `https://yetanothertwitter.herokuapp.com/api${param}`,
    method,
    { signal }
  );
  return {
    status: response.status,
    data: await response.json()
  };
}
