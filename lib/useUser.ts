/* eslint-disable react-hooks/rules-of-hooks */
import { User } from "./../types/graphql";
import { createHttpLink, useApolloClient, useLazyQuery, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { GetSelfGQL, RefreshToken } from "../graphql/auth.graphql";
import { Tokens } from "../types/graphql";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://192.168.178.2:5000/graphql',
});

interface IProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
  navigate?: Function;
  returnLoggedIn?: boolean;
  disableQuery?: boolean;
  origin?: string;
}

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


export default function useUser({
  redirectTo,
  redirectIfFound,
  navigate,
  returnLoggedIn,
  disableQuery,
  origin,
}: IProps) {

  if(disableQuery) return {
    loaded: true
  };

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
          "Authorization": `Bearer ${accessToken}`,
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
        "Authorization": `Bearer ${refreshToken}`,
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
  if (navigate && refreshToken != "_" && called && !loading) {
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
            if (origin != "Home" && navigate) return navigate("Home", { redirected: true, user: data1.user });
          }
          refresh();
        } else if (!data && (origin != "Login" && origin != "Register")) {
          navigate("Login", { redirected: true });
        }
      }
    }else {
      if (user) {
        if (redirectTo && redirectIfFound && origin != redirectTo) {
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
        error.message != "Unauthorized" &&
        (origin == "Login" || origin == "Register")
      ) {
        return error;
      }
    }
  }
}
