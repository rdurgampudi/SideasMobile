import 'react-native-gesture-handler';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Image, StyleSheet} from 'react-native';

import LandingPage from './LandingPage';
import NewIdea from './NewIdea';
import IdeaDetail from './IdeaDetail';
import Menu from './Menu';
import Ideas from './Ideas';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import SplashScreen from 'react-native-splash-screen';

import * as font from './styles/fonts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

function IdeaStack() {
  return (
    <Stack.Navigator initialRouteName="Ideas" options={{headerShown: false}}>
      <Stack.Screen
        name="Ideas"
        component={Ideas}
        options={{
          headerShown: false,
          headerForceInset: {top: 'never', bottom: 'never'},
        }}
      />
      <Stack.Screen
        name="Idea Detail"
        component={IdeaDetail}
        options={{
          headerMode: 'screen',
          transitionConfig: () => ({
            containerStyle: {
              marginTop: -40,
            },
          }),
          headerForceInset: {top: 'never', bottom: 'never'},
          headerTintColor: 'white',
          title: '',
          headerStyle: {
            backgroundColor: '#1B75BC',
          },
          headerTitleStyle: {color: 'white'},
        }}
        Options={{
          headerStyle: {
            backgroundColor: '#1B75BC',
          },
          headerTitleStyle: {color: 'white'},
          headerForceInset: {top: 'never', bottom: 'never'},
        }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
function LandingPageStack() {
  return (
    <Stack.Navigator
      initialRouteName="LandingPage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
function NewIdeaStack() {
  return (
    <Stack.Navigator
      initialRouteName="NewIdea"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="NewIdea" component={NewIdea} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
function MenuStack() {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
}
SplashScreen.hide();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1B75BC',
    accent: 'yellow',
    backgroundColor: 'white',
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#FF9D00',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {height: 56, backgroundColor: '#1B75BC'},
          }}
          initialRouteName="LandingPage"
          tabBarOptions={{
            activeTintColor: '#FF9D00',
            labelStyle: styles.labelStyle,
          }}>
          <Tab.Screen
            name="LandingPageStack"
            component={LandingPageStack}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color, size}) => {
                return (
                  <Image
                    style={styles.tabBarIconStyle}
                    resizeMode="contain"
                    source={require('../src/images/hometab.svg')}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            screenOptions={{headerShown: false}}
            name="IdeaStack"
            component={IdeaStack}
            options={{
              tabBarLabel: 'Ideas',
              tabBarIcon: ({color, size}) => {
                return (
                  <Image
                    style={styles.tabBarIconStyle}
                    resizeMode="contain"
                    source={require('../src/images/idea.svg')}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="NewIdeaStack"
            component={NewIdeaStack}
            options={{
              tabBarLabel: 'New Idea',
              tabBarIcon: ({color, size}) => {
                return (
                  <Image
                    style={styles.tabBarIconStyle}
                    resizeMode="contain"
                    source={require('../src/images/post.svg')}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="MenuStack"
            component={MenuStack}
            options={{
              tabBarLabel: 'More',
              tabBarIcon: ({color, size}) => {
                return (
                  <Image
                    style={styles.tabBarIconStyle}
                    resizeMode="contain"
                    source={require('../src/images/more.svg')}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 11,
    fontFamily: font.font_Bold,
    paddingBottom: 5,
  },
  tabStyle: {
    padding: 10,
    fontFamily: font.font_Bold,
  },
  tabBarIconStyle: {
    width: 24,
    height: 24,
    padding: 5,
  },
});

export default App;
