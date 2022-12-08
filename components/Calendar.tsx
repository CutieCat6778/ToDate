import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Date as DateModel, Dates, User } from "../types/graphql";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetDatesGql } from "../graphql/date.graphql";
import { getKey } from "../lib/localStorage";
import Icon from "react-native-vector-icons/FontAwesome";
import * as moment from "moment";
import Avatar from "./Avatar";

interface IProps {
  user: User;
  navigate: any;
}

const Col = ({ children }: any) => {
  return <SafeAreaView style={styles.col}>{children}</SafeAreaView>;
};

interface EProps {
  name: "_1row" | "_2row" | "1row" | "2row";
  children: any;
}

interface ResData {
  res?: DateModel;
  redirect: any;
}

const Row = ({ name, children }: EProps) => {
  return <SafeAreaView style={styles[name]}>{children}</SafeAreaView>;
};

const Date1 = ({ res, redirect }: ResData) => {
  const [user, _setUser] = useState<User>(getKey("@user_info"));

  if (res) {
    const time = res.time + res.createdAt;

    return (
      <Row name="1row" key={res._id + "row"}>
        <View style={styles.eventBox}>
          <Text style={styles.eventTitle}>{res.title}</Text>
          <View style={styles.detailBox}>
            <Text style={styles.eventTime}>
              {moment.default(time).fromNow()} | Villingen-Schwenningen
            </Text>
          </View>
          <View style={styles.avatarBox}>
            <Avatar
              url={user.avatar?.toString()}
              width={70}
              height={70}
              style={styles.avatar}
            />
          </View>
        </View>
      </Row>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          redirect("CreateDate");
        }}
      >
        <Row name="1row">
          <View style={styles.eventBox}>
            <View style={styles.eventSubBox}>
              <Text style={styles.eventSub}>Add event</Text>
              <Icon name="plus" size={30} />
            </View>
          </View>
        </Row>
      </TouchableOpacity>
    );
  }
};

const Date2 = ({ res, redirect }: ResData) => {
  const [user, _setUser] = useState<User>(getKey("@user_info"));

  if (res) {
    const time = res.time + res.createdAt;

    return (
      <Row name="2row" key={res._id + "row"}>
        <View style={styles.eventBox}>
          <Text style={styles.eventTitle}>{res.title}</Text>
          <View style={styles.detailBox}>
            <Text style={styles.eventTime}>
              {moment.default(time).fromNow()} - Villingen-Schwenningen
            </Text>
          </View>
          <View style={styles.avatarBox}>
            <Avatar
              url={user.avatar?.toString()}
              width={70}
              height={70}
              style={styles.avatar}
            />
          </View>
        </View>
      </Row>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          redirect("CreateDate");
        }}
      >
        <Row name="2row">
          <View style={styles.eventBox}>
            <View style={styles.eventSubBox}>
              <Text style={styles.eventSub}>Create event</Text>
              <Icon name="plus" size={30} />
            </View>
          </View>
        </Row>
      </TouchableOpacity>
    );
  }
};

export default function Calendar({ user, navigate }: IProps) {
  const [res, setRes] = useState<Dates>();

  const { data, loading, error } = useQuery(GetDatesGql, {
    context: {
      headers: {
        authorization: `Bearer ${getKey("@access_token")}`,
      },
    },
    variables: {
      username: user.username,
    },
  });

  if (!loading) {
    if (!res)
      setRes({
        dates: data?.getDates?.dates,
        next: data?.getDates?.next,
      });

    return (
      <View style={styles.container}>
        <Col>
          <Row name="_1row">
            <Text style={styles.title}>Today</Text>
            <View></View>
          </Row>
          {res?.dates && res.dates.length > 0
            ? res.dates.map((a, index) => {
                return <Date1 res={a} key={index} redirect={navigate} />;
              })
            : null}
          <Date1 redirect={navigate} />
        </Col>
        <Col>
          <Row name="_2row">
            <Text style={styles.title}>Later</Text>
          </Row>
          {res?.next && res.next.length > 0
            ? res.next.map((a, index) => {
                return <Date2 res={a} key={index} redirect={navigate} />;
              })
            : null}
          <Date2 redirect={navigate} />
        </Col>
      </View>
    );
  } else {
    console.log("Calendar", error);
    return null;
  }
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
    width: "50%",
  },
  _1row: {
    backgroundColor: "#b6e2d3",
    borderTopLeftRadius: 10,
    borderEndColor: "#000",
    borderRightColor: "#000",
    borderBottomWidth: 1,
    borderRightWidth: 0.5,
  },
  _2row: {
    backgroundColor: "#ef7c8e",
    borderTopRightRadius: 10,
    borderEndColor: "#000",
    borderBottomWidth: 1,
    borderLeftColor: "#000",
    borderLeftWidth: 0.5,
  },
  "1row": {
    backgroundColor: "#b6e2d3",
    borderEndColor: "#000",
    borderRightColor: "#000",
    borderBottomWidth: 1,
    borderRightWidth: 0.5,
  },
  "2row": {
    backgroundColor: "#ef7c8e",
    borderEndColor: "#000",
    borderBottomWidth: 1,
    borderLeftColor: "#000",
    borderLeftWidth: 0.5,
  },
  eventBox: {
    padding: 10,
  },
  eventTitle: {
    fontSize: 20,
    opacity: 0.7,
    fontWeight: "600",
  },
  eventTime: {
    fontSize: 12,
    opacity: 0.5,
    fontWeight: "500",
  },
  eventLocation: {
    fontSize: 12,
    opacity: 0.5,
    fontWeight: "500",
  },
  detailBox: {
    flexDirection: "row",
    maxWidth: "80%",
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 0,
  },
  avatarBox: {
    marginTop: 5,
  },
  eventSubBox: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
    opacity: 0.5,
    // backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
  },
  eventSub: {
    fontSize: 14,
    marginLeft: 8,
  },
  title: {
    color: "rgb(0, 0, 0, 250)",
    opacity: 0.6,
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
});
