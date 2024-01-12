import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import Sound from 'react-native-sound';

const App = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    // Load the sound file from the URL
    const audioURL = 'https://streaming.radio.co/s82eae5d4a/listen';
    const soundObj = new Sound(audioURL, null, (error) => {
      if (error) {
        console.error('Error loading sound', error);
      } else {
        setSound(soundObj);
      }
    });

    // Cleanup function to release the sound when the component unmounts
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const playSound = () => {
    setIsPlaying(true)

    if (sound) {
      // Play the loaded sound
      sound.play((success) => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.error('Error playing sound');
        }
      });
    }
  };

  const pauseSound = () => {

    if (sound) {
      sound.pause();
      setIsPlaying(false)
      console.log('Sound paused');
    }
  };


  return (
    <View>
      {
        isPlaying ?  <Button title="Stop" onPress={pauseSound} /> : <Button title="Play" onPress={playSound} />
      }
    </View>
  );
};

export default App;
