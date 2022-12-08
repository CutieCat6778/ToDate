import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { User } from "../../types/graphql";
import Icon from 'react-native-vector-icons/FontAwesome';
import Avatar from "../../components/Avatar";

interface IProps {
  user: User;
  navigation: any
}

export default function NavBar({ user, navigation }: IProps) {

  const styles = StyleSheet.create({
    container: {
      marginTop: 60,
      justifyContent: "space-between",
      alignItems: "center",
      maxHeight: 60,
      flexDirection: "row",
      width: "90%"
    },
    avatar: {
      height: 30,
      width: 30,
      borderRadius: 100,
      backgroundColor: "#fff"
    },
    title: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 24
    }
  })

  return (
    <View style={styles.container}>
      <View>
        <Avatar url={user.avatar ? user.avatar : "https://cdn.thinh.tech/avatar.png"} height={70} width={70} style={styles.avatar}/>
      </View>
      <View>
        <Text style={styles.title} >
          ToDate.
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.push("Setting")
          }}>
            <Icon name="bars" size={28} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}
