import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import Router from "./pages/router";
import { setContext } from '@apollo/client/link/context';
import 'react-native-gesture-handler';
import { getKey } from "./lib/localStorage";

const httpLink = createHttpLink({
  uri: 'http://192.168.178.2:5000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router/>
    </ApolloProvider>
  );
}