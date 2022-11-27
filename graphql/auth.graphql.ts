import { gql } from "@apollo/client";

export const LoginGQL = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        username
        email
        biography
        avatar
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
    }
  }
`;

export const RefreshToken = gql`
  query {
    refreshToken {
      user {
        username
        email
        biography
        avatar
      }
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`