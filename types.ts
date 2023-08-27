export type DiscoveryType = {
  stories: Story[];
};

export type Story = {
  id: string;
  source: number;
  user: string;
  avatar: number;
  video?: number;
};

export type StoryModalProps = {
  story: Story;
  position: PositionType;
  onRequestClose: () => void;
};

export type StoryThumbnailProps = {
  story: Story;
  onPress: (e: () => {}) => void;
  selected: boolean;
};

export type PositionType = {
  x: number;
  y: number;
  height: number;
  width: number;
};
