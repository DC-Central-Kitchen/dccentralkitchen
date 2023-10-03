import { FontAwesome5 } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from 'sentry-expo';
import Colors from './constants/Colors';
import { env } from './environment';
import { logErrorToSentry } from './lib/logUtils';
import AppNavigator from './navigation/AppNavigator';

Sentry.init({
  dsn: 'https://dacd32167a384e189eab16e9588c0e67@sentry.io/5172575',
  enableInExpoDevelopment: false,
  debug: false,
  environment: env,
});
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.maxFontSizeMultiplier = 1.4;
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // False to disable Analytics log and warning messages on the Expo client
  // Analytics.setUnavailabilityLogging(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadResourcesAsync();
      } catch (e) {
        console.warn(e);
        handleLoadingError(e);
      } finally {
        // Tell the application to render
        setLoadingComplete(true);
      }
    }

    prepare();
  }, []);

  // if (!isLoadingComplete) {
  //   return (
  //     <AppLoading
  //       startAsync={loadResourcesAsync}
  //       onError={handleLoadingError}
  //       onFinish={() => handleFinishLoading(setLoadingComplete)}
  //     />
  //   );
  // }
  const onLayoutRootView = useCallback(async () => {
    if (isLoadingComplete) {
      await SplashScreen.hideAsync();
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
          {Platform.OS === 'ios' && <StatusBar style="dark" />}
          <AppNavigator />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/hc_start.jpg'),
      require('./assets/images/Marker_Focused.png'),
      require('./assets/images/Marker_Resting.png'),
      require('./assets/images/Onboarding_1.png'),
    ]),
    Font.loadAsync({
      // This is the icon style we use
      ...FontAwesome5.font,
      // Open Sans is the custom font used across the application
      'opensans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'opensans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      'opensans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  logErrorToSentry({
    action: 'AppLoading',
    error: err,
  });
  // console.warn(error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgLight,
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primaryGreen,
    accent: Colors.primaryOrange,
    background: 'white',
    error: Colors.error,
  },
};
