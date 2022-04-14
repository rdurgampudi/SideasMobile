import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from './styles/theme.style';
import * as font from './styles/fonts';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingPage = props => {
  const styles = StyleSheet.create({
    container: {
      height: hp('70%'),
      width: wp('100%'),
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignContent: 'center',
      padding: wp('10%'),
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: 'white'}}
      contentContainerStyle={{paddingBottom: 150, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Text
          numberOfLines={4}
          style={{
            color: '#000000',
            fontSize: theme.FONT_SIZE_LARGE,
            fontFamily: font.font_Bold,
            marginLeft: 5,
          }}>
          Ideate.
        </Text>
        <Text
          numberOfLines={4}
          style={{
            color: '#000000',
            fontSize: theme.FONT_SIZE_LARGE,
            fontFamily: font.font_Bold,
            marginLeft: 5,
          }}>
          Innovate.
        </Text>
        <Text
          numberOfLines={4}
          style={{
            color: '#000000',
            fontSize: theme.FONT_SIZE_LARGE,
            fontFamily: font.font_Bold,
            marginLeft: 5,
          }}>
          Grow.
        </Text>
        <Text
          numberOfLines={4}
          style={{
            color: '#000000',
            fontSize: theme.FONT_SIZE_MEDIUM,
            fontFamily: font.font_Medium,
            marginLeft: 5,
            marginTop: 15,
          }}>
          Give your creativity a boost with The Sideas
        </Text>

        <TouchableOpacity
          style={{
            width: wp('70%'),
            height: wp('16%'),
            backgroundColor: '#FF9D00',
            alignItems: 'center',
            alignContent: 'center',
            padding: 10,
            justifyContent: 'center',
            marginTop: 25,
          }}
          onPress={async () => {
            AsyncStorage.getItem('userId').then(userId => {
              console.log('Got an Idea? Post Here', userId);
              if (userId === null || (userId && userId.length === 0)) {
                props.navigation.navigate('Login');
                // props.navigation.dispatch({
                //   ...CommonActions.reset({
                //     index: 1,
                //     routes: [{name: 'LandingPage'}],
                //   }),
                // });
              } else {
                props.navigation.dispatch({
                  ...CommonActions.reset({
                    index: 0,
                    routes: [{name: 'NewIdeaStack'}],
                  }),
                });
              }
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={4}
              style={{
                flex: 1,
                color: '#FFFFFF',
                fontSize: theme.FONT_SIZE_MEDIUM,
                fontFamily: font.font_Bold,
                marginLeft: 5,
              }}>
              Got an Idea? Post Here
            </Text>
            <Image
              style={{width: wp('4%'), height: wp('4%')}}
              resizeMode="contain"
              source={require('../src/images/rightArrow.svg')}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: wp('70%'),
            height: wp('16%'),
            backgroundColor: '#2760D3',
            alignItems: 'center',
            marginTop: 25,
            padding: 10,
            alignContent: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            console.log('Explore Ideas');
            props.navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [{name: 'IdeaStack'}],
              }),
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={4}
              style={{
                flex: 1,
                color: '#FFFFFF',
                fontSize: theme.FONT_SIZE_MEDIUM,
                fontFamily: font.font_Bold,
                marginLeft: 5,
              }}>
              Explore Ideas
            </Text>
            <Image
              style={{width: wp('4%'), height: wp('4%')}}
              resizeMode="contain"
              source={require('../src/images/rightArrow.svg')}></Image>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LandingPage;
