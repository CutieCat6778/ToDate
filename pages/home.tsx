import { useState } from "react";
import { View, Text } from "react-native";
import useUser from "../lib/useUser";

export default function Home({ route, navigation }: any) {
  const [param, _setParam] = useState(route.param);

  useUser({
    origin: "Home",
    navigate: navigation.navigate,
    disableQuery: param ? param.redirected : false,
  });

  return (
    <View>
      <Text>Home!</Text>
    </View>
  );
}
