import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import {
  widthPercentageToDP as wp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from './styles/theme.style';
import * as font from './styles/fonts';
import RBSheet from 'react-native-raw-bottom-sheet';
import {BubblesLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const NewIdea = props => {
  const [ideaTitle, set_ideaTitle] = useState('');
  const [ideaDescription, set_ideaDescription] = useState('');
  const [tags, set_tags] = useState('');
  const [references, set_references] = useState([]);
  const [category, set_category] = useState('');
  const catRBSheet = useRef();
  const [selectedCategory, set_selectedCategory] = useState(0);
  const [selectedCategoryID, set_selectedCategoryID] = useState(undefined);
  const [categoryList, set_categoryList] = useState([]);
  const [activityIndicator, set_activityIndicator] = useState(false);

  const [ref, set_ref] = useState('');
  const [refSource, set_refSource] = useState('');

  const [tagsData, set_tagsData] = useState([]);

  useEffect(() => {
    const categoryUrl =
      'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/category';

    const fetchData = async () => {
      try {
        const categoryResponse = await fetch(categoryUrl);
        const categoryData = await categoryResponse.json();
        if (
          categoryData &&
          categoryData.response &&
          categoryData.response.length > 0
        ) {
          set_categoryList(categoryData.response);
          set_selectedCategory(categoryData.response[0].CATEGORY);
          set_selectedCategoryID(categoryData.response[0].CATEGORY_ID);
        }
        console.log('categoryResponse', JSON.stringify(categoryData));
      } catch (error) {
        console.log('error', error);
        set_categoryList([]);
      }
    };
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      paddingTop: wp('3%'),
      backgroundColor: '#FFFFFF',
      paddingLeft: wp('3%'),
      paddingRight: wp('3%'),
      justifyContent: 'center',
      width: wp('100%'),
      alignItems: 'center',
      alignContent: 'center',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      style={{backgroundColor: 'white'}}
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: 100,
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}>
      <View style={styles.container}>
        <RBSheet
          ref={catRBSheet}
          closeOnDragDown={true}
          onClose={() => {
            console.log('test');
            // set_categoryList(undefined);
          }}
          customStyles={{
            container: {
              backgroundColor: 'white',
              borderTopLeftRadius: wp('5%'),
              borderTopRightRadius: wp('5%'),
              paddingBottom: hp('5%'),
              height: hp('50%'), //isAddFileRecordPermission === true ?  hp('42%') : isPermissionRevoked === true ? hp('32%') : hp('22%')
            },

            draggableIcon: {
              backgroundColor: 'transparent',
            },
          }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{paddingBottom: 50}}
            style={{
              width: wp('100%'),
              backgroundColor: 'white',
              padding: hp('2%'),
            }}>
            {categoryList &&
              categoryList.length > 0 &&
              categoryList.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      catRBSheet.current.close();
                      set_selectedCategoryID(item.CATEGORY_ID);
                      set_selectedCategory(item.CATEGORY);
                    }}>
                    <View style={{backgroundColor: 'white', marginTop: 10}}>
                      <Text style={{color: 'black'}}>{item.CATEGORY}</Text>
                      <View
                        style={{
                          width: wp('90%'),
                          height: 1,
                          alignSelf: 'center',
                          marginTop: wp('5%'),
                          backgroundColor: '#F5F5F5',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </RBSheet>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 120}}
          showsVerticalScrollIndicator={false}>
          <View>
            <TextInput
              value={ideaTitle}
              onChangeText={ideaTitle => set_ideaTitle(ideaTitle)}
              label="Idea Title"
              mode={'outlined'}
              maxLength={100}
              multiline={true}
              style={{
                fontFamily: font.font_Bold,
                fontSize: theme.FONT_SIZE_MEDIUM,
                backgroundColor: 'white',
                width: wp('90%'),
              }}
            />

            <TextInput
              value={ideaDescription}
              onChangeText={ideaDescription =>
                set_ideaDescription(ideaDescription)
              }
              label="Idea Description"
              mode={'outlined'}
              maxLength={2000}
              multiline={true}
              style={{
                fontFamily: font.font_Normal,
                fontSize: theme.FONT_SIZE_NORMAL,
                marginTop: 10,
                backgroundColor: 'white',
                width: wp('90%'),
                minHeight: hp('50%'),
              }}
            />

            <Text
              numberOfLines={4}
              style={{
                color: '#A8A8A8',
                marginTop: 10,
                fontSize: theme.FONT_SIZE_MEDIUM,
                fontFamily: font.font_Bold,
              }}>
              CATEGORY
            </Text>

            <TouchableOpacity
              disabled={false}
              onPress={() => {
                catRBSheet.current.open();
              }}
              style={{
                color: '#A8A8A8',
                borderColor: '#E2E2E2',
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                padding: 10,
                width: wp('90%'),
                alignItems: 'center',
                alignContent: 'center',
                marginBottom: 15,
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Text
                    numberOfLines={4}
                    style={{
                      color: '#000000',
                      fontSize: theme.FONT_SIZE_NORMAL,
                      fontFamily: font.font_Normal,
                    }}>
                    {selectedCategory}
                  </Text>
                </View>
                <Image
                  style={{width: wp('4%'), height: wp('4%')}}
                  resizeMode="contain"
                  source={require('../src/images/downArrow.svg')}></Image>
              </View>
            </TouchableOpacity>
            <Text
              numberOfLines={4}
              style={{
                color: '#A8A8A8',
                marginTop: 10,
                fontSize: theme.FONT_SIZE_MEDIUM,
                fontFamily: font.font_Bold,
              }}>
              TAGS
            </Text>
            {tagsData.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={tagsData}
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
                      }}>
                      #{item.name}
                    </Text>
                  </View>
                )}
              />
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                width: wp('90%'),
              }}>
              <TextInput
                value={tags}
                onChangeText={tags => set_tags(tags.replace(/\s/g, ''))}
                label="Add #Tag"
                mode={'outlined'}
                maxLength={30}
                multiline={true}
                style={{
                  fontFamily: font.font_Normal,
                  fontSize: theme.FONT_SIZE_NORMAL,
                  flex: 1,
                  backgroundColor: 'white',
                }}
              />
              <TouchableOpacity
                disabled={tags.length === 0}
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}
                onPress={() => {
                  let tag = {
                    name: tags,
                    id: 0,
                  };
                  let _tagsData = tagsData;
                  _tagsData.push(tag);
                  set_tagsData(_tagsData);
                  set_tags('');
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
            <Text
              numberOfLines={4}
              style={{
                color: '#A8A8A8',
                marginTop: 10,
                fontSize: theme.FONT_SIZE_MEDIUM,
                fontFamily: font.font_Bold,
              }}>
              REFERENCES
            </Text>
            {references.length > 0
              ? references.map(ref => {
                  return (
                    <View style={{marginTop: 10}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: theme.FONT_SIZE_NORMAL,
                          fontFamily: font.font_Normal,
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
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                width: wp('90%'),
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <TextInput
                  value={ref}
                  onChangeText={ref => set_ref(ref.replace(/\s/g, ''))}
                  label="Name"
                  mode={'outlined'}
                  maxLength={30}
                  multiline={true}
                  style={{
                    fontFamily: font.font_Normal,
                    fontSize: theme.FONT_SIZE_NORMAL,
                    borderColor: '#EAEAEA',
                    backgroundColor: 'white',
                  }}
                />
                <TextInput
                  value={refSource}
                  onChangeText={refSource =>
                    set_refSource(refSource.replace(/\s/g, '').toLowerCase())
                  }
                  label="Source"
                  mode={'outlined'}
                  maxLength={30}
                  multiline={true}
                  style={{
                    fontFamily: font.font_Normal,
                    fontSize: theme.FONT_SIZE_NORMAL,
                    borderColor: '#EAEAEA',
                    backgroundColor: 'white',
                  }}
                />
              </View>
              <TouchableOpacity
                disabled={ref.length === 0 || refSource.length === 0}
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}
                onPress={() => {
                  let referenceItem = {
                    name: ref,
                    source: refSource,
                  };
                  let _references = references;
                  _references.push(referenceItem);
                  set_references(_references);
                  set_ref('');
                  set_refSource('');
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <TouchableOpacity
              disabled={ideaTitle.length === 0 || ideaDescription.length === 0}
              style={{
                backgroundColor:
                  ideaTitle.length === 0 || ideaDescription.length === 0
                    ? '#CCCCCC'
                    : '#1B75BC',
                alignItems: 'center',
                alignContent: 'center',
                padding: 7,
                flex: 1,
                borderRadius: 5,
                borderWidth: 1,
                borderColor:
                  ideaTitle.length === 0 || ideaDescription.length === 0
                    ? '#CCCCCC'
                    : '#1B75BC',
                justifyContent: 'center',
              }}
              onPress={async () => {
                console.log('publish');

                let userId = await AsyncStorage.getItem('userId');

                if (userId === null || (userId && userId.length === 0)) {
                  props.navigation.navigate('Login');
                } else {
                  set_activityIndicator(true);
                  let body = {
                    userId: userId,
                    title: ideaTitle,
                    desc: ideaDescription,
                    categoryId: selectedCategoryID,
                    references: references,
                    tags: tagsData,
                  };
                  let accessToken = await AsyncStorage.getItem('accessToken');

                  fetch(
                    'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/idea',
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
                      console.log(' PUBLISH SUCCESS ', JSON.stringify(data));
                      set_ideaTitle('');
                      set_ideaDescription('');
                      set_references([]);
                      set_tagsData([]);
                      set_ref('');
                      set_refSource('');
                      set_activityIndicator(false);
                    })
                    .catch(error => {
                      console.log('error', error);
                      set_activityIndicator(false);
                    });
                }
              }}>
              {activityIndicator ? null : (
                <Text
                  numberOfLines={4}
                  style={{
                    paddingLeft: wp('3%'),
                    paddingRight: wp('3%'),
                    color: '#FFFFFF',
                    fontSize: theme.FONT_SIZE_MEDIUM,
                    fontFamily: font.font_Bold,
                    padding: 10,
                  }}>
                  Publish
                </Text>
              )}
              {activityIndicator ? (
                <BubblesLoader size={18} dotRadius={5} color={'#FFFFFF'} />
              ) : null}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default NewIdea;
