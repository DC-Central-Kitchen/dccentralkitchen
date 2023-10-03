import { useNavigation } from '@react-navigation/native';

import analytics from '@react-native-firebase/analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { CardContainer } from '../../styled/shared';
import { ButtonContainer, Overline, Subtitle } from '../BaseComponents';

export default function ParticipatingStores({ participating, guest }) {
  const navigation = useNavigation();
  return (
    <CardContainer
      style={
        guest
          ? { marginLeft: 16, marginBottom: 40, marginTop: 28 }
          : { marginBottom: 40, marginTop: 28 }
      }>
      <Overline>Participating Stores</Overline>
      {participating.map((store) => {
        return (
          <ButtonContainer key={store.id}>
            <Subtitle
              style={{ marginLeft: 12 }}
              onPress={() => {
                analytics().logEvent('participating_store_clicked', {
                  store_name: store.storeName,
                });
                navigation.navigate('Stores', {
                  currentStore: store,
                });
              }}>
              {store.storeName}
            </Subtitle>
          </ButtonContainer>
        );
      })}
      <Subtitle style={{ marginLeft: 12 }}>More stores coming soon!</Subtitle>
    </CardContainer>
  );
}

ParticipatingStores.propTypes = {
  participating: PropTypes.array.isRequired,
  guest: PropTypes.bool.isRequired,
};
