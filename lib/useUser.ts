import { User } from "./../types/graphql";
import { useLazyQuery, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { GetSelfGQL, RefreshToken } from "../graphql/auth.graphql";
import { LoginRes, Tokens } from "../types/graphql";
interface IProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
  navigate?: Function;
  returnLoggedIn?: boolean;
  disableQuery?: boolean;
  origin?: string;
}

export default function useUser({
  redirectTo,
  redirectIfFound,
  navigate,
  returnLoggedIn,
  disableQuery,
  origin,
}: IProps) {
  const [refreshToken, _setRefreshToken] = useState("_");
  const [accessToken, _setAccessToken] = useState("_");

  async function ReadData() {
    const refreshT = await AsyncStorage.getItem("@refresh_token");
    const accessT = await AsyncStorage.getItem("@access_token");

    _setRefreshToken(refreshT || "");
    _setAccessToken(accessT || "");
  }

  useEffect(() => {
    if (refreshToken == "_") ReadData();
  });

  const [queryUser, { called, data, loading, error }] = useLazyQuery(
    GetSelfGQL,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
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
        authorization: `Bearer ${refreshToken}`,
      },
    },
  });

  if (disableQuery) return null;
  else if (accessToken == "") {
    navigate && (origin != "Login" && origin != "Register")
      ? navigate("Login", { redirected: true })
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
  if (navigate && refreshToken != "_") {
    if (!loading && !user && refreshToken) {
      if (!called1) loadData();

      if (called1 && !loading1) {
        if (data) {
          const tokens: Tokens = data.refreshToken.tokens;
          AsyncStorage.setItem("@access_token", tokens.accessToken);
          AsyncStorage.setItem("@refresh_token", tokens.refreshToken);
          if (origin != "Home") navigate("Home", { redirected: true });
        } else if (!data && (origin != "Login" && origin != "Register")) {
          navigate("Login", { redirected: true });
        }
      }
    } else {
      if (!loading && user) {
        if (redirectTo && redirectIfFound && origin != redirectTo) {
          return navigate(redirectTo, { redirected: true });
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
        return navigate("Login", { redirected: true });
      }
    }
    if (error) {
      if (
        error.message == "Unauthorized" &&
        (origin != "Login" && origin != "Register")
      )
        return navigate("Login", { redirected: true });
      else if (
        error.message == "Unauthorized" &&
        (origin == "Login" || origin == "Register")
      ) {
        return null;
      } else {
        throw error;
      }
    }
  } else {
    return {
      loaded: false,
    };
  }
}
