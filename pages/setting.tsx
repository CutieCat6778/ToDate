import { Button, Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import React from "react"

export default function Setting({ navigation }: any) {

  function redirect() {
    navigation.navigate("Logout", { clear: true })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Setting
      </Text>
      <Pressable>
        <Button title="Logout"  onPress={redirect}/>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 24,
  }
})