import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-elements';
import bannerLogo from '../../assets/images/banner_logo.png';
import { NavHeaderContainer } from '../../components/BaseComponents';
import Window from '../../constants/Layout';
import { STORES } from '../../constants/ScreenNames';
import {
  HowItWorksButton,
  HowItWorksView,
  RewardButtonSubtitle,
  RewardButtonTitle,
} from '../../styled/rewards';
import { ColumnContainer } from '../../styled/shared';

export default function GettingStartedScreen({ navigation }) {
  const buttonNavigation = (screenId) => {
    navigation.navigate(screenId);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 60,
      }}>
      <NavHeaderContainer
        noShadow
        paddingTop={0}
        alignItems="center"
        justifyContent="space-between"
        height={Window.height * (12 / 100)}>
        <Image
          source={bannerLogo}
          resizeMode="contain"
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </NavHeaderContainer>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2%',
          height: Window.height * (69 / 100),
        }}>
        <HowItWorksView onPress={() => navigation.navigate(STORES)}>
          <Text
            style={{
              fontSize: 18,
              height: '100%',
              width: '100%',
              paddingRight: '5%',
              paddingLeft: '5%',
              textAlign: 'center',
              color: 'black',
            }}>
            DC Central Kitchen partners with corner stores across D.C. to bring
            affordable, fresh produce close to home
          </Text>
        </HowItWorksView>
        <View>
          <HowItWorksButton onPress={() => buttonNavigation('Stores')}>
            <Image
              source={require('../../assets/images/Carrot_White.png')}
              style={{
                maxWidth: '30%',
                marginRight: 8,
                resizeMode: 'contain',
                height: 100,
              }}
            />
            <ColumnContainer style={{ flex: 1 }}>
              <RewardButtonTitle>Find Stores Near You</RewardButtonTitle>
              <RewardButtonSubtitle>
                Explore the map to find nearby stores stocking healthy fruits
                and vegetables
              </RewardButtonSubtitle>
            </ColumnContainer>
            <FontAwesome5
              style={{ marginRight: 30 }}
              name="arrow-right"
              solid
              size={25}
              color="white"
            />
          </HowItWorksButton>

          <HowItWorksButton onPress={() => buttonNavigation('Recipes')}>
            <Image
              source={require('../../assets/images/Groceries_White.png')}
              style={{
                maxWidth: '30%',
                marginRight: 8,
                resizeMode: 'contain',
                height: 100,
              }}
            />
            <ColumnContainer style={{ flex: 1 }}>
              <RewardButtonTitle>Browse Recipes</RewardButtonTitle>
              <RewardButtonSubtitle>
                Search for your favorite delicious Healthy Corners recipes
              </RewardButtonSubtitle>
            </ColumnContainer>
            <FontAwesome5
              style={{ marginRight: 30 }}
              name="arrow-right"
              solid
              size={25}
              color="white"
            />
          </HowItWorksButton>

          <HowItWorksButton onPress={() => buttonNavigation('Resources')}>
            <Image
              source={require('../../assets/images/Stay_Informed_White.png')}
              style={{
                maxWidth: '30%',
                marginRight: 8,
                resizeMode: 'contain',
                height: 100,
              }}
            />
            <ColumnContainer style={{ flex: 1 }}>
              <RewardButtonTitle>Stay Informed</RewardButtonTitle>
              <RewardButtonSubtitle>
                Connect with resources to access benefits and tools for healthy
                living
              </RewardButtonSubtitle>
            </ColumnContainer>
            <FontAwesome5
              style={{ marginRight: 30 }}
              name="arrow-right"
              solid
              size={25}
              color="white"
            />
          </HowItWorksButton>
        </View>
      </View>
    </View>
  );
}

GettingStartedScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
