import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { NavButton } from '../components/BaseComponents';
import Colors from '../constants/Colors';
import { ColumnContainer } from './shared';

// TODO @tommypoa: Consider creating re-usable containers taking in props for the 3 Auth screens

// Shared Auth Containers

export const AuthScreenContainer = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : null,
})`
  flex: 1;
  margin: 50px 42px 0 42px;
  background-color: ${Colors.lightest};
`;

// OnboardingScreen
export const OnboardingContainer = styled.View`
  display: flex;
  flex: 1
  justify-content: center;
  background-color: ${Colors.lightest};
  margin: 200px 40px 75px 40px;
`;

// WelcomeScreen
// TODO @tommypoa: margin-top should be corrected to sit right above keyboard (as in LogIn and SignUp screens)
export const WelcomeContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.lightest};
  margin: 241px 42px;
`;

export const WelcomeTitleContainer = styled.View`
  margin: 0 12.5%;
`;

export const WelcomeLogInContainer = styled.View`
  width: 100%
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// LogInScreen

// Margin-top value is 140 (figma) - 36 (input margin bottom) = 104px.

export const ForgotPasswordButtonContainer = styled.View`
  margin-top: 13px;
`;

// Used in AuthTextField
// Hardcoded 80px to avoid having the animations when errors show for LoginScreen
export const TextFieldContainer = styled.View`
  margin-bottom: 24px;
  height: 80px;
`;

export const FormContainer = styled(ColumnContainer)`
  justify-content: center;
  align-items: stretch;
  margin-top: 20px;
`;

export const BackButton = styled(NavButton)`
  position: relative;
  top: 0;
  left: -8px;
  margin-bottom: 8px;
`;

// OnboardingScreen pagination styles
export const styles = StyleSheet.create({
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 1,
    backgroundColor: Colors.primaryGreen,
  },
});
