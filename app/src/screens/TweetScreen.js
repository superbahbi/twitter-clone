import React, { useContext } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import { Icon } from "react-native-elements";
import ListItem from "../components/ListItem";
import MenuHeader from "../components/MenuHeader";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TweetContext } from "../context/TweetContext";
const TweetScreen = ({ navigation }) => {
  const { state: authState } = useContext(AuthContext);
  const { state: tweetState, fetchTweet, fetchUser } = useContext(TweetContext);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTweet();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <Text>Test</Text>
      {/* <MenuHeader user={authState.user} /> */}
      {/* <FlatList
        data={tweetState.tweet.foundTweet}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
            // onPress={() => navigation.navigate("SingleTweet", { item })}
            >
              <ListItem
                avatar={item.user_data.profile.avatar.filename}
                _id={item._id}
                userId={item._id}
                username={item.username}
                name={item.name}
                content={item.content}
                image={item.img?.filename}
                timestamp={item.timestamp}
                likes={item.likes}
                user={authState.user}
              />
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.tweet}>
        <TouchableOpacity onPress={() => navigation.navigate("AddTweet")}>
          <Icon reverse name="addfile" type="antdesign" color="#1DA1F2" />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

TweetScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 0,
    margin: 0,
  },
  tweet: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
});

export default TweetScreen;
