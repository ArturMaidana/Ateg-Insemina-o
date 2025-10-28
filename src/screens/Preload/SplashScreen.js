import React, { useEffect, useRef, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';

import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const scaleValue = useRef(new Animated.Value(1.5)).current;
  const logoPositionX = useRef(new Animated.Value(0)).current;
  const nomeOpacity = useRef(new Animated.Value(0)).current;
  const nomePositionX = useRef(new Animated.Value(20)).current;

  const navigation = useNavigation();
  const { loadStorage } = useContext(AuthContext);

  useEffect(() => {
    const checkToken = async () => {
      loadStorage();
    };

    Animated.sequence([
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.timing(logoPositionX, {
          toValue: -75,
          duration: 1000,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(400),
          Animated.parallel([
            Animated.timing(nomeOpacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(nomePositionX, {
              toValue: 65,
              duration: 500,
              easing: Easing.elastic(1.5),
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]),
    ]).start(() => {
      checkToken();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ translateX: logoPositionX }, { scale: scaleValue }],
          },
        ]}
      >
        <Image
          source={require('../../assets/LogoOficial.png')}
          style={{ width: 120, height: 125 }}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: nomeOpacity,
            transform: [{ translateX: nomePositionX }],
          },
        ]}
      >
        <Image
          source={require('../../assets/NameApp.png')}
          style={{ width: 140, height: 50 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#006837',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    position: 'absolute',
  },
});
