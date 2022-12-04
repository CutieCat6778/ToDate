import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import useUser from "../lib/useUser";
import Header from "../pageComponents/home/header.home";
import NavBar from "../pageComponents/home/nav.home";

export default function Home({ route, navigation }: any) {
  const [params, _setParams] = useState(route.params);
  const [loading, _setLoading] = useState(true);
  const [user, _setUser] = useState(route.params?.user);

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

  useUser({
    origin: route.name,
    navigate: navigation.navigate,
    disableQuery: params ? params.redirected : false,
  });

  useEffect(() => {
    async function getUserInfo() {
      const userInfoString = await AsyncStorage.getItem("@user_info");
      const userInfo = JSON.parse(userInfoString || "{}");
      _setUser(userInfo);
      _setLoading(false);
    }
    getUserInfo();
  })

  if(!loading && user) {
    return (
      <View style={styles.container}>
        <NavBar user={user} navigation={navigation}/>
        <Header user={user} navigation={navigation}/>
      </View>
    );
  }
  if(!loading && !user) {
    navigation.navigate("Login", { redirected: true })
  } else {
    return (
      <View style={elseStyles.container}>
        <Text>Error!</Text>
      </View>
    )
  }
}
