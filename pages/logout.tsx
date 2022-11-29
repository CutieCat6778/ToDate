import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View,  Text, StyleSheet } from "react-native";

export default function Logout({ navigation }: any) {
  async function RemoveKeys() {
    const key = await AsyncStorage.getItem("@access_token");
    if(key) {
      AsyncStorage.removeItem("@access_token")
      AsyncStorage.removeItem("@refresh_token")
      AsyncStorage.removeItem("@user_info")
      AsyncStorage.removeItem("@expires_at")
      navigation.navigate("Login", { redirected: true })
    }
  }

  useEffect(() => {
    RemoveKeys();
  })

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Logging out...
      </Text>
    </View>
  )
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