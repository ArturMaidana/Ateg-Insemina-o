import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import { HomeIcon, DashboardIcon, ProfileIcon } from '../Icons/Icons';

const iconConfig = {
  Home: HomeIcon,
  RunningToday: DashboardIcon,
  Profile: ProfileIcon,
};

export default ({ state, navigation }) => {
  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const IconComponent = iconConfig[route.name];
          const iconColor = isFocused ? '#02613C' : '#FFFFFF';

          return (
            <Pressable
              key={route.name}
              style={styles.tabItem}
              onPress={() => goTo(route.name)}
              android_ripple={{
                color: 'rgba(255,255,255,0.2)',
                borderless: true,
              }}
            >
              <View
                style={
                  isFocused
                    ? styles.activeIconContainer
                    : styles.inactiveIconContainer
                }
              >
                {IconComponent && <IconComponent size={32} color={iconColor} />}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    left: 20, // Ajustei para ficar mais responsivo
    right: 20,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    height: 75,
    width: '75%', // Adicionado para ocupar o espaço definido em container
    backgroundColor: '#008C54',
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    height: '100%', // Garante que a área de toque ocupe toda a altura
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
