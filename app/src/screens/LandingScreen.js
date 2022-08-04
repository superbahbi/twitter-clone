import { useNavigationContainerRef } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import * as RootNavigation from "../navigationRef";
import { FontAwesome5 } from "@expo/vector-icons";
import NavLink from "../components/NavLink";
const LandingScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <FontAwesome5
          style={{ alignSelf: "center" }}
          name="paw"
          size={24}
          color="#1DA1F2"
        />
      </View>
      <Text style={styles.text}>
        See what's happening in the world right now.
      </Text>
      <Button
        buttonStyle={styles.button}
        title="Create Account"
        onPress={() => RootNavigation.navigate("Signup")}
      />

      <NavLink
        style={styles.navlink}
        routeName="Signin"
        text="Have an account already? Log in"
      />
    </View>
  );
};
LandingScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 40,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    borderRadius: 50,
    color: "black",
  },
  navlink: {
    marginTop: 20,
  },
});
export default LandingScreen;
