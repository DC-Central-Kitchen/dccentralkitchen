import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
// import RewardsScreen from '../../screens/rewards/RewardsScreen';
import Window from '../../constants/Layout';
import GettingStartedScreen from '../../screens/map/GettingStartedScreen';
import MapScreen from '../../screens/map/MapScreen';
import ProductDetailsScreen from '../../screens/map/ProductDetailsScreen';
import ProductsScreen from '../../screens/map/ProductsScreen';
import StoreDetailsScreen from '../../screens/map/StoreDetailsScreen';
import StoreListScreen from '../../screens/map/StoreListScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
  },
});

const StoresStack = createStackNavigator();

export default function StoresStackNavigator() {
  return (
    <StoresStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgLight },
        config,
      }}>
      <StoresStack.Screen name="Stores" component={MapScreen} />
      <StoresStack.Screen name="StoreList" component={StoreListScreen} />
      <StoresStack.Screen name="Products" component={ProductsScreen} />
      <StoresStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
      <StoresStack.Screen
        name="GettingStartedOverlay"
        component={GettingStartedScreen}
        options={{
          gestureDirection: 'vertical',
          gestureResponseDistance: {
            vertical: Window.height,
          },
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <StoresStack.Screen
        name="StoreDetailsScreen"
        component={StoreDetailsScreen}
      />
    </StoresStack.Navigator>
  );
}
