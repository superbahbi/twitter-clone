import React from "react";
import * as RootNavigation from "../navigationRef";

import { Text, TouchableOpacity, StyleSheet } from "react-native";

const NavLink = ({ text, routeName }) => {
  return (
    <>
      <TouchableOpacity onPress={() => RootNavigation.navigate(routeName)}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  link: {
    color: "blue",
    margin: 20,
  },
});
export default NavLink;
