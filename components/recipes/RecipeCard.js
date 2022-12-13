import PropTypes from 'prop-types';
import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
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
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Recipe', { item });
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
          <Subtitle numberOfLines={2} style={{ color: 'white' }}>
            {item.title}
          </Subtitle>
          {/* <Body color={Colors.secondaryText}>{item.description}</Body> */}
        </ContentContainer>
      </RecipeItemCard>
    </TouchableOpacity>
  );
}

RecipeCard.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  subtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
