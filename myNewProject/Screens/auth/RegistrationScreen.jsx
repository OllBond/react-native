import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useDispatch } from "react-redux";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();

const RegistrationScreen = ({ navigation }) => {
  // console.log(Platform.OS);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocusInput, setIsFocusInput] = useState({
    userName: false,
    email: false,
    password: false,
  });
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  const dispatch = useDispatch();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(authSignUpUser(state));

    navigation.navigate("Home");
    setState(initialState);
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/image/photo-BG-2x.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View onLayout={onLayoutRootView}>
              <View
                style={{
                  ...styles.formWrapper,

                  ...Platform.select({
                    ios: {
                      marginTop: isShowKeyboard ? 200 : 219,
                    },
                    android: {
                      marginTop: isShowKeyboard ? -100 : 0,
                    },
                  }),
                }}
              >
                <View style={styles.imgBox}>
                  {/* <Image
                  style={styles.avatar}
                  source={require("../assets/image/avatar.png")}
                /> */}
                  <Image
                    style={styles.icon}
                    source={require("../../assets/image/add.png")}
                    // source={require("../assets/image/del-avatar.icon.png")}
                  />
                </View>
                <Text style={styles.title}>Регистрация</Text>

                <View
                  style={{
                    ...styles.form,
                    paddingBottom: isShowKeyboard ? 32 : 45,
                  }}
                >
                  <View style={styles.inputuserName}>
                    <TextInput
                      style={{
                        ...styles.input,
                        borderColor: isFocusInput.userName
                          ? "#FF6C00"
                          : "#F6F6F6",
                        backgroundColor: isFocusInput.userName
                          ? "#FFFFFF"
                          : "#F6F6F6",
                      }}
                      textAlign={"left"}
                      placeholderTextColor={"#BDBDBD"}
                      textContentType="userName"
                      value={state.userName}
                      placeholder="Логин"
                      onFocus={() => {
                        setIsShowKeyboard(true),
                          setIsFocusInput({
                            ...isFocusInput,
                            userName: true,
                          });
                      }}
                      onBlur={() => {
                        setIsFocusInput({
                          ...isFocusInput,
                          userName: false,
                        });
                      }}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          userName: value,
                        }))
                      }
                    />
                  </View>
                  <View style={styles.inputMail}>
                    <TextInput
                      style={{
                        ...styles.input,
                        borderColor: isFocusInput.email ? "#FF6C00" : "#F6F6F6",
                        backgroundColor: isFocusInput.email
                          ? "#FFFFFF"
                          : "#F6F6F6",
                      }}
                      textAlign={"left"}
                      placeholderTextColor={"#BDBDBD"}
                      keyboardType="email-address"
                      textContentType="email"
                      value={state.email}
                      placeholder="Адрес электронной почты"
                      onFocus={() => {
                        setIsShowKeyboard(true),
                          setIsFocusInput({
                            ...isFocusInput,
                            email: true,
                          });
                      }}
                      onBlur={() => {
                        setIsFocusInput({
                          ...isFocusInput,
                          email: false,
                        });
                      }}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          email: value,
                        }))
                      }
                    />
                  </View>

                  <View style={styles.inputPassword}>
                    <TextInput
                      style={{
                        ...styles.input,
                        borderColor: isFocusInput.password
                          ? "#FF6C00"
                          : "#F6F6F6",
                        backgroundColor: isFocusInput.password
                          ? "#FFFFFF"
                          : "#F6F6F6",
                      }}
                      textAlign={"left"}
                      placeholderTextColor={"#BDBDBD"}
                      textContentType="password"
                      value={state.password}
                      secureTextEntry={isShowPassword}
                      placeholder="Пароль"
                      onFocus={() => {
                        setIsShowKeyboard(true),
                          setIsFocusInput({
                            ...isFocusInput,
                            password: true,
                          });
                      }}
                      onBlur={() => {
                        setIsFocusInput({
                          ...isFocusInput,
                          password: false,
                        });
                      }}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                    />
                    <Text
                      style={styles.showPass}
                      onPress={() => {
                        setIsShowPassword((prevState) => !prevState);
                      }}
                    >
                      {isShowPassword ? "Показать" : "Скрыть"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.aside}>Уже есть аккаунт? Войти</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formWrapper: {
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "center",
  },
  imgBox: {
    position: "absolute",
    left: "35%",
    top: "-15%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
  },
  icon: {
    position: "absolute",
    left: "90%",
    top: "65%",
    width: 25,
    height: 25,
  },
  title: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingLeft: 16,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
  },
  inputuserName: {
    marginTop: 32,
  },
  inputMail: {
    marginTop: 16,
  },
  inputPassword: {
    marginTop: 16,
  },
  showPass: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    lineHeight: 19,
    fontSize: 16,
    position: "absolute",
    top: 16,
    left: 260,
    color: "#1B4371",
  },
  button: {
    marginTop: 43,
    backgroundColor: "#FF6C00",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    lineHeight: 19,
    color: "#FFFFFF",
  },
  aside: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    lineHeight: 19,
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
