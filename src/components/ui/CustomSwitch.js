// CustomSwitch.js
import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';

const SWITCH_WIDTH = 50;
const SWITCH_HEIGHT = 28;
const THUMB_SIZE = 22;
const PADDING = (SWITCH_HEIGHT - THUMB_SIZE) / 2;

export default function CustomSwitch({ value, onValueChange }) {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [PADDING, SWITCH_WIDTH - THUMB_SIZE - PADDING],
  });

  const trackBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E9E9EA', '#00A859'],
  });

  const handlePress = () => {
    if (onValueChange) {
      onValueChange(!value);
    }
  };

  const animatedTrackStyle = {
    backgroundColor: trackBackgroundColor,
  };

  const animatedThumbStyle = {
    transform: [{ translateX: thumbTranslateX }],
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT / 2,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
