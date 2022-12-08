import { UserRes } from "./../types/graphql";
import {
  createHttpLink,
  useLazyQuery,
} from "@apollo/client";
import { useState } from "react";
import { GetSelfGQL, RefreshToken } from "../graphql/auth.graphql";
import { Tokens } from "../types/graphql";
import { getKey, removeTokens, setKey, setToken } from "./localStorage";
interface IProps {
  navigate: Function;
  origin: string;
}


export function updateUser(accessToken: string, redirect: Function, call: any, args: any) {
  const user = getMe(accessToken, call, args);
  if (user) {
    if (user?.error) {
      return redirect("Login");
    } else if(user?.user) {
      setKey("@user_info", user.user);
      return redirect("Home")
    }
  }
}

export default function useUser({ navigate, origin }: IProps) {

  const redirect = function(path: string, params?: any) {
    if(origin != path) {
      navigate(path, { redirected: true, ...params })
    }
  }

  const date = new Date().getTime();

  const [refreshToken, _setRefreshToken] = useState(getKey("@refresh_token"));
  const [accessToken, _setAccessToken] = useState(getKey("@access_token"));
  const [user, _setUser] = useState("@user_info");
  const [refreshTokenExp, _setRefreshTokenExp] = useState(
    getKey("@refresh_token_exp")
  );
  const [accessTokenExp, _setAccessTokenExp] = useState(
    getKey("@access_token_exp")
  );
  const [loggedIn, _setLoggedIn] = useState(getKey("@logged_in"));

  const [queryUser, args] =
  useLazyQuery(GetSelfGQL, {
    context: {
      headers: {
        authorization: accessToken
      }
    }
  });

  console.log(accessToken, refreshToken, loggedIn)

  if (refreshToken && date > refreshTokenExp) {
    setKey("@logged_in", false)
    return redirect("Login");
  }

  if (refreshToken && date > accessTokenExp) {
    setKey("@logged_in", false)
    const res = Refresh(refreshToken);
    if (res && !res.error && res.accessToken) {
      updateUser(res.accessToken, redirect, queryUser, args);
    } else {
      console.log(res?.error)
      return redirect("Login")
    }
  }

  if (
    loggedIn &&
    origin &&
    ["Router", "Login", "Register"].includes(origin) &&
    redirect
  ) {
    return redirect("Home", { redirected: true, user });
  }

  if(!accessToken && !refreshToken) {
    setKey("@logged_in", false)
    return redirect("Login")
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

      setToken({
        accessToken,
        refreshToken
      });

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

export function getMe(accessToken: string, queryUser: any, { loading, called, data, error }: any) {
  if (!called) queryUser();

  if (!loading && called) {
    if (data) {
      const user: UserRes = data.me;
      return { user };
    } else if (!data && error) {
      return {
        error: error,
        user: undefined
      };
    }
  }
}

/*
OLD METHOD

const [refreshToken, _setRefreshToken] = useState(
    getKey("@refresh_token") ?? ""
  );
  const [accessToken, _setAccessToken] = useState(
    getKey("@refresh_token") ?? ""
  );

  const [queryUser, { called, data, loading, error }] = useLazyQuery(
    GetSelfGQL,
    {
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const [
    loadData,
    { called: called1, data: data1, loading: loading1, error: error1 },
  ] = useLazyQuery(RefreshToken, {
    context: {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  });

  if (disableQuery) return null;
  else if (accessToken == "") {
    navigate && origin != "Login" && origin != "Register"
      ? navigate("Login")
      : null;
  } else if (!called && accessToken.length > 2) queryUser();

  const user: User = data?.me;

  if (returnLoggedIn) {
    if (!loading) {
      if (user) {
        return {
          loggedIn: true,
          loaded: true,
        };
      } else if (!user) {
        return {
          loggedIn: false,
          loaded: true,
        };
      }
    } else {
      return {
        loggedIn: false,
        loaded: false,
      };
    }
  }
  if (navigate && called && !loading) {
    if (!user && refreshToken && error?.message == "Unauthorized") {
      if (!called1) loadData();

      if (called1 && !loading1) {
        if (data1) {
          async function refresh() {
            const tokens: Tokens = data1.refreshToken.tokens;
            await AsyncStorage.setItem("@access_token", tokens.accessToken);
            await AsyncStorage.setItem("@refresh_token", tokens.refreshToken);
            const ApolloClient = useApolloClient();
            ApolloClient.link = authLink.concat(httpLink);
            if (origin != "Home" && navigate) {
              setKey("@logged_in", true);
              return navigate("Home", { redirected: true, user: data1.user });
            }
          }
          refresh();
        } else if (!data && origin != "Login" && origin != "Register") {
          setKey("@logged_in", false);
          navigate("Login");
        }
      }
    } else {
      if (user) {
        if (redirectTo && redirectIfFound && origin != redirectTo) {
          setKey("@logged_in", false);
          return navigate(redirectTo, { redirected: true, user: user });
        }
        return {
          user: user?.username ? user : {},
          loaded: true,
        };
      } else if (
        !loading &&
        !user &&
        origin != "Login" &&
        origin != "Register"
      ) {
        setKey("@logged_in", false);
        return navigate("Login");
      }
    }
    if (error) {
      if (
        error.message == "Unauthorized" &&
        origin != "Login" &&
        origin != "Register"
      ) {
        setKey("@logged_in", false);
        return navigate("Login");
      } else if (
        error.message != "Unauthorized" &&
        (origin == "Login" || origin == "Register")
      ) {
        setKey("@logged_in", false);
        return error;
      }
    }
  }

*/
