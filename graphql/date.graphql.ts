import { gql } from "@apollo/client";

export const GetDatesGql = gql`
  query args($username: String!, $duration: String) {
    getDates(username: $username, duration: $duration) {
      dates {
        title
        location
        author
        createdAt
        expireIn
        time
      }
      next {
        title
        location
        author
        createdAt
        expireIn
        time
      }
    }
  }
`