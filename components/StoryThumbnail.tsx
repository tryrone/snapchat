import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import { PositionType, StoryThumbnailProps } from "../types";
import Constants from "expo-constants";

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;
const offset = (v: number) =>
  Platform.OS === "android" ? v + Constants.statusBarHeight : v;

const StoryThumbnail = ({ onPress, selected, story }: StoryThumbnailProps) => {
  const storyRef = React.useRef<any>(null);

  const measure = async (): Promise<PositionType> =>
    new Promise((resolve) =>
      storyRef?.current?.measureInWindow(
        (x: any, y: number, width: any, height: any) =>
          resolve({
            x,
            y: offset(y),
            width,
            height,
          })
      )
    );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress(measure);
      }}
    >
      <View style={styles.container}>
        {!selected && (
          <Image
            source={story.source}
            style={styles.image}
            {...{ ref: storyRef }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 1.77,
    marginTop: 16,
    borderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    resizeMode: "cover",
    borderRadius,
  },
});

export default StoryThumbnail;
