import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { getKey } from "../lib/localStorage"
import NavBar from "../pageComponents/home/nav.home"

export default function CreateDate({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar user={getKey("@user_info")} navigation={navigation}/>
    </SafeAreaView>
  )
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