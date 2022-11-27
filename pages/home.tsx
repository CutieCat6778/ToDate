import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useUser from "../lib/useUser";

export default function Home({ route, navigation }: any) {
  const [param, _setParam] = useState(route.param);

  const { user, loaded } = useUser({
    origin: "Home",
    navigate: navigation.navigate,
    disableQuery: param ? param.redirected : false,
  });

  if(loaded) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Logout", { redirected: true });
          }}
        >
          <Text style={styles.subtitle} >Logout from here</Text>
        </TouchableOpacity>
        <Text>
          Hello, {user.username}
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    )
  }
  
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
