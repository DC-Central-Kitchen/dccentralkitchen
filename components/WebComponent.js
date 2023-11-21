import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from './BaseComponents';

export default function WebComponent({ URL, title }) {
  const webViewRef = useRef();
  const navigation = useNavigation();
  const uri = URL;
  const [currrentUrl, setCurrentUrl] = useState(uri);
  useEffect(() => {
    setCurrentUrl(URL);
  }, [URL]);

  return (
    <View style={{ flex: 1 }}>
      <NavHeaderContainer>
        <NavButtonContainer onPress={() => navigation.toggleDrawer()}>
          <FontAwesome5 name="bars" solid size={24} />
        </NavButtonContainer>

        <NavTitle>{title}</NavTitle>
      </NavHeaderContainer>
      <WebView
        onNavigationStateChange={({ url }) => setCurrentUrl(url)}
        ref={webViewRef}
        allowsBackForwardNavigationGestures
        source={{ uri }}
      />
    </View>
  );
}
WebComponent.propTypes = {
  URL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
