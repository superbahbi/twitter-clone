import React, { useRef, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { navigationRef } from "./src/navigationRef";

import LandingScreen from "./src/screens/LandingScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TweetScreen from "./src/screens/TweetScreen";
import NotificationScreen from "./src/screens/NotificationScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as TweetProvider } from "./src/context/TweetContext";
import { Provider as MessageProvider } from "./src/context/MessageContext";
// import { createBottomTabNavigator } from "react-navigation-tabs";
// import { createDrawerNavigator } from "react-navigation-drawer";
// import { setNavigator } from "./src/navigationRef";

// import AuthScreen from "./src/screens/AuthScreen";

// import SearchScreen from "./src/screens/SearchScreen";

// import MessageScreen from "./src/screens/MessageScreen";
// import ContactScreen from "./src/screens/ContactScreen";
// import ChatScreen from "./src/screens/ChatScreen";
// import AddTweetScreen from "./src/screens/AddTweetScreen";
// import ProfileScreen from "./src/screens/ProfileScreen";
// import SingleTweetScreen from "./src/screens/SingleTweetScreen";
// import SignoutScreen from "./src/screens/SignoutScreen";

import { Feather } from "@expo/vector-icons";

// import Drawer from "./src/components/Drawer";
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TweetScreen} />
      <Tab.Screen name="Test" component={TweetScreen} />
      <Tab.Screen name="MainStackNavigator" component={MainStackNavigator} />
    </Tab.Navigator>
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};
export default () => {
  return (
    <MessageProvider>
      <TweetProvider>
        <AuthProvider>
          <NavigationContainer ref={navigationRef}>
            <DrawerNavigator />
          </NavigationContainer>
        </AuthProvider>
      </TweetProvider>
    </MessageProvider>
  );
};
//screenOptions={{  }}
