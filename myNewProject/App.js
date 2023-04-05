import { Provider } from "react-redux";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { useState, useEffect } from "react";

import useRoute from "./router";
import { store } from "./redux/store";

import Main from "./components/Main";

// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import db from "./firebase/config";
// const auth = getAuth(db);

export default function App() {
  // const [user, setUser] = useState(null);

  // // useEffect(() => {}, []);

  // const authStateChanged = async () => {
  //   try {
  //     onAuthStateChanged(auth, (user) => {
  //       setUser(user);
  //       // console.log(user, "APP ");
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // authStateChanged();

  // const routing = useRoute(user);

  return (
    <>
      <Provider store={store}>
        {/* <isAuthContext.Provider value={{ isAuth, toggleIsAuth }}> */}
        <StatusBar style="auto" />
        {/* <NavigationContainer>{routing}</NavigationContainer> */}
        <Main />
        {/* </isAuthContext.Provider> */}
      </Provider>
    </>
  );
}
