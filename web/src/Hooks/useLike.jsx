import { useQuery } from "react-query";
import api from "../Helper/api";

const getLikedTweet = async (id) => {
  const url = `/api/like/${id}`;
  console.log(url);
  //   const { data } = await api.get(url);
  return null;
};

export default function useLike(id) {
  return useQuery(["tweets", id], () => getLikedTweet(id));
}
