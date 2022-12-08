import { gql } from "@apollo/client";

export const LoginGQL = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        username
        email
        biography
        avatar
        displayName
      }
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;

export const RegisterGQL = gql`
  mutation Register($username: String!, $password: String!, $email: String!) {
    signup(createUser: {
      username: $username,
      password: $password,
      email: $email
    }) {
      user {
        username
        email
        biography
        avatar
        displayName
      }
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;

export const GetSelfGQL = gql`
  query {
    me {
      username
      password
      biography
      avatar
      displayName
    }
  }
`;

export const RefreshToken = gql`
  query {
    refreshToken {
      accessToken
      refreshToken
    }
  }
`