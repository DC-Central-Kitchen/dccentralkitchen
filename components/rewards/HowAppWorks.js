import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { HowItWorksView } from '../../styled/rewards';
import { CardContainer } from '../../styled/shared';
import { Subtitle, Title } from '../BaseComponents';
import RewardsFAQ from './RewardsFAQ';
/**
 * @prop
 * */

function HowAppWorks() {
  return (
    <ScrollView
      style={{ display: 'flex' }}
      scrollIndicatorInsets={{ right: 1 }}>
      <View
        style={{
          display: 'flex',
          marginLeft: 16,
          paddingRight: 16,
          paddingTop: 24,
        }}>
        <HowItWorksView>
          <Image
            source={require('../../assets/images/Onboarding_2.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              height: 140,
              marginRight: 12,
            }}
          />
          <CardContainer style={{ flex: 1 }}>
            <Title>Find Stores Near You</Title>
            <Subtitle>
              Explore the map to find nearby stores stocking healthy fruits and
              vegetables
            </Subtitle>
          </CardContainer>
        </HowItWorksView>

        <HowItWorksView>
          <Image
            source={require('../../assets/images/Onboarding_3.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              height: 140,
              marginRight: 12,
            }}
          />
          <CardContainer style={{ flex: 1 }}>
            <Title>Browse Recipes</Title>
            <Subtitle>
              Search for your favorite delicious Healthy Corners recipes
            </Subtitle>
          </CardContainer>
        </HowItWorksView>

        <HowItWorksView>
          <Image
            source={require('../../assets/images/Onboarding_5.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              height: 140,
              marginRight: 12,
            }}
          />

          <CardContainer style={{ flex: 1 }}>
            <Title>Stay Informed</Title>
            <Subtitle>
              Access our resource database to help you continue eating and
              living healthy
            </Subtitle>
          </CardContainer>
        </HowItWorksView>
      </View>

      <RewardsFAQ />
    </ScrollView>
  );
}

export default React.memo(HowAppWorks);
