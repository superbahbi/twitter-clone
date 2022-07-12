import { useQuery } from "react-query";
import api from "../Helper/api";

const getTweetsByUserId = async (id) => {
  const url = `/api/tweet/${id}`;
  const { data } = await api.get(url);
  return data;
};

export default function useTweet(id) {
  return useQuery(["tweets", id], () => getTweetsByUserId(id));
}
