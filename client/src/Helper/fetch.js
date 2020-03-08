import formurlencoded from "form-urlencoded";

export async function fetchDB(url, method, data) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api${url}`, {
    method: method,
    headers: {
      Accept: "application/x-www-form-urlencoded",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formurlencoded(data)
  });
  return {
    status: response.status,
    data: await response.json()
  };
}
