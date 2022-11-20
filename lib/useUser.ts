import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import axios from "axios";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
  accessToken = "",
  refreshToken = "",
} = {}) {
  const fetcher = async (url: string) => {
    try {
      const { data } = await axios.post(
        url,
        {
          name: "thinh",
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      console.log(data);

      return data;
    } catch (e) {
      return null;
    }
  };

  const { data: user, mutate: mutateUser } = useSWR(
    "http://localhost:5000/user/@me",
    fetcher
  );

  useEffect(() => {
    if (!user && refreshToken) {
      const { pathname } = Router;
      if(pathname != "refresh") Router.push("/refresh");
    }

    console.log("Fetched", user);

    if (redirectTo && redirectIfFound) {
      Router.push(redirectTo);
    }
    if (!redirectTo || !user) return;
  }, [user, redirectIfFound, redirectTo, refreshToken]);

  return { user, mutateUser };
}
