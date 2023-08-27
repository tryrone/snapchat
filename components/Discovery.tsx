import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { DiscoveryType, Story } from "../types";
import StoryThumbnail from "./StoryThumbnail";
import StoryModal from "./StoryModal";

const Discovery = ({ stories }: DiscoveryType) => {
  const [story, setStory] = React.useState<Story | null>(null);
  const [position, setPosition] = React.useState<any>(null);

  const goToStory = async (story: Story, measure: () => {}) => {
    //@ts-ignore
    const position = await measure();
    setStory(story);
    setPosition(position);
  };

  const onRequestClose = () => {
    setStory(null);
    setPosition(null);
  };

  return (
    <View style={styles.flex}>
      <ScrollView
        style={styles.flex}
        contentInsetAdjustmentBehavior="automatic"
      >
        <SafeAreaView style={styles.container}>
          {stories.map((s: Story) => (
            <StoryThumbnail
              //@ts-ignore
              key={s.id}
              selected={!!story && story.id === s.id}
              onPress={(measure) => goToStory(s, measure)}
              story={s}
            />
          ))}
        </SafeAreaView>
      </ScrollView>
      {story !== null && position !== null && (
        <View style={StyleSheet.absoluteFill}>
          <StoryModal
            {...{
              story,
              position,
              onRequestClose,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});

export default Discovery;
