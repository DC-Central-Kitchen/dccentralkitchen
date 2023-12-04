import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Analytics from 'expo-firebase-analytics';
import React from 'react';
import WebComponent from '../components/WebComponent';
import Colors from '../constants/Colors';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import LandingScreen from '../screens/map/LandingScreen';
import DrawerContent from './DrawerContent';
import AuthStackNavigator from './stack_navigators/AuthStack';
import RecipesStackNavigator from './stack_navigators/RecipesStack';
import ResourcesStackNavigator from './stack_navigators/ResourcesStack';
import SettingsStackNavigator from './stack_navigators/SettingsStack';
import StoresStackNavigator from './stack_navigators/StoresStack';

const Drawer = createDrawerNavigator();

const AppStack = createStackNavigator();

const getActiveRouteName = (state) => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      // eslint-disable-next-line react/jsx-props-no-spreading
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerLabelStyle: {
          fontFamily: 'opensans-semibold',
          fontWeight: 'normal',
          fontSize: 20,
          color: Colors.activeText,
        },
        drawerActiveTintColor: Colors.primaryGreen,
        drawerItemStyle: {
          marginVertical: 4,
          marginHorizontal: 0,
          paddingLeft: 16,
          borderRadius: 0,
        },
        headerShown: false,
      }}>
      {/* <Drawer.Screen
        name="Home"
        component={GettingStartedStack}
        options={{ title: 'Home', swipeEnabled: false }}
      /> */}
      <Drawer.Screen
        name="Stores"
        component={StoresStackNavigator}
        options={{ title: 'Map', swipeEnabled: false }}
      />
      <Drawer.Screen
        name="WebComponent"
        options={{
          title: 'About',
        }}>
        {(props) => (
          <WebComponent
            URL="https://healthycorners.calblueprint.org/faq.html"
            title="FAQ"
            props={props}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Recipes"
        component={RecipesStackNavigator}
        options={{
          title: 'Recipes',
        }}
      />
      <Drawer.Screen
        name="Resources"
        component={ResourcesStackNavigator}
        options={{
          title: 'Resources',
        }}
      />

      <Drawer.Screen
        name="WebComponentFeedback"
        options={{
          title: 'Submit Feedback',
        }}>
        {(props) => (
          <WebComponent
            URL="http://tiny.cc/RewardsFeedback"
            title="Submit Feedback"
            props={props}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="LandingScreenOverlay"
        component={LandingScreen}
        options={{
          title: 'Using This App',
        }}
      />
      <Drawer.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={{
          title: 'Settings',
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);
        if (previousRouteName !== currentRouteName) {
          Analytics.logEvent('screen_view', {
            screen_name: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <AppStack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{
          cardOverlayEnabled: true,
          gestureEnabled: true,
          headerShown: false,
          cardStyle: { backgroundColor: Colors.bgLight },
        }}>
        <AppStack.Screen
          name="App"
          component={DrawerNavigator}
          options={{ animationEnabled: false }}
        />
        <AppStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <AppStack.Screen name="Auth" component={AuthStackNavigator} />
        <AppStack.Screen name="Verify" component={VerificationScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
