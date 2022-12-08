import { Settings } from "react-native";
import { Tokens, UserRes } from "../types/graphql";

export function setKey(key: string, value: any) {
  const target = Settings.get(key);
  if (target && target == value) return target;

  const data: any = {};
  data[key] = value;

  Settings.set(data);

  return Settings.get(key);
}

export function getKey(key: string) {
  const data = Settings.get(key);

  return data;
}

export function removeKey(key: string) {
  try {
    const target = getKey(key);
    if (!target) return true;

    const data: any = {};
    data[key] = "";

    Settings.set(data);

    return true;
  } catch (e) {
    throw e;
  }
}

export function setAuthInfo(user: UserRes) {
  const date = new Date().getTime();

  setKey("@access_token", user.tokens.accessToken);
  setKey("@refresh_token", user.tokens.refreshToken);
  setKey("@refresh_token_exp", date + 604800000);
  setKey("@user_info", user.user);
  setKey("@access_token_exp", date + 1000 * 60 * 15);
  setKey("@logged_in", true);
}

export function setToken(tokens: Tokens) {
  const date = new Date().getTime();

  setKey("@access_token", tokens.accessToken);
  setKey("@refresh_token", tokens.refreshToken);
  setKey("@refresh_token_exp", date + 604800000);
  setKey("@access_token_exp", date + 1000 * 60 * 15);
  setKey("@logged_in", true);
}

export function removeTokens() {
  
  console.log("Removed token")

  removeKey("@access_token");
  removeKey("@refresh_token");
  removeKey("@user_info");
  removeKey("@expires_at");
  setKey("@logged_in", false)
}