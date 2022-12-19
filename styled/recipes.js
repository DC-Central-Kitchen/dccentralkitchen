import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width - 50;

export const RecipeItemCard = styled.View`
  border-bottom-width: 1px;
  border-color: ${Colors.lightestGray};
  margin: 10px;
  background-color: green;
  height: 240px;
  width: ${width / 2 - 5}px;
  border-radius: 10px;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
`;

export const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 0px 4px 0px 8px;
`;

export const CategoryCard = styled.View`
  background-color: ${Colors.lightestGray};
  padding: 10px 24px;
  flex-direction: row;
`;

export const CategoryHeadingContainer = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
`;
