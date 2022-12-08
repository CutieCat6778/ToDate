import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SizedBox from "../components/SizedBox";
import useUser from "../lib/useUser";
import { Controller, useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { LoginGQL } from "../graphql/auth.graphql";
import { UserRes } from "../types/graphql";
import ValidationBox from "../components/ValidationChecker";
import { setAuthInfo } from "../lib/localStorage";

export default function Login({ route, navigation }: any) {
  const [trigger, _setTrigger] = useState(false);
  const [errorMessage, _setErrorMessage] = useState<string>("");
  const [loginInfo, _setLoginInfo] = useState({
    username: "",
    password: "",
  });

  useUser({
    origin: route.name,
    navigate: navigation.navigate,
  });

  const [loadData, { called, loading, data, error }] = useLazyQuery(LoginGQL, {
    variables: {
      username: loginInfo.username,
      password: loginInfo.password,
    },
  });

  interface FormData {
    username: string;
    password: string;
  }

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(({ username, password }) => {
    _setLoginInfo({
      username,
      password,
    });
    loadData();
  });

  useEffect(() => {
    if (called && !loading && !trigger) {
      if (error) {
        _setErrorMessage(error.message);
      }
      if (!data) {
        if (errorMessage.length > 8) {
          _setErrorMessage("Incorrect login informations");
        }
      } else if (data) {
        if (errorMessage != "") _setErrorMessage("");
        async function redirectToHome() {
          const user: UserRes = data.login;
          console.log(user);
          setAuthInfo(user);
          navigation.navigate("Home", { redirected: true, user: user.user });
        }
        if (!trigger) redirectToHome();
        _setTrigger(true);
      }
    }
  }, [called, loading, trigger, data, errorMessage, navigation, error]);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.content}>
          <Text style={styles.title}>Welcome back!</Text>

          <SizedBox height={8} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register", { redirected: true });
            }}
          >
            <Text style={styles.subtitle}>Create an account here!</Text>
          </TouchableOpacity>

          {errorMessage == "" ? null : errorMessage != "user" &&
            errorMessage != "password" ? (
            <View>
              <SizedBox height={8} />
              <Text style={styles.error}> {errorMessage} </Text>
            </View>
          ) : (
            <View>
              <SizedBox height={8} />
              <ValidationBox data={errorMessage} />
            </View>
          )}

          <SizedBox height={32} />

          <Pressable>
            <Controller
              control={control}
              name="username"
              rules={{
                required: true,
              }}
              render={({ field: { onBlur, onChange, value } }) => (
                <View style={styles.form}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoComplete="username"
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    returnKeyType="next"
                    style={styles.textInput}
                    textContentType="username"
                    value={value}
                  />
                </View>
              )}
            />
          </Pressable>

          <SizedBox height={16} />

          <Pressable>
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
              }}
              render={({ field: { onBlur, onChange, value } }) => (
                <View style={styles.form}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onSubmitEditing={onSubmit}
                    returnKeyType="done"
                    secureTextEntry
                    style={styles.textInput}
                    textContentType="password"
                    value={value}
                  />
                </View>
              )}
            />
          </Pressable>

          <SizedBox height={16} />

          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.textButton}>Forgot password?</Text>
          </View>

          <SizedBox height={16} />

          <TouchableOpacity onPress={onSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Continue</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgb(93, 95, 222)",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  form: {
    alignItems: "center",
    backgroundColor: "rgb(58, 58, 60)",
    borderRadius: 8,
    flexDirection: "row",
    height: 48,
    paddingHorizontal: 16,
  },
  label: {
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    width: 80,
  },
  root: {
    backgroundColor: "#000000",
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  subtitle: {
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
  },
  error: {
    color: "#B73E3E",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  textInput: {
    color: "#FFFFFF",
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
  },
});
