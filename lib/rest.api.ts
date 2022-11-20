import { UserInterface, SensoredUserInterface } from './../types/user';
import axios from "axios";

export async function GetToken(username: string, password: string) {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:5000/";

  const { data } = await axios.post(backendUrl + "auth/login", {
    username,
    password,
  });

  return data;
}

export function SensoreUserData(user: UserInterface): SensoredUserInterface {
  const { _id, password, salt, refreshToken, __v, ...sensoredUser } = user;
  return sensoredUser
}