import React, { useEffect } from "react";
import Home from "./home";
import Login from "./login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useUser from "../lib/useUser";
import { View, Text } from "react-native";
import Register from "./register";
import Logout from "./logout";

const Stack = createNativeStackNavigator();

export default function Router() {
  const { loggedIn, loaded } = useUser({
    returnLoggedIn: true,
    disableQuery: false,
  });


  if (loaded == true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={loggedIn ? "Home" : "Login"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Logout" component={Logout} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
}
