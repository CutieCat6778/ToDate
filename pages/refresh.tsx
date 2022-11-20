import { useEffect, useState } from "react";
import LoginForm from "../components/Form";
import fetchJson, { FetchError } from "../lib/fetchJson";
import useUser from "../lib/useUser";
import { useCookies } from "react-cookie";
import { SensoreUserData } from "../lib/rest.api";
import React from "react";

export default function Refresh() {
  const [authState, setAuthState] = useState({
    token: "",
    expiresAt: "",
    userInfo: "",
  });

  if (typeof window !== "undefined") {
    authState.token == ""
      ? setAuthState({
          token: localStorage.getItem("refreshToken") || "",
          expiresAt: localStorage.getItem("expiresAt") || "",
          userInfo: localStorage.getItem("userInfo") || "",
        })
      : null;
  }

  const setAuthInfo = ({ token, userInfo, expiresAt }: any) => {
    localStorage.setItem("refreshToken", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);

    setAuthState({
      token,
      userInfo,
      expiresAt,
    });
  };

  const [accessToken, setAccessToken, removeAccessToken] = useCookies([
    "accessToken",
  ]);

  const { mutateUser } = useUser({
    redirectTo: "/home",
    redirectIfFound: true,
    accessToken: accessToken.accessToken,
    refreshToken: authState.token,
  });

  async function Fetch() {
    try {
      const data = await fetchJson({
        url: "http://localhost:5000/auth/refresh",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authState.token,
        },
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    try {
      if (!authState.token) {
        return console.log("Error");
      }
      let data;

      (async () => {
        data = await Fetch();
      })();

      console.log(data);

      setAccessToken("accessToken", data.token.accessToken, {
        maxAge: 900,
        path: "/",
      });

      setAuthInfo({
        token: data.token.refreshToken,
        userInfo: SensoreUserData(data.user),
        expiresAt: `${new Date().getTime() + 604800000}`,
      });

      mutateUser(data.user, false);
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  });

  return (
    <div>
      <h1>Hello world!</h1>
    </div>
  );
}
