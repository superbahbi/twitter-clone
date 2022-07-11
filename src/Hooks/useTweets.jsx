import { useQuery } from "react-query";
import api from "../Helper/api";

const getTweets = async () => {
  const { data } = await api.get("/api/tweet");
  return data;
};

export default function useTweets() {
  return useQuery(["tweets"], getTweets);
}
