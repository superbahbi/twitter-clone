import React, { useContext } from "react";
import { Context as TweetContext } from "../context/TweetContext";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import MenuHeader from "../components/MenuHeader";
const NotificationScreen = () => {
  return (
    <View>
      {/* <MenuHeader title="Notifications" /> */}
      <Text>NotificationScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default NotificationScreen;
