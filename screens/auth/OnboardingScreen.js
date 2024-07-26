/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/jsx-curly-brace-presence */
import PropTypes from 'prop-types';
import React from 'react';
import { Image, Platform, View } from 'react-native';
import { Text } from 'react-native-elements';
import 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  Body,
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
  Title,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import ONBOARDING_CONTENT from '../../constants/Onboarding';
import RecordIds from '../../constants/RecordIds';
import { setAsyncCustomerAuth } from '../../lib/authUtils';
import {
  OnboardingContainer,
  OnboardingContentContainer,
  styles,
} from '../../styled/auth';
import { CardContainer } from '../../styled/shared';

export default class OnboardingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pageIndex: 0,
    };
    // this.setState = this.setState.bind(this);
    // this.state = this.setState.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false, pageIndex: 0 });
    }, 10);
  }

  get pagination() {
    return (
      // TODO @tommypoa: Move styles to styled folder?
      <Pagination
        dotsLength={ONBOARDING_CONTENT.length}
        activeDotIndex={this.state.pageIndex}
        containerStyle={{ backgroundColor: Colors.bgLight, marginTop: 20 }}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={{ backgroundColor: Colors.primaryGray }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }

  _renderItem = ({ item, index }) => {
    return (
      <OnboardingContentContainer>
        <Image
          source={item.illustration}
          resizeMode="contain"
          style={{
            height: Window.height < 800 ? '55%' : '65%',
            width: '100%',
            margin: 0,
          }}
        />
        <CardContainer>
          <Title style={{ textAlign: 'center' }}>{item.title}</Title>
          <Body style={{ marginTop: 12, textAlign: 'center' }}>
            {item.body}
          </Body>
        </CardContainer>
        {/* Display login/get started buttons */}
        {index === 3 && (
          <CardContainer style={{ marginTop: 10 }}>
            <FilledButtonContainer
              width="100%"
              onPress={() => this.navigateAuth()}>
              <ButtonLabel color="white">Get started</ButtonLabel>
            </FilledButtonContainer>
            <ButtonContainer
              style={{ marginTop: 4, padding: 12 }}
              onPress={async () => this.guestLogin()}>
              <ButtonLabel noCaps color={Colors.primaryGreen}>
                Continue as guest
              </ButtonLabel>
            </ButtonContainer>
          </CardContainer>
        )}
      </OnboardingContentContainer>
    );
  };

  guestLogin = async () => {
    const customerObj = {
      id: RecordIds.guestCustomerId,
      showLandingScreen: true,
    };
    await setAsyncCustomerAuth(customerObj);
    // Analytics.logEvent('guest_login_complete', {
    //   installation_id: RecordIds.guestCustomerId,
    // });
    this.props.navigation.navigate('App');
  };

  navigateAuth() {
    this.props.navigation.navigate('PhoneNumber');
  }

  goToPage(newIndex) {
    this._carousel.snapToItem(newIndex);
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <OnboardingContainer>
        {/* Display sliding content: 80 = 2 * 40px for marginWidth
        containerCustomStyle height: 337 to bound the size of carousel
      */}
        <Carousel
          data={ONBOARDING_CONTENT}
          ref={(c) => {
            this._carousel = c;
          }}
          scrollEnabled={Platform.OS !== 'android'}
          renderItem={this._renderItem}
          onSnapToItem={(index) => {
            this.setState({ pageIndex: index });
          }}
          sliderWidth={Window.width - 80}
          itemWidth={Window.width - 80}
        />

        {/* Display pagination dots */}
        {this.pagination}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'space-between',
          }}>
          {this.state.pageIndex > 0 && (
            <ButtonContainer
              onPress={() => this.goToPage(this.state.pageIndex - 1)}>
              <Text>Back</Text>
            </ButtonContainer>
          )}

          {this.state.pageIndex < ONBOARDING_CONTENT.length - 1 && (
            <ButtonContainer
              style={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}
              onPress={() => this.goToPage(this.state.pageIndex + 1)}>
              <Text>Next</Text>
            </ButtonContainer>
          )}
        </View>
      </OnboardingContainer>
    );
  }
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
