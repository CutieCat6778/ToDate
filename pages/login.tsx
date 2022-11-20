import { useState } from "react";
import LoginForm from "../components/Form";
import fetchJson, { FetchError } from "../lib/fetchJson";
import useUser from "../lib/useUser";
import { useCookies } from "react-cookie";
import { parseCookies } from "../lib/cookie";
import { SensoreUserData } from "../lib/rest.api";

export default function Login({ data }: any) {
  let token = "";
  let userInfo = "";
  let expiresAt = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("refreshToken") || "";
    userInfo = localStorage.getItem("userInfo") || "";
    expiresAt = localStorage.getItem("expiresAt") || "";
  }

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

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

  const [accessToken, setAccessToken] = useCookies(["accessToken"]);

  const { mutateUser } = useUser({
    redirectTo: "/home",
    redirectIfFound: true,
    accessToken: accessToken.accessToken,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="text-center">
        <h1 className="nav-a w-auto text-center text-5xl mb-4 p-2">
          Enter your information!
        </h1>
        <LoginForm
          errorMessage={errorMessage}
          onSubmit={async function handleSubmit(event): Promise<any> {
            event.preventDefault();

            const body = {
              username: event.currentTarget.username.value,
              password: event.currentTarget.password.value,
            };

            try {
              const data = await fetchJson({
                url: "http://localhost:5000/auth/login",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                data: body,
              });

              console.log(data);

              if (!data.success) {
                throw new Error(data.name);
              }

              setAccessToken("accessToken", data.token.accessToken, {
                secure: true,
                maxAge: 900,
                httpOnly: true,
              });

              setAuthInfo({
                token: data.token.refreshToken,
                userInfo: SensoreUserData(data.user),
                expiresAt: `${new Date().getTime() + 604800000}`,
              });

              mutateUser(data.user, false);
            } catch (error) {
              if (error instanceof FetchError) {
                setErrorMessage(error.data.name);
              } else {
                console.error("An unexpected error happened:", error);
              }
            }
          }}
        />
      </div>
    </div>
  );
}

Login.getInitialProps = async ({ req, res }: any) => {
  const data = parseCookies(req);

  return {
    data: data && data,
  };
};
