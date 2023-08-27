import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
import { useEffect, useState } from "react";
import Discovery from "./components/Discovery";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const stories = [
  {
    id: "2",
    source: require("./assets/stories/img_2.jpeg"),
    user: "derek.russel",
    avatar: require("./assets/stories/img_2.jpeg"),
  },
  {
    id: "4",
    source: require("./assets/stories/img_4.jpeg"),
    user: "jmitch",
    avatar: require("./assets/stories/img_4.jpeg"),
  },
  {
    id: "7",
    source: require("./assets/stories/img_7.png"),
    user: "andrea.schmidt",
    avatar: require("./assets/stories/img_7.png"),
    video: require("./assets/stories/7.mp4"),
  },
  {
    id: "5",
    source: require("./assets/stories/img_5.jpeg"),
    user: "monicaa",
    avatar: require("./assets/stories/img_5.jpeg"),
  },
  {
    id: "3",
    source: require("./assets/stories/img_3.jpeg"),
    user: "alexandergarcia",
    avatar: require("./assets/stories/img_3.jpeg"),
  },
  {
    id: "1",
    source: require("./assets/stories/img_1.jpeg"),
    user: "andrea.schmidt",
    avatar: require("./assets/stories/img_1.jpeg"),
  },
  {
    id: "6",
    source: require("./assets/stories/img_6.jpeg"),
    user: "andrea.schmidt",
    avatar: require("./assets/stories/img_1.jpeg"),
  },
];

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      await Promise.all(
        stories.map((story) => {
          return Asset.loadAsync(story.source);
        })
      );
      setIsReady(true);
    };
    fetchImages();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Discovery {...{ stories }} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
