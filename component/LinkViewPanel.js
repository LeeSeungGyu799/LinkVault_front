import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { darkTheme } from "./ThemeColor";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LinkViewPanel = ({ link, onLongPress }) => {
  const [isVisible, setVisible] = useState(false);
  const contentHeight = useRef(new Animated.Value(0)).current;
  const maxContentHeight = 460;
  const date = new Date(link.createdAt);
  const axiosPrivate = useAxiosPrivate();
  const READ_UPDATE_URI = `/links/update-read-status/${link.id}`;

  const toggleContent = async () => {
    setVisible(!isVisible);
    Animated.timing(contentHeight, {
      toValue: isVisible ? 0 : maxContentHeight,
      duration: 200,
      useNativeDriver: false,
    }).start();
    try {
      const response = await axiosPrivate.patch(READ_UPDATE_URI);
      console.log(response.data.result);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleContent}
        onLongPress={() => onLongPress(link)}
      >
        {link.siteLogo != null ? (
          <Image source={link.siteLogo} style={styles.siteLogo} />
        ) : (
          <Image
            source={require("../assets/logo_placeholder.jpg")}
            style={styles.siteLogo}
          />
        )}

        <View style={styles.headerTextContainer}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            {link.title}
          </Text>
          {link.createdAt != null && (
            <Text
              style={styles.date}
            >{`${date.getFullYear()} 년 ${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`}</Text>
          )}
        </View>
        {/* <Entypo
          style={styles.editIcon}
          name="dots-three-vertical"
          size={20}
          color={darkTheme.text}
        /> */}
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height: contentHeight }]}>
        <Image source={link.thumbnail} style={styles.image} />
        {link.summary != null && (
          <View>
            <Text style={styles.summaryHeader}>요약</Text>
            <Text style={styles.summaryText}>
              {link.summary.split("\n")[0]}
            </Text>
            <Text style={styles.summaryText}>
              {link.summary.split("\n")[1]}
            </Text>
            <Text style={styles.summaryText}>
              {link.summary.split("\n")[2]}
            </Text>
          </View>
        )}
        {link.note != null && (
          <View>
            <Text style={styles.summaryHeader}>메모</Text>
            <Text style={styles.summaryText}>{link.note}</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.level1,
    marginVertical: 5,
    borderRadius: 10,
  },
  header: {
    padding: 10,
    flexDirection: "row",
  },
  siteLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTextContainer: {
    flex: 8,
    marginLeft: 10,
  },
  title: {
    color: darkTheme.text,
    fontSize: 16,
    overflow: "hidden",
  },
  date: {
    color: darkTheme.text,
    fontSize: 12,
  },
  editIcon: {
    alignSelf: "center",
  },
  content: {},
  image: {
    height: "50%",
    width: "90%",
    alignSelf: "center",
  },
  summaryHeader: {
    color: darkTheme.text,
    fontFamily: "Pretendard",
    fontSize: 18,
    margin: 4,
    padding: 4,
    alignSelf: "center",
    fontWeight: "800",
  },
  summaryText: {
    color: darkTheme.text,
    fontFamily: "Pretendard",
    fontSize: 16,
    margin: 2,
    padding: 5,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: darkTheme.level2,
  },
});

export default LinkViewPanel;
