import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import logo from "../assets/logo.png";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";
// import { useAuth } from "../auth/authContext"; // Change this in the future to support real authentication

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const submit = (args) => {
  console.log(args);
};

export default function Login({ navigation }) {
  // const { token, user, saveToken, saveUser } = useAuth();

  return (
    <View style={styles.bigcontainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size="160%" color="#000000" ></Ionicons>
      </TouchableOpacity>
      <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={submit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SetUp")}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signUp}>
                Already have an account?{" "}
                <Text style={styles.signUpLink}>Login</Text>
              </Text>
            </TouchableOpacity>

          </>
        )}
      </Formik>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({

  bigcontainer: {
    backgroundColor: "#E0D7F7",
    paddingTop: "5%",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E0D7F7",
    paddingHorizontal: 20,
  },
  logo: {
    marginTop: "25%",
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
    marginTop: "15%",
    marginBottom: "20%",
    fontWeight: "bold",
    color: "purple",
  },
    // ...existing code...
  inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: "#aaa",
      paddingHorizontal: 10,
      marginLeft: "10%",
      marginRight: "10%",

    },

  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#000",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#1E90FF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "10%",
    marginRight: "10%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  signUp: {
    color: "#000",
    marginBottom: "150%",
  },
  signUpLink: {
    color: "#1E90FF", // Changed from "#F2F3F4" to match the button color
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButton: {
    size: 50,
    marginLeft: "8%",
    marginTop: "8%",
  },
});