import React, { useEffect } from "react";
import Home from "./home";
import Login from "./login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useUser from "../lib/useUser";
import { View, Text, StyleSheet } from "react-native";
import Register from "./register";
import Logout from "./logout";

const Stack = createNativeStackNavigator();

export default function Router() {
  const { loggedIn, loaded } = useUser({
    origin: "Router",
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
      <View style={styles.container}>
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
  },
});
