import { UserRes } from "./../types/graphql";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { GetSelfGQL, RefreshToken } from "../graphql/auth.graphql";
import { Tokens } from "../types/graphql";
import { getKey, removeTokens, setKey, setToken } from "./localStorage";
interface IProps {
  navigate: Function;
  origin: string;
}

export function updateUser(
  accessToken: string,
  redirect: Function,
  call: any,
  args: any
) {
  const user = getMe(accessToken, call, args);
  if (user) {
    if (user?.error) {
      console.log("Get me", user.error);
      setKey("@logged_in", false);
      return redirect("Login");
    } else if (user?.user) {
      setKey("@user_info", user.user);
      setKey("@logged_in", true);
      return redirect("Home");
    }
  }
}

export default function useUser({ navigate, origin }: IProps) {
  const redirect = function (path: string, params?: any) {
    if (origin != path) {
      navigate(path, { redirected: true, ...params });
    }
  };

  const date = new Date().getTime();

  const [refreshToken, _setRefreshToken] = useState(getKey("@refresh_token"));
  const [accessToken, _setAccessToken] = useState(getKey("@access_token"));
  const [user, _setUser] = useState(getKey("@user_info"));
  const [refreshTokenExp, _setRefreshTokenExp] = useState(
    getKey("@refresh_token_exp")
  );
  const [accessTokenExp, _setAccessTokenExp] = useState(
    getKey("@access_token_exp")
  );
  const [loggedIn, _setLoggedIn] = useState(getKey("@logged_in"));

  const [queryUser, args] = useLazyQuery(GetSelfGQL, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  if (refreshToken && date > refreshTokenExp) {
    setKey("@logged_in", false);
    return redirect("Login");
  }

  if (refreshToken && date > accessTokenExp) {
    console.log("Refreshing...");
    setKey("@logged_in", false);
    const res = Refresh(refreshToken);
    if (res && !res.error && res.accessToken) {
      console.log("Refreshed", res);
      setToken({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
      _setAccessToken(getKey("@access_token"))
      _setRefreshToken(getKey("@refresh_token"))
      _setAccessTokenExp(getKey("@access_token_exp"))
      _setRefreshTokenExp(getKey("@refresh_token_exp"))
      _setLoggedIn(true)
      updateUser(res.accessToken, redirect, queryUser, args);
    } else {
      console.log("Refresh", res?.error);
      removeTokens();
      setKey("@logged_in", false);
      return redirect("Login");
    }
  }
  if (!user && loggedIn) {
    console.log("User", user);
    updateUser(accessToken, redirect, queryUser, args);
  }

  if (
    loggedIn &&
    origin &&
    ["Router", "Login", "Register"].includes(origin) &&
    redirect
  ) {
    return redirect("Home", { redirected: true, user });
  }

  if (!accessToken && !refreshToken) {
    setKey("@logged_in", false);
    return redirect("Login");
  }
}

export function Refresh(refreshToken: string) {
  const [loadData, { called, data, loading, error }] = useLazyQuery(
    RefreshToken,
    {
      context: {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    }
  );

  if (!called) loadData();

  if (!loading) {
    if (data) {
      const { accessToken, refreshToken }: Tokens = data.refreshToken;

      return {
        accessToken,
        refreshToken,
        error: undefined,
      };
    }
    if (!data) {
      return {
        accessToken: undefined,
        refreshToken: undefined,
        error: error,
      };
    }
  }
}

export function getMe(
  accessToken: string,
  queryUser: any,
  { loading, called, data, error }: any
) {
  if (!called) queryUser();

  if (!loading && called) {
    if (data) {
      const user: UserRes = data.me;
      return { user };
    } else if (!data && error) {
      return {
        error: error,
        user: undefined,
      };
    }
  }
}