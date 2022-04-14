import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from './styles/theme.style';
import * as font from './styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import ToastHandler from './ToastHandler';
import moment from 'moment';

const Menu = props => {
  const [isToast, setIsToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState(false);
  const [userId, setuserId] = React.useState('');
  const [firstName, setfirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');
  const [email, setemail] = React.useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('userId').then(userId => {
        setuserId(userId);
      });
      AsyncStorage.getItem('firstName').then(firstName => {
        setfirstName(firstName);
      });
      AsyncStorage.getItem('lastName').then(lastName => {
        setlastName(lastName);
      });
      AsyncStorage.getItem('email').then(email => {
        setemail(email);
      });
    });
    return unsubscribe;
  }, [props.navigation]);

  const closeToast = () => {
    setToastMsg('');
    setIsToast(false);
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 400}}
      style={{backgroundColor: 'white'}}>
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: hp('10%'),
          }}>
          <Image
            style={{width: wp('25%'), height: wp('25%')}}
            resizeMode="contain"
            source={require('../src/images/abstract-user-flat-4.svg')}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: theme.FONT_SIZE_LARGE,
                fontFamily: font.font_Bold,
                color: 'black',
              }}>
              {firstName &&
              firstName.length > 0 &&
              lastName &&
              lastName.length > 0
                ? firstName + ' ' + lastName
                : ''}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: theme.FONT_SIZE_NORMAL,
                fontFamily: font.font_Normal,
                marginBottom: 15,
                color: 'black',
              }}>
              {email && email.length > 0 ? email : ''}
            </Text>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setToastMsg('Upcoming Feature');
                  setIsToast(true);
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: wp('80%'),
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <Image
                      style={{width: wp('5%'), height: wp('5%')}}
                      resizeMode="contain"
                      source={require('../src/images/bookmarks.svg')}
                    />
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: theme.FONT_SIZE_NORMAL,
                        fontFamily: font.font_Normal,
                        marginLeft: 15,
                        marginRight: 45,
                        color: 'black',
                      }}>
                      Bookmarks
                    </Text>
                  </View>
                  <Image
                    style={{width: wp('5%'), height: wp('5%')}}
                    resizeMode="contain"
                    source={require('../src/images/fi-rr-angle-right.svg')}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {/*Notifications*/}
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setToastMsg('Upcoming Feature');
                  setIsToast(true);
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: wp('80%'),
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <Image
                      style={{width: wp('5%'), height: wp('5%')}}
                      resizeMode="contain"
                      source={require('../src/images/fi-rr-bell.svg')}
                    />
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: theme.FONT_SIZE_NORMAL,
                        fontFamily: font.font_Normal,
                        marginLeft: 15,
                        marginRight: 45,
                        color: 'black',
                      }}>
                      Notifications
                    </Text>
                  </View>
                  <Image
                    style={{width: wp('5%'), height: wp('5%')}}
                    resizeMode="contain"
                    source={require('../src/images/fi-rr-angle-right.svg')}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: wp('80%'),
                height: 2,
                marginTop: 20,
                alignSelf: 'center',
                backgroundColor: '#F5F5F5',
              }}
            />
            {/*Edit Profile*/}
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setToastMsg('Upcoming Feature');
                  setIsToast(true);
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: wp('80%'),
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <Image
                      style={{width: wp('5%'), height: wp('5%')}}
                      resizeMode="contain"
                      source={require('../src/images/editprofile.svg')}
                    />
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: theme.FONT_SIZE_NORMAL,
                        fontFamily: font.font_Normal,
                        marginLeft: 15,
                        marginRight: 45,
                        color: 'black',
                      }}>
                      Edit Profile
                    </Text>
                  </View>
                  <Image
                    style={{width: wp('5%'), height: wp('5%')}}
                    resizeMode="contain"
                    source={require('../src/images/fi-rr-angle-right.svg')}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {/*Change Password*/}
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setToastMsg('Upcoming Feature');
                  setIsToast(true);
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: wp('80%'),
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <Image
                      style={{width: wp('5%'), height: wp('5%')}}
                      resizeMode="contain"
                      source={require('../src/images/icon.svg')}
                    />
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: theme.FONT_SIZE_NORMAL,
                        fontFamily: font.font_Normal,
                        marginLeft: 15,
                        marginRight: 45,
                        color: 'black',
                      }}>
                      Change Password
                    </Text>
                  </View>
                  <Image
                    style={{width: wp('5%'), height: wp('5%')}}
                    resizeMode="contain"
                    source={require('../src/images/fi-rr-angle-right.svg')}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={async () => {
                  let accessToken = await AsyncStorage.getItem('accessToken');
                  console.log('menu item accessToken', accessToken);

                  fetch(
                    'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/signout',
                    {
                      method: 'POST',
                      body: null,
                      headers: {
                        Authorization: accessToken,
                        'Content-Type': 'application/json',
                        'Accept-Language': 'en-US',
                        AccessToken: accessToken,
                      },
                    },
                  )
                    .then(response => {
                      return response.json();
                    })
                    .then(async data => {
                      console.log(
                        'signout  SERVICE SUCCESS ',
                        JSON.stringify(data),
                      );
                      setemail('');
                      setfirstName('');
                      setlastName('');
                      setToastMsg('Logged Out Successfully');
                      setIsToast(true);
                      await AsyncStorage.setItem('userId', '');
                      await AsyncStorage.setItem('accessToken', '');
                      props.navigation.dispatch({
                        ...CommonActions.reset({
                          index: 0,
                          routes: [{name: 'LandingPage'}],
                        }),
                      });
                      return true;
                    })
                    .catch(error => {
                      console.log('error', error);
                    });
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: wp('80%'),
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <Image
                      style={{width: wp('5%'), height: wp('5%')}}
                      resizeMode="contain"
                      source={require('../src/images/icon.svg')}
                    />
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: theme.FONT_SIZE_NORMAL,
                        fontFamily: font.font_Normal,
                        marginLeft: 15,
                        marginRight: 45,
                        color: 'black',
                      }}>
                      Log Out
                    </Text>
                  </View>
                  <Image
                    style={{width: wp('5%'), height: wp('5%')}}
                    resizeMode="contain"
                    source={require('../src/images/fi-rr-angle-right.svg')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ToastHandler
          isToast={isToast}
          closeToast={closeToast}
          toastMsg={toastMsg}
        />
      </View>
    </ScrollView>
  );
};

export default Menu;
