export async function fetchDB(param, method, signal) {
  let api_url =
    process.env.REACT_APP_API_URL || "https://yetanothertwitter.herokuapp.com";
  console.log(api_url);
  const response = await fetch(`${api_url}/api${param}`, method, { signal });
  return {
    status: response.status,
    data: await response.json()
  };
}
