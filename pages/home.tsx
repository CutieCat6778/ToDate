import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useUser from "../lib/useUser";

export default function Home({ route, navigation }: any) {
  const [param, _setParam] = useState(route.param);
  const [trigger, _setTrigger] = useState(false);
  const [user, _setUser] = useState(route.param?.user);
  const [{ user: user1, loaded }, _setData] = useState({
    user: {},
    loaded: false,
  })

  const res = useUser({
    origin: "Home",
    navigate: navigation.navigate,
    disableQuery: param ? param.redirected : false,
  });

  useEffect(() => {
    if(!trigger) {
      if(res && res.loaded) _setData(res);
      if(!user && (loaded && user1)) _setUser(user1); 
      if(loaded) _setTrigger(true);
    }
  }, [loaded, res, trigger, user, user1])

  if(loaded && user) {
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
  } else if(!loaded || !user) {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>Error!</Text>
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
