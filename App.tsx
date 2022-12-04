import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import Router from "./pages/router";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-gesture-handler';

const httpLink = createHttpLink({
  uri: 'http://192.168.178.2:5000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router/>
    </ApolloProvider>
  );
}