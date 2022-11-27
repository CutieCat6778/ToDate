import { useQuery } from "@apollo/client";
import { LoginGQL } from "../graphql/auth.graphql";

export function LoginQuery(username: string, password: string) {
  const { data, loading, error } = useQuery(LoginGQL, {
    variables: {
      username,
      password
    }
  })

  
  if(!loading && data) {
  } else if(!loading && !data) {
    return { success: false, message: "Incorrect login informations", data: null }
  }
  if(error) {
    throw error;
  }
}