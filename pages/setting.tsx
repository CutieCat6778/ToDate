import { SafeAreaView, Text } from "react-native";
import React from "react"
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Setting({ navigation }: any) {
  return (
    <SafeAreaView>
      <Text>
        Setting
      </Text>
      <TouchableOpacity>
        <Text onPress={() => {
          navigation.navigate("Logout", { redirected: true })
        }}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}