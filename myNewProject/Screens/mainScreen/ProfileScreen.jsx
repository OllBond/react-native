import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { EvilIcons } from "@expo/vector-icons";

import app from "../../firebase/config";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const db = getFirestore(app);

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, userName, userEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await onSnapshot(collection(db, "posts"), (snapshots) => {
      setUserPosts(
        snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    // const citiesRef = await collection(db, "posts");

    // const querySnapshot = await getDocs(
    //   citiesRef,
    //   where("userId", "==", "userId")
    // );

    // await querySnapshot.forEach((doc) => {

    //   setUserPosts((prevUserPosts) => [...prevUserPosts, { ...doc.data() }]);
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.imgBox}>
          <Image
            style={styles.avatar}
            source={require("../../assets/image/avatar.png")}
          />
        </View>
        <View style={styles.user}>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>
      <FlatList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.post} />
            <View>
              <Text>{item.comment}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Комментарии", { postId: item.id })
              }
            >
              <EvilIcons name="comment" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  headerWrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerText: {
    marginBottom: 11,
    fontSize: 17,
  },
  tabBarWrapper: {
    marginTop: 570,
    alignItems: "center",
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  userInfo: {
    flexDirection: "row",
    marginTop: 32,
    height: 60,
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  imgBox: {
    width: 60,
    height: 60,
    backgroundColor: "#E8E8E8",
    marginRight: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  user: {
    //  textAlign:"center",
  },
  post: {
    marginTop: 32,
    height: 240,
    width: 370,
    borderRadius: 8,
  },
});
