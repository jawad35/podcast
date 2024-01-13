import React, { useState, useEffect } from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import Sound from 'react-native-sound';

const App = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    try {
      const audioURL = 'https://streaming.radio.co/s82eae5d4a/listen';
      const soundObj = new Sound(audioURL, null, (error) => {
        if (error) {
          setIsPlaying(false)
          console.error('Error loading sound', error);
        } else {
          setSound(soundObj);
        }
      });
    } catch (error) {
      
    }
    // Load the sound file from the URL
   

    // Cleanup function to release the sound when the component unmounts
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const playSound = () => {
    
    try {
      if (sound) {
        // Play the loaded sound
        sound.play((success) => {
          if (success) {
            setIsPlaying(true)
            console.log('Sound played successfully');
          } else {
            console.error('Error playing sound');
            setIsPlaying(false)
          }
        });
      }
    } catch (error) {
      
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
    <View className='rounded-md m-3'>
      <TouchableOpacity className='bg-gray_light p-5 rounded-xl'>
        <Text className='text-white_color text-center font-bold text-lg' onPress={isPlaying ? pauseSound : playSound}>
        {
          isPlaying ? "Stop Radio" : "Play Radio"
        }
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
