import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  const [currentUrl, setCurrentUrl] = useState(uri);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    setCurrentUrl(URL);
  }, [URL]);

  const backButtonHandler = () => {
    if (webViewRef.current) webViewRef.current.goBack();
  };

  const frontButtonHandler = () => {
    if (webViewRef.current) webViewRef.current.goForward();
  };

  useEffect(() => {
    if (canGoBack == true) {
      console.log(currentUrl, 'url');
    }
  }, [canGoBack]);

  const styles = StyleSheet.create({
    flexContainer: {
      flex: 1,
    },
    tabBarContainer: { backgroundColor: '#008550' },
    btnBackgroud: {
      backgroundColor: '#008550',
      padding: 20,
      width: '100%',
      flexDirection: 'row',
      gap: 10,
    },

    button: {
      color: 'white',
      paddingLeft: 5,
      paddingRight: 5,
      alignItems: 'center',
    },
  });
  return (
    <View style={{ flex: 1 }}>
      <NavHeaderContainer>
        <NavButtonContainer onPress={() => navigation.toggleDrawer()}>
          <FontAwesome5 name="bars" solid size={24} />
        </NavButtonContainer>

        <NavTitle>{title}</NavTitle>
      </NavHeaderContainer>
      <WebView
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          setCanGoForward(navState.canGoForward);
          setCurrentUrl(navState.url);
        }}
        ref={webViewRef}
        allowsBackForwardNavigationGestures
        source={{ uri: currentUrl }}
        startInLoadingState
      />
      {currentUrl !== 'https://healthycorners.calblueprint.org/faq.html' &&
        canGoBack && (
          <View style={styles.tabBarContainer}>
            <TouchableOpacity
              onPress={backButtonHandler}
              disabled={!canGoBack}
              style={styles.btnBackgroud}>
              <View
                style={{
                  flexDirection: 'row',

                  width: '100%',
                  alignItems: 'center',

                  justifyContent: 'center',
                }}>
                <FontAwesome5
                  flex={1}
                  name="arrow-left"
                  solid
                  size={20}
                  color="white"
                  style={{
                    alignItems: 'center',
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                />
                <Text style={styles.button}>Back</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={frontButtonHandler}
              disabled={!canGoForward}
              style={
                !canGoForward
                  ? {
                      backgroundColor: '#BDBDBD',
                      padding: 20,
                      width: '50%',
                      alignItems: 'center',
                    }
                  : styles.btnBackgroud
              }>
              <Text style={styles.button}>Forward</Text>
            </TouchableOpacity> */}
          </View>
        )}
    </View>
  );
}
WebComponent.propTypes = {
  URL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
