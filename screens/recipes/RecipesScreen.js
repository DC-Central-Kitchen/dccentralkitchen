import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import bannerLogo from '../../assets/images/banner_logo.png';
import {
  NavButtonContainer,
  NavHeaderContainer,
} from '../../components/BaseComponents';
import RecipeCard from '../../components/recipes/RecipeCard';
import { getAllRecipes } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';

export default class RecipesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      allRecipes: [],
      search: '',
    };
  }

  async componentDidMount() {
    try {
      const recipes = await getAllRecipes();
      this.setState({ recipes, allRecipes: recipes });
    } catch (err) {
      logErrorToSentry({
        screen: 'RecipesScreen',
        action: 'componentDidMount',
        error: err,
      });
    }
  }

  updateSearch = async (search) => {
    const { allRecipes } = this.state;
    const filteredSearch = allRecipes.filter((recipe) => {
      const lowerTitle = recipe.title.toLowerCase();
      return lowerTitle.includes(search.toLowerCase());
    });
    this.setState({ search, recipes: filteredSearch });
  };

  render() {
    return (
      <View style={styles.slideContainer}>
        <NavHeaderContainer>
          <NavButtonContainer
            onPress={() => this.props.navigation.toggleDrawer()}>
            <FontAwesome5 name="bars" solid size={24} />
          </NavButtonContainer>
          <Image
            source={bannerLogo}
            resizeMode="contain"
            style={{
              display: 'flex',
              marginRight: 'auto',
              width: '80%',
              height: 70,
            }}
          />
        </NavHeaderContainer>
        <Text
          style={{
            width: '80%',
            textAlign: 'center',
            marginRight: 'auto',
            marginLeft: 'auto',
            paddingTop: 10,
            paddingBottom: 10,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Search for your favorite Healthy Corners recipes
        </Text>
        <Searchbar
          placeholder="Search"
          iconColor="black"
          onChangeText={this.updateSearch}
          value={this.state.search}
        />

        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.recipes}
          numColumns={2}
          initialNumToRender={8}
          renderItem={({ item }) => (
            <RecipeCard navigation={this.props.navigation} item={item} />
          )}
        />
      </View>
    );
  }
}

RecipesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  subtitle: {
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  slideContainer: {
    flex: 1,
  },
  listView: {
    width: '100%',
    justifyContent: 'flex-start',
    elevation: 1,
  },
  listContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  list: {
    elevation: 1,
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    elevation: 1,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: -1,
  },
});
