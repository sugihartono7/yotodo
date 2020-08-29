import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  AppContainer
} from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppContainer />
      </View>
    );
  }
}


async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/logoyogya.png'),
      require('./assets/images/bg.png'),
      require('./assets/images/logo/logo_white.png'),
      require('./assets/images/intro.png'),
      require('./assets/images/minusmargin.png'),
      require('./assets/images/minusstock.png'),
      require('./assets/images/minusgrowth.png'),
      require('./assets/images/emptystock.png'),
      require('./assets/images/user.png'),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf"),
      'TitilliumWeb_Regular': require("./assets/fonts/TitilliumWeb-Regular.ttf"),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  console.log(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
