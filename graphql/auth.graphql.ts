import { gql } from "@apollo/client";

export const Login = gql`
  query Login($username: username, $password: password) {
    login(username: $username, password: $password) {
      user {
        username
        email
      }
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;

export const GetSelf = gql`
  query {
    me {
      username
      password
    }
  }
`;
