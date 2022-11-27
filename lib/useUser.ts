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

export function Refresh(
  navigate: Function,
  loadData: Function,
  loading: boolean,
  data: any,
  called: boolean
) {}

export default function useUser({
  redirectTo,
  redirectIfFound,
  navigate,
  returnLoggedIn,
  disableQuery,
  origin,
}: IProps) {
  const [refreshToken, _setRefreshToken] = useState("_");

  async function ReadData() {
    const token = await AsyncStorage.getItem("@refresh_token");

    _setRefreshToken(token || "");
  }

  useEffect(() => {
    if (refreshToken == "_") ReadData();
  });

  const { data, loading, error, refetch } = useQuery(GetSelfGQL);

  const [loadData, { called, data: data1, loading: loading1, error: error1 }] =
    useLazyQuery(RefreshToken, {
      context: {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
    });

  const user: LoginRes = data?.me;

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
  } else if (navigate && !disableQuery && refreshToken != "_") {
    if (!loading && !user && refreshToken) {
      if(!called) loadData();

      if (called && !loading1) {
        if (data) {
          const tokens: Tokens = data.refreshToken.tokens;
          AsyncStorage.setItem("@access_token", tokens.accessToken);
          AsyncStorage.setItem("@refresh_token", tokens.refreshToken);
          if(origin != "Home") navigate("Home", { redirected: true });
        } else if (!data && origin != "Login") {
          navigate("Login", { redirected: true });
        }
      }
    } else {
      if (!loading && user) {
        if (redirectTo && redirectIfFound && origin != redirectTo) {
          return navigate(redirectTo, { redirected: true });
        }
        return {
          user: user,
          loaded: true,
        }
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
        origin != "Login" &&
        origin != "Register"
      )
        return navigate("Login", { redirected: true });
      else if (
        error.message == "Unauthorized" &&
        (origin == "Login" || origin == "Register")
      )
        return null;
      else {
        throw error;
      }
    }
  } else return new Error("Unknown error!");
}
