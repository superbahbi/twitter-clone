import { useQuery } from "@tanstack/react-query";
import api from "../Helper/api";

const getTweetsByUserId = async (id: string | undefined) => {
  const url = `/api/tweet/${id}`;
  const { data } = await api.get(url);
  return data;
};

export default function useTweet(id: string | undefined) {
  return useQuery(["tweets", id], () => getTweetsByUserId(id));
}
