import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { removeTokens, setKey } from "../lib/localStorage";

export default function Logout({ navigation, route }: any) {
  useEffect(() => {
    if(route?.params?.clear) removeTokens();
    navigation.navigate("Login", { redirected: true });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Logging out...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
    color: "#fff",
  },
});
