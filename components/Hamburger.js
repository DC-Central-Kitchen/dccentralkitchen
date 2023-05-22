import { FontAwesome5 } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { MapButtonStyling } from '../styled/MapButtonStyling';

function Hamburger({ navigation }) {
  return (
    <MapButtonStyling
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <FontAwesome5 name="bars" solid size={24} />
    </MapButtonStyling>
  );
}

Hamburger.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Hamburger;
