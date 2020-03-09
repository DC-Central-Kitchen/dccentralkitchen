import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import MapScreen from '../screens/map/MapScreen';
import RewardsScreen from '../screens/rewards/RewardsScreen';
import ReceiptScanner from '../screens/rewards/Camera';

import ProductDetailsScreen from '../screens/map/ProductDetailsScreen';
import ProductsScreen from '../screens/map/ProductsScreen';
import StoreListScreen from '../screens/map/StoreListScreen';
import NewsScreen from '../screens/news/NewsScreen';
import NewsDetailsScreen from '../screens/news/NewsDetailsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

export const StoresStack = createStackNavigator(
  {
    Stores: MapScreen,
    StoreList: StoreListScreen,
    Products: ProductsScreen,
    ProductDetails: ProductDetailsScreen
  },
  config
);

StoresStack.navigationOptions = {
  drawerLabel: 'Stores'
};

export const RewardsStack = createStackNavigator(
  {
    RewardsHome: RewardsScreen,
    Camera: ReceiptScanner
  },
  config
);

RewardsStack.navigationOptions = {
  drawerLabel: 'Rewards'
};

export const NewsStack = createStackNavigator(
  {
    News: NewsScreen,
    NewsDetails: NewsDetailsScreen
  },
  config
);

NewsStack.navigationOptions = {
  drawerLabel: 'News'
};