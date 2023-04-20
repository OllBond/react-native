import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";

import app from "../../firebase/config";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";

const db = getFirestore(app);

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});

  const { userName, userEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPost();
    posts.forEach((post) => {
      getCommentsCount(post.id);
    });
  }, []);

  const getAllPost = async () => {
    try {
      await onSnapshot(collection(db, "posts"), (snapshots) => {
        setPosts(snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } catch (error) {
      console.log(error.massage);
      Alert.alert("Try again");
    }
  };

  useEffect(() => {
    if (route.params?.commentsCount) {
      setCommentsCount((prev) => ({
        ...prev,
        [route.params.postId]: route.params.commentsCount,
      }));
    }
  }, [route.params]);

  const getCommentsCount = async (postId) => {
    try {
      const commentsRef = collection(db, `posts/${postId}/comments`);
      const queryRef = query(commentsRef);
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        const commentsCount = querySnapshot.docs.length;
        setCommentsCount((prev) => ({ ...prev, [postId]: commentsCount }));
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setCommentsCount((prev) => ({ ...prev, [postId]: 0 }));
    }
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
        data={posts}
        keyExtractor={(item, index) => {
          index.toString();
        }}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.post} />

            <View>
              <Text style={styles.title}>{item.comment}</Text>
            </View>

            <View style={styles.box}>
              <View style={styles.commentWrapper}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Комментарии", {
                      postId: item.id,
                      photo: item.photo,
                    })
                  }
                >
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={styles.commentsCount}>
                  {commentsCount[item.id] || 0}
                </Text>
              </View>

              <View style={styles.wrapperLocation}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      location: item.location,
                    })
                  }
                >
                  <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      location: item.location,
                    })
                  }
                >
                  <Text style={styles.locationName}>{item.locationName}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
  },
  userInfo: {
    flexDirection: "row",
    marginTop: 32,
    height: 60,
    alignItems: "center",
    marginBottom: 32,
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
  name: {
    fontFamily: "RobotoBold",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },
  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    marginTop: 8,
    marginBottom: 8,
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentsCount: {
    ntFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 9,

    // borderColor: "red",
    // borderWidth: 1,
  },
  wrapperLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    // borderColor: "red",
    // borderWidth: 1,
  },
  wrapperLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationName: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
