import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import theme from './styles/theme.style';
import * as font from './styles/fonts';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastHandler from './ToastHandler';

const IdeaItem = props => {
  const [isToast, setIsToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState(false);

  const closeToast = () => {
    setToastMsg('');
    setIsToast(false);
  };

  let createdOn = props.item.createdOn;
  let date = '';
  createdOn = createdOn.split(' ');
  if (createdOn.length > 0) {
    createdOn = createdOn[0];
    date = moment(createdOn, 'YYYY-MM-DD').fromNow();
  }

  return (
    <View
      style={{
        width: wp('95%'),
        backgroundColor: 'white',
        borderRadius: 7,
        padding: wp('2%'),
        marginTop: wp('2%'),
      }}>
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              width: wp('5%'),
              height: wp('5%'),
              borderRadius: wp('5%'),
              backgroundColor: '#C4C4C4',
              marginTop: 5,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
            }}>
            <TouchableOpacity
              disabled={true}
              onPress={() => {
                props.navigation.navigate('Idea Detail', {
                  _item: props.item,
                  navigation: props.navigation,
                });
              }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: theme.FONT_SIZE_MINI_LARGE,
                  fontFamily: font.font_Bold,
                  marginLeft: 10,
                  color: 'black',
                }}>
                {props.item.title}
              </Text>
              <Text
                numberOfLines={8}
                style={{
                  color: 'black',
                  marginTop: 10,
                  width: wp('80%'),
                  fontSize: theme.FONT_SIZE_NORMAL,
                  fontFamily: font.font_Normal,
                  marginLeft: 10,
                }}>
                {props.item.desc}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: wp('80%'),
                alignItems: 'center',
                marginTop: 15,
                marginBottom: 15,
              }}>
              <Text style={{flex: 1}}></Text>
              <TouchableOpacity
                onPress={() => {
                  setToastMsg('Upcoming Feature');
                  setIsToast(true);
                }}>
                <Image
                  style={{width: wp('6%'), height: wp('6%')}}
                  resizeMode="contain"
                  source={require('../src/images/share.svg')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Idea Detail', {_item: props.item});
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      numberOfLines={8}
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        alignContent: 'flex-end',
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                        color: '#D0D0D0',
                        fontSize: theme.FONT_SIZE_NORMAL,
                        fontFamily: font.font_Medium,
                      }}>
                      Read more
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}>
              {props.item.userData &&
              props.item.userData.firstName &&
              props.item.userData.firstName.length > 0 ? (
                <Text
                  numberOfLines={4}
                  style={{
                    color: '#2F6BFD',
                    fontSize: theme.FONT_SIZE_MEDIUM,
                    fontFamily: font.font_Bold,
                    marginLeft: 10,
                  }}>
                  {props.item.userData.firstName}
                </Text>
              ) : null}
              <Text
                numberOfLines={4}
                style={{
                  color: '#D0D0D0',
                  fontSize: theme.FONT_SIZE_NORMAL,
                  fontFamily: font.font_Medium,
                  marginLeft: 10,
                }}>
                {date}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <TouchableOpacity
                  disabled={props.item.isLiked > 0}
                  style={{
                    width: wp('10%'),
                    height: wp('10%'),
                    borderRadius: wp('10%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      props.item.isLiked > 0 ? '#1B75BC' : '#E9EEF0',
                  }}
                  onPress={async () => {
                    let userId = await AsyncStorage.getItem('userId');

                    if (userId === null || (userId && userId.length === 0)) {
                      props.navigation.navigate('Login');
                    } else {
                      let body = {
                        ideaId: props.item.ideaId,
                        isLike: 1,
                        userId: userId,
                      };
                      fetch(
                        'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/like',
                        {
                          method: 'POST',
                          body: JSON.stringify(body),
                          headers: {
                            Authorization: 'Environment.Accept',
                            'Content-Type': 'application/json',
                            'Accept-Language': 'en-US',
                          },
                        },
                      )
                        .then(response => {
                          return response.json();
                        })
                        .then(async data => {
                          let _item = props.item;
                          let likes =
                            props.item.likesCount > 0
                              ? props.item.likesCount
                              : 0;
                          likes = likes + 1;

                          _item['likesCount'] = likes;
                          props.updateIdeaItem(_item, props.index);
                        })
                        .catch(error => {
                          console.log('error', error);
                        });
                    }
                  }}>
                  <Image
                    style={{width: wp('5%'), height: wp('5%')}}
                    resizeMode="contain"
                    source={require('../src/images/like.svg')}
                  />
                </TouchableOpacity>

                <Text
                  numberOfLines={4}
                  style={{
                    color: '#605E5F',
                    fontSize: theme.FONT_SIZE_NORMAL,
                    fontFamily: font.font_Bold,
                    marginLeft: 10,
                  }}>
                  {props.item.likesCount > 0 ? props.item.likesCount : 0} Likes
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: wp('35%'),
                  height: wp('10%'),
                  borderRadius: wp('10%'),
                  backgroundColor: '#E9EEF0',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setToastMsg('Upcoming Feature');
                  setIsToast(true);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{width: wp('5%'), height: wp('5%')}}
                    resizeMode="contain"
                    source={require('../src/images/contribute.svg')}
                  />

                  <Text
                    numberOfLines={4}
                    style={{
                      color: '#605E5F',
                      fontSize: theme.FONT_SIZE_NORMAL,
                      fontFamily: font.font_Bold,
                      marginLeft: 5,
                    }}>
                    Contribute
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={props.item.isBookmarked > 0}
                style={{
                  backgroundColor:
                    props.item.isBookmarked > 0 ? '#1B75BC' : '#E9EEF0',
                  width: wp('10%'),
                  height: wp('10%'),
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp('10%'),
                }}
                onPress={async () => {
                  let userId = await AsyncStorage.getItem('userId');
                  if (userId === null || (userId && userId.length === 0)) {
                    props.navigation.navigate('Login');
                  } else {
                    let body = {
                      ideaId: props.item.ideaId,
                      isBookmark: 1,
                      userId: userId,
                    };

                    fetch(
                      'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/bookmark',
                      {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                          Authorization: 'Environment.Accept',
                          'Content-Type': 'application/json',
                          'Accept-Language': 'en-US',
                        },
                      },
                    )
                      .then(response => {
                        return response.json();
                      })
                      .then(async data => {
                        let _item = props.item;
                        _item['isBookmarked'] = 1;
                        props.updateIdeaItem(_item, props.index);
                      })
                      .catch(error => {
                        console.log('error', error);
                      });
                  }
                }}>
                <Image
                  style={{width: wp('5%'), height: wp('5%')}}
                  resizeMode="contain"
                  source={require('../src/images/bookmark.svg')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ToastHandler
            isToast={isToast}
            closeToast={closeToast}
            toastMsg={toastMsg}
          />
        </View>
      </View>
    </View>
  );
};

export default IdeaItem;
