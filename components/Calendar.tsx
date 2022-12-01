import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { User } from "../types/graphql";
import React from "react";

interface IProps {
  user: User;
}

const Col = ({ children }: any) => {
  return <SafeAreaView style={styles.col}>{children}</SafeAreaView>;
};

interface EProps {
  name: "1row" | "2row";
  children: any;
}

const Row = ({ name, children }: EProps) => {
  return <SafeAreaView style={styles[name]}>{children}</SafeAreaView>;
};

export default function Calendar({ user }: IProps) {

  return (
    <View style={styles.container}>
      <Col>
        <Row name="1row">
          <Text style={styles.title}>
            Today
          </Text>
          <View>
          </View>
        </Row>
      </Col>
      <Col>
        <Row name="2row">
          <Text style={styles.title}>
            Later
          </Text>
        </Row>
      </Col>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "space-around",
    width: "100%",
    flexDirection: "row",
    height: "auto",
    marginTop: 20,
  },
  col: {
    flexDirection: "column",
    width: "50%"
  },
  "1row": {
    backgroundColor: "#b6e2d3",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  "2row": {
    backgroundColor: "#ef7c8e",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: "rgb(0, 0, 0, 250)",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
});
