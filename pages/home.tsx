import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import useUser from "../lib/useUser";
import Header from "../pageComponents/home/header.home";
import NavBar from "../pageComponents/home/nav.home";

export default function Home({ route, navigation }: any) {
  const [params, _setParams] = useState(route.params);
  const [trigger, _setTrigger] = useState(false);
  const [user, _setUser] = useState(route.params?.user);
  const [{ user: user1, loaded }, _setData] = useState({
    user: {},
    loaded: false,
  })

  const elseStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      margin: 0,
    }
  });

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#000",
      height: "100%",
      flex: 1,
      flexDirection: "column",
      alignItems: "center"
    }
  })

  const res = useUser({
    origin: route.name,
    navigate: navigation.navigate,
    disableQuery: params ? params.redirected : false,
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
        <NavBar user={user} navigation={navigation}/>
        <Header user={user} navigation={navigation}/>
      </View>
    );
  } else if(!loaded || !user) {
    return (
      <View style={elseStyles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    )
  } else {
    return (
      <View style={elseStyles.container}>
        <Text>Error!</Text>
      </View>
    )
  }
}
