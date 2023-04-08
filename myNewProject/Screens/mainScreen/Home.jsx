import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../nestedScreen/DefaultScreenPosts";
import MapScreen from "../nestedScreen/MapScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";

const NestedScreen = createStackNavigator();

const Home = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
      <NestedScreen.Screen
        name="Комментарии"
        component={CommentsScreen}
        // screenOptions={{ tabBarStyle: { display: "none" } }}
        // options={{ headerShown: false }}
      />
    </NestedScreen.Navigator>
  );
};
export default Home;
