import { useLazyQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import { GetSelfGQL } from "../graphql/auth.graphql";
import { getKey, removeTokens, setKey } from "../lib/localStorage";
import useUser from "../lib/useUser";
import Header from "../pageComponents/home/header.home";
import NavBar from "../pageComponents/home/nav.home";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home({ route, navigation }: any): JSX.Element {
  const [user, _setUser] = useState(
    getKey("@user_info") ?? route?.params?.user
  );
  const [refreshing, setRefreshing] = React.useState(false);

  useUser({
    origin: route.name,
    navigate: navigation.navigate,
  });

  const [query, { called, loading, data, error }] = useLazyQuery(GetSelfGQL, {
    context: {
      headers: {
        authorization: `Bearer ${getKey("@access_token")}`,
      },
    },
  });

  const [hasCalled, _setHasCalled] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    if (refreshing) {
      if (!hasCalled) {
        _setHasCalled(true);
        query();
      }

      if (!loading && hasCalled) {
        if (data) {
          const user = data.me;
          console.log(data.me);
          setKey("@user_info", user);
          _setUser(user);
          setRefreshing(false);
          _setHasCalled(false);
        } else if (!data) {
          console.log(error);
          removeTokens();
          navigation.navigate("Login");
        }
      }
    }
  }, [called, data, error, hasCalled, loading, navigation, query, refreshing]);

  return (
    <SafeAreaView style={styles.root}>
      <NavBar user={user} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#fff"]}
            enabled={true}
            tintColor={"#fff"}
            size={0.2}
          />
        }
        contentContainerStyle={styles.container}
      >
        <Header user={user} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#000",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    height: "100%",
    alignItems: "center",
    width: "100%",
  },
});
