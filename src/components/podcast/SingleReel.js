import React, { useRef, useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';
import { ServerUrl } from '../../constants/globalUrl';


const SingleReel = ({ item, index, currentIndex, setCurrentIndex }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const videoRef = useRef(null);
    const handlePause = () => {
        console.log(videoRef.current)

        if (videoRef.current) {
            videoRef.current._onSeek(0);
            videoRef.current._onPlaybackResume();
          }
      };
    const onBuffer = buffer => {
        console.log('buffring', buffer);
    };
    const onError = error => {
        console.log('error', error);
    };
    const [mute, setMute] = useState(false);
    return (
        <View
            style={{
                width: windowWidth,
                height: windowHeight,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TouchableOpacity
                // onPress={() => handlePause()}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}>
                <Video
                    ref={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    repeat={true}
                    resizeMode="cover"
                    //   paused={true}
                    // controls={true}
                    paused={currentIndex == index ? false : true}
                    source={{ uri: `http://${ServerUrl}/uploads/${item?.video}` }}
                    // muted={mute}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                    }}
                />
                  <TouchableOpacity
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                position:'absolute',
                top:0,

            }}
            onPress={() => {
                if(currentIndex === -1){
                    setCurrentIndex(index)
                } else {
                    setCurrentIndex(-1)
                }
            }}
            >

            </TouchableOpacity>
            </TouchableOpacity>
          
            {/* <View>
                <Text>{item.channelName}</Text>
            </View> */}
        </View>
    );
};

export default SingleReel;