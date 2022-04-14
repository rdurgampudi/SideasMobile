import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import theme from './styles/theme.style';
import * as font from './styles/fonts';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IdeaDetail = ({route, navigation}) => {
  const {_item} = route.params;
  let _ideaId = _item.ideaId;

  const [activityIndicator, set_activityIndicator] = useState(true);
  const [refreshData, set_refreshData] = useState(false);
  const [ideaId, set_ideaId] = useState(_ideaId);
  const [item, setItem] = useState(undefined);
  const [date, setdate] = useState('');
  const [likesCount, set_likesCount] = useState(_item.likesCount);
  const [isBookmarked, set_isBookmarked] = useState(_item.isBookmarked);
  const [isLiked, set_isLiked] = useState(_item.isLiked);
  const [comment, set_comment] = useState('');
  const [commentsData, set_commentsData] = useState([]);

  useEffect(() => {
    const ideaUrl =
      'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/idea?ideaId=' +
      ideaId;

    const fetchData = async () => {
      try {
        set_activityIndicator(true);
        const response = await fetch(ideaUrl);
        const data = await response.json();

        if (
          data &&
          data.status === 'success' &&
          data.response &&
          data.response.rows &&
          data.response.rows.length > 0
        ) {
          let itemTemp = data.response.rows[0];
          let createdOn = itemTemp.createdOn;
          let date = '';
          createdOn = createdOn.split(' ');
          if (createdOn.length > 0) {
            createdOn = createdOn[0];
            date = moment(createdOn, 'YYYY-MM-DD').fromNow();
            setdate(date);
          }
          setItem(itemTemp);

          const commentsResponse = await fetch(
            'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/comment?ideaId=' +
              ideaId,
          );
          const commentData = await commentsResponse.json();
          set_activityIndicator(false);
          if (
            commentData &&
            commentData.status &&
            commentData.status === 'success' &&
            commentData.response
          ) {
            set_commentsData(commentData.response);
          }
        } else {
          setItem(undefined);
        }
      } catch (error) {
        console.log('error', error);
        setItem(undefined);
        set_activityIndicator(false);
      }
    };
    fetchData();
  }, [ideaId, refreshData]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}
        style={{backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            padding: 10,
          }}>
          {!activityIndicator && item ? (
            <View style={{flex: 1}}>
              <View style={{backgroundColor: 'white'}}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        fontSize: theme.FONT_SIZE_LARGE,
                        fontFamily: font.font_Bold,
                        color: 'black',
                      }}>
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      {item.userData &&
                      item.userData.firstName &&
                      item.userData.firstName.length > 0 ? (
                        <Text
                          numberOfLines={4}
                          style={{
                            color: '#2F6BFD',
                            fontSize: theme.FONT_SIZE_MEDIUM,
                            fontFamily: font.font_Bold,
                          }}>
                          {item.userData.firstName}
                        </Text>
                      ) : null}
                      <Text
                        numberOfLines={4}
                        style={{
                          color: '#D0D0D0',
                          fontSize: theme.FONT_SIZE_NORMAL,
                          fontFamily: font.font_Normal,
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
                          disabled={isLiked > 0}
                          style={{
                            width: wp('10%'),
                            height: wp('10%'),
                            borderRadius: wp('10%'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor:
                              isLiked > 0 ? '#1B75BC' : '#E9EEF0',
                          }}
                          onPress={async () => {
                            let userId = await AsyncStorage.getItem('userId');
                            let accessToken = await AsyncStorage.getItem(
                              'accessToken',
                            );

                            if (
                              userId === null ||
                              (userId && userId.length === 0)
                            ) {
                              navigation.navigate('Login');
                            } else {
                              let body = {
                                ideaId: _item.ideaId,
                                isLike: 1,
                                userId: userId,
                              };
                              fetch(
                                'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/like',
                                {
                                  method: 'POST',
                                  body: JSON.stringify(body),
                                  headers: {
                                    Authorization: accessToken,
                                    'Content-Type': 'application/json',
                                    'Accept-Language': 'en-US',
                                  },
                                },
                              )
                                .then(response => {
                                  return response.json();
                                })
                                .then(async data => {
                                  let likes =
                                    _item.likesCount > 0 ? _item.likesCount : 0;
                                  likes = likes + 1;
                                  set_likesCount(likes);
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
                          {likesCount > 0 ? likesCount : 0} Likes
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
                          console.log('contribute');
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
                        disabled={isBookmarked > 0}
                        style={{
                          backgroundColor:
                            isBookmarked > 0 ? '#1B75BC' : '#E9EEF0',
                          width: wp('10%'),
                          height: wp('10%'),
                          marginLeft: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp('10%'),
                        }}
                        onPress={async () => {
                          let userId = await AsyncStorage.getItem('userId');
                          let accessToken = await AsyncStorage.getItem(
                            'accessToken',
                          );

                          if (
                            userId === null ||
                            (userId && userId.length === 0)
                          ) {
                            navigation.navigate('Login');
                          } else {
                            let body = {
                              ideaId: _item.ideaId,
                              isBookmark: 1,
                              userId: userId,
                            };

                            fetch(
                              'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/bookmark',
                              {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: {
                                  Authorization: accessToken,
                                  'Content-Type': 'application/json',
                                  'Accept-Language': 'en-US',
                                },
                              },
                            )
                              .then(response => {
                                return response.json();
                              })
                              .then(async data => {
                                console.log(
                                  ' SERVICE SUCCESS ',
                                  JSON.stringify(data),
                                );
                                set_isBookmarked(1);
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
                    <Text
                      style={{
                        color: '#000000',
                        marginTop: 20,
                        width: wp('90%'),
                        fontSize: theme.FONT_SIZE_NORMAL,
                        fontFamily: font.font_Normal,
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  alignSelf: 'center',
                  marginTop: 5,
                  marginBottom: 5,
                  backgroundColor: '#F5F5F5',
                }}
              />
              {item.categoryName && item.categoryName.length > 0 ? (
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: theme.FONT_SIZE_LARGE,
                    fontFamily: font.font_Bold,
                    color: 'black',
                    marginTop: 20,
                  }}>
                  Category
                </Text>
              ) : null}
              <View
                style={{
                  backgroundColor: '#E8E8E8',
                  borderRadius: 10,
                  borderColor: '#E8E8E8',
                  borderWidth: 1,
                  padding: 3,
                  alignItems: 'center',
                  width: wp('50%'),
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontSize: theme.FONT_SIZE_NORMAL,
                    fontFamily: font.font_Normal,
                    color: 'black',
                  }}>
                  {item.categoryName}
                </Text>
              </View>

              {item.tags && item.tags.length > 0 ? (
                <Text
                  style={{
                    fontSize: theme.FONT_SIZE_LARGE,
                    fontFamily: font.font_Bold,
                    marginTop: 20,
                    color: 'black',
                  }}>
                  Tags
                </Text>
              ) : null}
              {item.tags && item.tags.length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={item.tags}
                  numColumns={3}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        backgroundColor: '#E8E8E8',
                        borderRadius: 10,
                        borderColor: '#E8E8E8',
                        borderWidth: 1,
                        padding: 5,
                        marginTop: 5,
                        marginRight: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: theme.FONT_SIZE_NORMAL,
                          fontFamily: font.font_Normal,
                          color: 'black',
                        }}>
                        #{item.name}
                      </Text>
                    </View>
                  )}
                />
              ) : null}

              {item.references && item.references.length > 0 ? (
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: theme.FONT_SIZE_LARGE,
                    fontFamily: font.font_Bold,
                    marginTop: 20,
                    color: 'black',
                  }}>
                  References
                </Text>
              ) : null}
              {item.references && item.references.length > 0
                ? item.references.map(ref => {
                    return (
                      <View style={{marginTop: 10}}>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: theme.FONT_SIZE_NORMAL,
                            fontFamily: font.font_Normal,
                            color: 'black',
                          }}>
                          {ref.name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            paddingl: wp('5%'),
                            fontSize: theme.FONT_SIZE_NORMAL,
                            fontFamily: font.font_Normal,
                            color: '#2F6BFD',
                          }}>
                          {ref.source}
                        </Text>
                      </View>
                    );
                  })
                : null}

              {commentsData.length > 0 ? (
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: theme.FONT_SIZE_LARGE,
                    fontFamily: font.font_Bold,
                    marginTop: 20,
                    color: 'black',
                  }}>
                  Comments
                </Text>
              ) : null}

              {commentsData.length > 0
                ? commentsData.map(item => {
                    if (item.comment.length > 0) {
                      let createdOn = item.createdOn;
                      let commentedDate = '';
                      createdOn = createdOn.split(' ');
                      if (createdOn.length > 0) {
                        createdOn = createdOn[0];
                        commentedDate = moment(
                          createdOn,
                          'YYYY-MM-DD',
                        ).fromNow();
                      }
                      return (
                        <View
                          style={{
                            width: wp('90%'),
                            backgroundColor: 'white',
                            borderRadius: 10,
                            borderColor: '#E8E8E8',
                            borderWidth: 1,
                            alignItems: 'flex-start',
                            marginTop: 20,
                            padding: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: theme.FONT_SIZE_NORMAL,
                              fontFamily: font.font_Normal,
                              color: 'black',
                            }}>
                            {item.comment}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 10,
                            }}>
                            {item.userData &&
                            item.userData.firstName &&
                            item.userData.firstName.length > 0 ? (
                              <Text
                                numberOfLines={4}
                                style={{
                                  color: '#2F6BFD',
                                  fontSize: theme.FONT_SIZE_SMALL,
                                  fontFamily: font.font_Bold,
                                }}>
                                {item.userData.firstName}
                              </Text>
                            ) : null}
                            <Text
                              numberOfLines={4}
                              style={{
                                color: '#D0D0D0',
                                fontSize: theme.FONT_SIZE_SMALL,
                                fontFamily: font.font_Normal,
                                marginLeft: 10,
                              }}>
                              {commentedDate}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                  })
                : null}

              <View
                style={{
                  flexDirection: 'row',
                  width: wp('90%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  maxLength={200}
                  multiline={true}
                  style={{
                    flex: 1,
                    fontFamily: font.font_Normal,
                    fontSize: theme.FONT_SIZE_NORMAL,
                    marginBottom: 10,
                    borderWidth: 1,
                    padding: 5,
                    minHeight: hp('25%'),
                    borderColor: '#EAEAEA',
                    borderRadius: 5,
                    marginTop: 15,
                    textAlignVertical: 'top',
                    color: '#000000',
                  }}
                  value={comment}
                  placeholder="Add your comment"
                  placeholderTextColor={'#000000'}
                  onChangeText={txt => {
                    set_comment(txt);
                  }}
                />
                <TouchableOpacity
                  disabled={comment.length === 0}
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}
                  onPress={async () => {
                    let userId = await AsyncStorage.getItem('userId');
                    let accessToken = await AsyncStorage.getItem('accessToken');
                    console.log('..........', userId);
                    if (userId === null || (userId && userId.length === 0)) {
                      navigation.navigate('Login');
                    } else {
                      let body = {
                        ideaId: _item.ideaId,
                        comment: comment,
                        userId: userId,
                      };
                      fetch(
                        'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/comment',
                        {
                          method: 'POST',
                          body: JSON.stringify(body),
                          headers: {
                            Authorization: accessToken,
                            'Content-Type': 'application/json',
                            'Accept-Language': 'en-US',
                          },
                        },
                      )
                        .then(response => {
                          return response.json();
                        })
                        .then(async data => {
                          if (
                            data &&
                            data.status &&
                            data.status === 'success'
                          ) {
                            set_refreshData(!refreshData);
                            set_comment('');
                          }
                        })
                        .catch(error => {
                          console.log('error', error);
                        });
                    }
                  }}>
                  <Image
                    style={{
                      width: wp('7%'),
                      height: wp('7%'),
                    }}
                    resizeMode="contain"
                    source={require('../src/images/send-mail.svg')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {activityIndicator ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <BubblesLoader size={24} dotRadius={7} color={'#1B75BC'} />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IdeaDetail;
