import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import bannerLogo from '../../assets/images/banner_logo.png';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';

const Recipe = (props) => {
  const { item } = props.route.params;
  const [instructionsList, setInstructionsList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [notes, setNotes] = useState(item.notes);

  useEffect(() => {
    if (item.instructions) {
      setInstructionsList(
        item.instructions
          .split(/\r?\n|\r|\n/g)
          .filter((instruction) => instruction)
      );
    }
  }, [item.instructions]);

  useEffect(() => {
    if (item.ingredients) {
      setIngredientsList(
        item.ingredients
          .split(/\r?\n|\r|\n/g)
          .filter((ingredient) => ingredient)
      );
    }
  }, [item.ingredients]);

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
                  marginBottom: 4,
                }}>
                Prep Time:
              </Text>
              <Text style={styles.timeText}>
                {`${item.prepTimeminutes} min`}
              </Text>
            </View>
            {item.cookTimeminutes && (
              <View style={styles.col}>
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 4,
                  }}>
                  Cook Time:
                </Text>
                <Text style={styles.timeText}>
                  {`${item.cookTimeminutes} min`}
                </Text>
              </View>
            )}
            <View style={styles.col}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 4,
                }}>
                Servings:
              </Text>
              <Text style={styles.timeText}>{item.servings}</Text>
            </View>
          </View>

          <NavTitle style={styles.subHeading}>Ingredients</NavTitle>
          {ingredientsList.map((ingredient) => {
            return (
              <View style={styles.ingredientsContainer} key={`${ingredient}`}>
                <Text style={styles.ingredient}>{`• ${ingredient}`}</Text>
              </View>
            );
          })}
          <View style={!notes ? { marginBottom: 80 } : {}}>
            <NavTitle style={styles.subHeading}>Instructions</NavTitle>
            {instructionsList.map((instruction) => {
              return (
                <Text key={`${instruction}`} style={styles.instruction}>
                  {instruction}
                </Text>
              );
            })}
          </View>
          {notes && <NavTitle style={styles.subHeading}>Notes</NavTitle>}
          {notes && (
            <View style={{ marginBottom: 100 }}>
              <Text style={styles.notes}>{item.notes}</Text>
            </View>
          )}
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
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
  },
  subHeading: {
    textAlign: 'center',
    width: '100%',
    fontSize: 25,
    marginTop: 20,
    marginBottom: 7,
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
  instruction: {
    margin: 10,
    fontSize: 18,
    lineHeight: 30,
  },
  notes: {
    margin: 10,
    fontSize: 18,
    lineHeight: 30,
  },
  instructionsContainer: {
    margin: 3,
    borderRadius: 20,
    backgroundColor: Colors.primaryGreen,
    padding: 1,
  },
  ingredientsContainer: {
    margin: 3,
    borderBottomColor: Colors.primaryGreen,
    borderBottomWidth: 2,
    padding: 1,
  },
  ingredient: {
    margin: 10,
    color: 'black',
    fontSize: 18,
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
  },
  timeText: {
    fontSize: 15,
  },
});

export default Recipe;
