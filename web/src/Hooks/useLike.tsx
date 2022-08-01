import { useQuery } from "@tanstack/react-query";
import api from "../Helper/api";

const getLikedTweet = async (id: string) => {
  const url = `/api/like/${id}`;
  const { data } = await api.get(url);
  return data;
};

export default function useLike(id: string) {
  return useQuery(["tweets", id], () => getLikedTweet(id));
}
