/**
 * @format
 */

import {AppRegistry, StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';

import App from './App';
import {name as appName} from './app.json';
import BottomNavigator from './src/BottomNavigator';
import Login from './src/auth/Login';
import SignUp from './src/auth/SignUp';

const _Root = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar hidden={true} />
      <BottomNavigator />
    </SafeAreaView>
  );
};

AppRegistry.registerComponent(appName, () => _Root);
