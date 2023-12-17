import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video'
const SCREEN_WIDTH = Dimensions.get('window').width;

const ReelsScreen = () => {
  const reelsData = [
    { id: '1', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: '2', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.videoContainer}>
        
        {/* Use a video player component (e.g., react-native-video) to play the video */}
        {/* Make sure to install the video player library before using */}
        {/* Example: npm install react-native-video */}
      </View>
    );
  };

  return (
    <View>
              <Video paused={false} source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }} style={styles.video} resizeMode="cover" />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2
  },
  video: {
    width: 300,
    height: 300,
    borderWidth:2
  },
  videoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ReelsScreen;
