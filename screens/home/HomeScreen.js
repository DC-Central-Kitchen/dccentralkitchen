import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import iconTrans from '../../assets/images/icon_trans.png';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import Window from '../../constants/Layout';
import { RESOURCES, STORES } from '../../constants/ScreenNames';
import {
  HowItWorksButton,
  HowItWorksView,
  RewardButtonSubtitle,
  RewardButtonTitle,
} from '../../styled/rewards';
import { ColumnContainer } from '../../styled/shared';

const HomeScreen = (props) => {
  return (
    <View style={styles.slideContainer}>
      <NavHeaderContainer>
        <NavButtonContainer
          onPress={() => props.navigation.navigate('Recipes')}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </NavButtonContainer>
        <NavTitle>Recipes</NavTitle>
      </NavHeaderContainer>
      <Image
        source={iconTrans}
        resizeMode="contain"
        style={{
          height: '50px',
        }}
      />
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2%',
          height: Window.height * (75 / 100),
        }}>
        <View>
          <HowItWorksButton onPress={() => props.navigation.navigate(STORES)}>
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

          <HowItWorksButton
            onPress={() => props.navigation.navigate('Recipes')}>
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

          <HowItWorksButton
            onPress={() => props.navigation.navigate(RESOURCES)}>
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
          <HowItWorksView
            style={{ paddingBottom: 0, marginBottom: 12 }}
            onPress={() => props.navigation.navigate(STORES)}>
            <Text
              style={{
                height: '100%',
                width: '100%',
                paddingRight: '5%',
                paddingLeft: '5%',
                textAlign: 'center',
                color: 'black',
              }}>
              DC Central Kitchen partners with corner stores across D.C. to
              bring affordable, fresh produce close to home
            </Text>
          </HowItWorksView>
        </View>
      </View>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
  },
  listView: {
    width: '100%',
    justifyContent: 'flex-start',
    elevation: 1,
  },
  listContainer: {
    elevation: 1,
  },
  list: {
    justifyContent: 'flex-end',
    elevation: 1,
  },
  container: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    elevation: 1,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: -1,
  },
});
