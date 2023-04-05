import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import db from "../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import useRoute from "../router";
import { authStateCahngeUser } from "../redux/auth/authOperations";

const auth = getAuth(db);

const Main = () => {
  //   const [user, setUser] = useState(null);
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //   const state = useSelector((state) => state);
  //   console.log(state);

  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, []);

  //   const authStateChanged = async () => {
  //     try {
  //       onAuthStateChanged(auth, (user) => {
  //         setUser(user);
  //         // console.log(user, "APP ");
  //       });
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  //   authStateChanged();

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
