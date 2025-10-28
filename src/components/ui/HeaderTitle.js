export const setHeaderOptions = (navigation, options = {}) => {
  const {
    headerTitle = 'Title',
    headerTitleAlign = 'center',
    headerStyle = {
      borderBottomWidth: 0,
      shadowOpacity: 0,
      backgroundColor: '#FFF',
    },
    headerTitleStyle = {
      fontFamily: 'lucida grande',
      fontSize: 18,
      color: '#000',
    },
    headerTintColor = '#000',
    headerBackTitle = null,
    headerBackTitleVisible = false,
  } = options;

  navigation.setOptions({
    headerTitle,
    headerTitleAlign,
    headerStyle,
    headerTitleStyle,
    headerTintColor,
    headerBackTitle,
    headerBackTitleVisible,
  });
};
