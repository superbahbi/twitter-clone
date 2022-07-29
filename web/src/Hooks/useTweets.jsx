import { useQuery } from "react-query";
import api from "../Helper/api";

export function useTweets() {
  const getTweets = async () => {
    const url = "/api/tweet/";
    const { data } = await api.get(url);
    return data;
  };
  return useQuery(["tweets"], getTweets);
}
