import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getKey } from "../lib/localStorage";
import useUser from "../lib/useUser";
import Header from "../pageComponents/home/header.home";
import NavBar from "../pageComponents/home/nav.home";

export default function Home({ route, navigation }: any): JSX.Element {
  const [user, _setUser] = useState(getKey("@user_info") ?? route?.params?.user);

  useUser({
    origin: route.name,
    navigate: navigation.navigate,
  });

  return (
    <View style={styles.container}>
      <NavBar user={user} navigation={navigation}/>
      <Header user={user} navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  }
})