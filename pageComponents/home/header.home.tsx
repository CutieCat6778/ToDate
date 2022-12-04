import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Calendar from "../../components/Calendar";
import { GetDatesGql } from "../../graphql/date.graphql";
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
  const [title, _setTitle] = useState("");

  const { data, loading, error } = useQuery(GetDatesGql);

  if(!loading) console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} >
        <Text style={styles.greeting}>
          { greeting } {user.displayName}
        </Text>
        <Text style={styles.greetingSub}>
          What is your plan today?
        </Text>
      </View>
      <Calendar user={user}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: "90%",
    alignItems: "center",
    marginTop: 30,
  },
  header: {
    width: "90%",
  },
  greeting: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
    width: "100%",
  },
  greetingSub: {
    color: "#b3b3b3",
    marginLeft: 2,
  },
  calendar: {
    width: "90%",
    backgroundColor: "green"
  }
})