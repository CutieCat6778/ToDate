import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import axios from "axios";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
  accessToken = "",
} = {}) {
  const fetcher = async (url: string) => {
    try {
      const { data } = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      console.log(data)

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
    if (!redirectTo || !user) return;

    console.log(user);

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
