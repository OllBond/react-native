import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";

import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/mainScreen/Home";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

import { authSignOutUser } from "./redux/auth/authOperations";
import { useDispatch } from "react-redux";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const useRoute = (isAuth) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Registration">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: "Registration" }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarItemStyle: {
          borderTopColor: "#E5E5E5",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          title: "Публикации",

          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Feather
                name="grid"
                size={24}
                color={focused ? "#FF6C00" : color}
              />
            );
          },
          tabBarIconStyle: {
            marginTop: 9,
          },

          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),

          headerStyle: {
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />

      <Tabs.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="add" size={24} color={"#FFFFFF"} />;
          },
          tabBarIconStyle: {
            backgroundColor: "#FF6C00",
            width: 70,
            height: 40,
            borderRadius: 50,
            marginTop: 9,
          },

          // headerRight: () => (
          //   <TouchableOpacity onPress={signOut}>
          //     <Feather name="log-out" size={24} color="#BDBDBD" />
          //   </TouchableOpacity>
          // ),

          // headerStyle: {
          //   borderBottomColor: "#E5E5E5",
          //   borderBottomWidth: 1,
          // },
          // headerRightContainerStyle: {
          //   paddingRight: 15,
          // },

          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="#212121" />
            </TouchableOpacity>
          ),

          headerStyle: {
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
          },
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
        }}
      />
      <Tabs.Screen
        name="Публикации"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Feather
                name="user"
                size={24}
                color={focused ? "#FF6C00" : color}
              />
            );
          },

          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}

        // headerRight: () => (
        //   <TouchableOpacity onPress={signOut}>
        //     <Feather name="log-out" size={24} color="#BDBDBD" />
        //   </TouchableOpacity>
        // ),
      />
    </Tabs.Navigator>
  );
};

export default useRoute;
