import React from "react";
import Home from "./home";
import Login from "./login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./register";
import Logout from "./logout";
import { StatusBar } from "expo-status-bar";
import Setting from "./setting";
import { getKey } from "../lib/localStorage";

const Stack = createNativeStackNavigator();
export default function Router() {
  return (
    <NavigationContainer>
      <StatusBar style="light"/>
      <Stack.Navigator
        initialRouteName={getKey("@logged_in") == true ? "Home" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Setting" component={Setting}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}