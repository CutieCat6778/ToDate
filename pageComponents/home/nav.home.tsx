import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ResolveImage } from "../../lib/image";
import { User } from "../../types/graphql";
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
  user: User;
  navigation: any
}

export default function NavBar({ user, navigation }: IProps) {

  const styles = StyleSheet.create({
    container: {
      marginTop: 60,
      flex: 0,
      justifyContent: "space-between",
      alignItems: "center",
      maxHeight: 60,
      flexDirection: "row",
      width: "90%"
    },
    avatar: {
      height: 50,
      width: 50,
      borderRadius: 100,
      backgroundColor: "#fff"
    }
  })

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: ResolveImage(user.avatar ? user.avatar : "https://cdn.thinh.tech/avatar.png", 70, 70),
          }}
          style={styles.avatar}
        />
      </View>
      <View>
        <TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.push("Setting")
          }}>
            <Icon name="bars" size={30} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}
