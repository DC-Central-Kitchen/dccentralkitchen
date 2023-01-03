import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Gesture, GestureDetector, State } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import bannerLogo from '../../assets/images/banner_logo.png';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import Window from '../../constants/Layout';

const Recipe = (props) => {
  const { item } = props.route.params;
  const [scale, setScale] = useState(1);

  function updateShare(arg) {
    setScale(arg);
  }

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      // console.log(e.scale, 'scale');
      if (e.scale >= 0.5 && e.scale <= 2) {
        runOnJS(updateShare)(e.scale);
      }
      if (e.state === State.END) {
        runOnJS(updateShare)(1);
      }
    })
    .onEnd((e) => {
      runOnJS(updateShare)(1);
    });

  return (
    <View>
      <NavHeaderContainer>
        <NavButtonContainer
          onPress={() => props.navigation.navigate('Recipes')}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </NavButtonContainer>
        <NavTitle>Recipes</NavTitle>
      </NavHeaderContainer>

      <View style={styles.listView}>
        <ScrollView style={styles.container}>
          <GestureDetector gesture={pinchGesture}>
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [{ scale }],
                },
              ]}>
              <Image
                source={bannerLogo}
                resizeMode="contain"
                style={{
                  height: 100,
                  display: 'flex',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  width: 250,
                }}
              />

              <Text style={styles.heading}>{item.title}</Text>
              <View style={{ alignItems: 'center' }}>
                <Image
                  style={styles.bigPicture}
                  source={{
                    uri: item.image[0].thumbnails.large.url,
                  }}
                  alt={`${item.title}`}
                />
              </View>
              <View style={styles.timeContainer}>
                <View style={styles.col}>
                  <Text
                    style={{
                      fontSize: 20,
                    }}>
                    Prep Time:
                  </Text>
                  <Text>{`${item.prepTimeminutes} min`}</Text>
                </View>
                {item.cookTimeminutes && (
                  <View style={styles.col}>
                    <Text
                      style={{
                        fontSize: 20,
                      }}>
                      Cook Time:
                    </Text>
                    <Text>{`${item.cookTimeminutes} min`}</Text>
                  </View>
                )}
                <View style={styles.col}>
                  <Text
                    style={{
                      fontSize: 20,
                    }}>
                    Servings:
                  </Text>
                  <Text>{item.servings}</Text>
                </View>
              </View>

              <Text style={[styles.subHeading]}>Ingredients</Text>

              <Text style={styles.textContainer}>{item.ingredients}</Text>

              <Text style={[styles.subHeading]}>Instructions</Text>

              <Text style={styles.textContainer}>{item.instructions}</Text>
            </Animated.View>
          </GestureDetector>
        </ScrollView>
      </View>
    </View>
  );
};

Recipe.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  listView: {
    height: Window.height - 120, // calc
    width: '100%',
    flexGrow: 1,
    justifyContent: 'flex-start',
    elevation: 1,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
  },
  subHeading: {
    textAlign: 'center',
    width: '100%',
    fontSize: 20,
  },
  bigPicture: {
    marginVertical: 20,
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  logo: {
    width: 66,
    height: 58,
  },
  textContainer: {
    margin: 30,
  },
  col: {
    flexDirection: 'column',
    padding: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
});

export default Recipe;
