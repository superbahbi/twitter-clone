import { useQuery } from "react-query";
import api from "../Helper/api";

const getTweets = async () => {
  const url = "/api/tweet/";
  const { data } = await api.get(url);
  return data;
};

export default function useTweets() {
  return useQuery(["tweets"], getTweets);
}
