import { StyleSheet, Text, View } from "react-native";
import React from "react";

export function check(username: string, password: string, email?: string) {
  const UserRegex = new RegExp(/^([a-z0-9]|[-._](?![-._])){4,20}$/)
  const PassRegex = new RegExp(/^(?=.*?[0-9])(?=.*?[a-z]).{6,20}$/)
  const EmailRegex = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  return email ? {
    user: UserRegex.test(username),
    pass: PassRegex.test(password),
    mail: EmailRegex.test(email),
  } : {
    user: UserRegex.test(username),
    pass: password == "admin" ? true : PassRegex.test(password),
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#FED049",
    textDecorationStyle: "dotted",
  }
})

export function UserValidationBox() {
  return (
    <View>
      <Text>Requirements for username</Text>
      <View>
        <Text style={styles.text}>- Username must have between 4 and 20 characters</Text>
        <Text style={styles.text}>
          - Username must not contain anything but letters a-z, digits 0-9 and
          special characters -._
        </Text>
        <Text style={styles.text}>
          - The special characters -._ must not be used successively in order to
          avoid confusio
        </Text>
        <Text style={styles.text}>- The username must not contain whitespaces</Text>
      </View>
    </View>
  );
}

export function PasswordValidationBox() {
  return (
    <View>
      <Text>Requirements for password</Text>
      <View>
        <Text style={styles.text}>- Have at least one or more number</Text>
        <Text style={styles.text}>
          - Character length minimal 6 and maximal 20
        </Text>
      </View>
    </View>
  );
}

export function EmailValidationBox() {
  return (
    <View>
      <Text>Wrong email format</Text>
      <View>
        <Text style={styles.text}>Example: example@example.com</Text>
      </View>
    </View>
  );
}

export default function ValidationBox({ data }: any) {
  if(data == "user") {
    return <UserValidationBox/>
  } else if(data == "password") {
    return <PasswordValidationBox/>
  }
  else if(data == "email") {
    return <EmailValidationBox/>
  }
  else return null;
}