import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, Platform, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { RECIPE } from '../../constants/ScreenNames';
import { ContentContainer, RecipeItemCard } from '../../styled/recipes';
import { IconContainer } from '../../styled/resources';
import { Subtitle } from '../BaseComponents';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
  },
});
function RecipeCard({ navigation, item }) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(RECIPE, { item });
      }}
      screenOptions={{
        drawerLabel: `${item.title}`,
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgLight },
        config,
      }}>
      <RecipeItemCard>
        <IconContainer>
          <Image
            resizeMode="cover"
            style={{
              height: 170,
              display: 'flex',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              width: '100%',
            }}
            source={{
              uri: item.image[0].thumbnails.large.url,
            }}
            alt={`${item.description}`}
          />
        </IconContainer>
        <ContentContainer style={styles.subtitle}>
          <Subtitle numberOfLines={2} style={{ color: 'white', flex: 3 }}>
            {item.title}
          </Subtitle>
          <FontAwesome5
            flex={1}
            name="arrow-right"
            solid
            size={25}
            color="white"
          />
          {/* <Body color={Colors.secondaryText}>{item.description}</Body> */}
        </ContentContainer>
      </RecipeItemCard>
    </Pressable>
  );
}

RecipeCard.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  subtitle: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: '100%',
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default RecipeCard;
