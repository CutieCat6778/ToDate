import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Calendar from "../../components/Calendar";
import { User } from "../../types/graphql";


export function GreetingResolver(hour: number) {

  hour = hour + 1

  if(hour > 5 && hour < 12) {
    return "Good morning, "
  } else if(hour >= 12 && hour < 18) {
    return "Good afternoon, "
  } else if(hour > 17 && (hour - 12) < 13) {
    return "Good evening, "
  } else if(hour > 0 && hour < 6) {
    return "Good night, "
  }
}

interface IProps {
  user: User;
  navigation: any;
}

export default function Header({ user, navigation }: IProps) {
  const [greeting, _setGreeting] = useState<string>(GreetingResolver(new Date().getUTCHours()) || "Hello, ");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          { greeting } {user.displayName}
        </Text>
      </View>
      <Calendar user={user}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    marginTop: 30,
  },
  header: {
    width: "100%",
    marginTop: 10,
  },
  greeting: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    width: "100%",
    marginHorizontal: 10,
  },
  calendar: {
    width: "90%",
    backgroundColor: "green"
  }
})