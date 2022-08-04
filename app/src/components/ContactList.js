import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ContactList = ({ navigation, text, routeName }) => {
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
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
export default ContactList;
