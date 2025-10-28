import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BASE_HORIZONTAL_PADDING = 20;

const ScreenContainer = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  const containerStyle = {
    flex: 1,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: Math.max(insets.left, BASE_HORIZONTAL_PADDING),
    paddingRight: Math.max(insets.right, BASE_HORIZONTAL_PADDING),
  };

  return (
    <View style={[styles.container, containerStyle, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});

export default ScreenContainer;
