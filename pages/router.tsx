import React from "react";
import Home from "./home";
import Login from "./login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useUser from "../lib/useUser";
import { View, Text} from "react-native";
import SizedBox from "../components/SizedBox";

const Stack = createNativeStackNavigator();

export default function Router() {
  const { loggedIn, loaded } = useUser({
    returnLoggedIn: true,
  });

  if(loaded) return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={loggedIn ? "Home" : "Login"} screenOptions={{headerShown: false,}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
  else return (
    <View>
      <Text>
        Loading...
      </Text>
    </View>
  )
}
