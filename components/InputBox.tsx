import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

export default function InputBox({ value, setValue }: any) {
  interface FormData {
    title: string;
  }

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = handleSubmit(({ title }) => {
    setValue(title);
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={"padding"}>
        <View>
          <Pressable>
            <View style={styles.formBox} >
              <Controller
                control={control}
                name="title"
                render={({ field: { onBlur, onChange, value } }) => (
                  <View style={styles.form}>
                    <TextInput
                      autoCapitalize="sentences"
                      autoComplete="off"
                      autoCorrect={true}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      returnKeyType="done"
                      textContentType="none"
                      value={value.length < 1 ? undefined : value}
                      placeholder={"What are you planing?"}
                      style={styles.textInput}
                    />
                  </View>
                )}
              />
              <TouchableOpacity onPress={onSubmit}>
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Post</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  title: {
    color: "#fff",
  },
  button: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0,
    backgroundColor: "#ef7c8e",
    padding: 13,
  },
  buttonTitle: {
    color: "rgb(0, 0, 0)",
    fontSize: 18,
    opacity: 0.6,
    fontWeight: "600",
  },
  textInput: {
    flex: 1,
    color: "#fff",
  },
  formBox: {
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    flexDirection: "row",
    height: 48,
    marginTop: 10,
    backgroundColor: "rgb(58, 58, 60)",
  },
  form: {
    width: "85%",
    marginRight: 10,
    padding: 10,
  }
});
