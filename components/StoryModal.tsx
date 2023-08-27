import { View, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { StoryModalProps } from "../types";
import { ResizeMode, Video } from "expo-av";
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { GestureDetector, Gesture, State } from "react-native-gesture-handler";

const { width: wWidth, height: wHeight } = Dimensions.get("window");

type ValueOf<T> = T[keyof T];

const StoryModal = ({ story, position, onRequestClose }: StoryModalProps) => {
  const { x, y, width: storyWidth, height: storyHeight } = position;

  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);
  const width = useSharedValue(storyWidth);
  const height = useSharedValue(storyHeight);
  const velocityY = useSharedValue(0);
  const state = useSharedValue<ValueOf<typeof State>>(State.UNDETERMINED);

  useEffect(() => {
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
    width.value = withTiming(wWidth);
    height.value = withTiming(wHeight);
  }, []);

  const style = {
    ...StyleSheet.absoluteFillObject,
    // borderRadius: 5,
    width,
    height,
    transform: [{ translateX }, { translateY }],
  };

  const panGesture = Gesture.Pan()
    .activeOffsetY(100)
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
      velocityY.value = e.velocityY;
      state.value = e.state;
    })
    .onChange((e) => {
      if (e.state === State.ACTIVE) {
        height.value = interpolate(
          translateY.value,
          [0, wHeight],
          [wHeight, storyHeight]
        );
        width.value = interpolate(
          translateY.value,
          [0, wHeight],
          [wWidth, storyWidth]
        );
      }
    })
    .onEnd((e) => {
      if (e.state === State.END && e.velocityY <= 50) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        width.value = withSpring(wWidth);
        height.value = withSpring(wHeight);
      }
      if (e.state === State.END && e.velocityY > 50) {
        translateX.value = withSpring(x);
        translateY.value = withSpring(y);
        width.value = withSpring(storyWidth);
        height.value = withSpring(storyHeight);

        setTimeout(() => {
          try {
            onRequestClose();
          } catch (error) {
            console.log(error, "error");
          }
        }, 1000);
      }
    })
    .runOnJS(true);

  return (
    <React.Fragment>
      <GestureDetector gesture={panGesture}>
        <View style={styles.container}>
          <Animated.View {...{ style }}>
            {!story.video && (
              <Image source={story.source} style={styles.image} />
            )}
            {story.video && (
              <Video
                source={story.video}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
                isLooping
                style={styles.video}
              />
            )}
          </Animated.View>
        </View>
      </GestureDetector>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 5,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
});

export default StoryModal;
