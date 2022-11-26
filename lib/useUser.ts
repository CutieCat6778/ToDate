import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { GetSelf, Login } from "../graphql/auth.graphql";

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

  if(disableQuery) return null;

  const [authState, _setAuthState] = useState({
    refreshToken: {
      token: "",
      expiresAt: "",
    },
    accessToken: "",
    userInfo: {},
    changed: false,
  });

  async function ReadData() {
    const refreshToken = await AsyncStorage.getItem("@refresh_token");
    const expiresAt = await AsyncStorage.getItem("@expires_at");
    const accessToken = await AsyncStorage.getItem("@access_token");
    const userInfo = await AsyncStorage.getItem("@user_info");

    _setAuthState({
      refreshToken: {
        token: refreshToken || "_",
        expiresAt: expiresAt || "_",
      },
      accessToken: accessToken || "_",
      userInfo: JSON.parse(userInfo ? userInfo : "{}"),
      changed: true,
    });
  }

  if (authState.refreshToken.token == "" && !authState.changed) ReadData();

  const {
    data: user,
    loading,
    error,
    refetch,
  } = useQuery(GetSelf, {
    context: {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    },
  });
  if (authState.changed) {
    if (returnLoggedIn) {
      if (!loading && user)
        return {
          loggedIn: true,
          loaded: true,
        };
      else if (!loading && !user)
        return {
          loggedIn: false,
          loaded: true,
        };
      else
        return {
          loggedIn: false,
          loaded: true,
        };
    } else if (navigate) {
      if (error) {
        if (error.message == "Unauthorized" && origin != "Login") return navigate("Login", { redirected: true });
        else if(error.message == "Unauthorized" && origin == "Login") return null;
        else {
          throw error;
        }
      }
      if (!loading && user) {
        useEffect(() => {
          if (!user && authState.refreshToken.token) {
            return navigate("Refresh", { redirected: true });
          }

          if (redirectTo && redirectIfFound && origin != redirectTo) {
            return navigate(redirectTo, { redirected: true });
          }
          if (!redirectTo || !user) return;
        }, [user, redirectIfFound, redirectTo]);
      }
      if (!loading && !user && origin != "Login") {
        return navigate("Login", { redirected: true });
      }

      return {
        accessToken: authState.accessToken,
        refreshToken: authState.refreshToken,
        userInfo: authState.userInfo,
        loaded: true,
      };
    } else return new Error("Unknown error!");
  } else return new Error("Unknown error!");
}
