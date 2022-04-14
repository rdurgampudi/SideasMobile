import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import IdeaList from './IdeaList';
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

const Ideas = props => {
  const [searchKey, set_searchKey] = useState('');
  const [ideaList, set_ideaList] = useState(undefined);
  const [activityIndicator, set_activityIndicator] = useState(true);
  const [categoryList, set_categoryList] = useState([]);
  const [selectedCategory, set_selectedCategory] = useState(0);
  const [selectedCategoryID, set_selectedCategoryID] = useState(undefined);
  const [refreshData, set_refreshData] = useState(false);

  const updateIdeaItem = (item, index) => {
    console.log(item, index);
    let _ideaList = ideaList;
    _ideaList[index] = item;
    set_ideaList(_ideaList);
    set_refreshData(!refreshData);
  };

  React.useEffect(() => {
    set_ideaList(ideaList);
  }, [ideaList, refreshData]);

  const catRBSheet = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        set_activityIndicator(true);

        const response = await fetch(ideaListUrl);
        const data = await response.json();

        const categoryResponse = await fetch(categoryUrl);
        const categoryData = await categoryResponse.json();

        if (
          categoryData &&
          categoryData.response &&
          categoryData.response.length > 0
        ) {
          let item = {
            CATEGORY_ID: 0,
            CATEGORY: 'All Topics',
          };
          let array = [item].concat(categoryData.response);
          set_categoryList(array);
        }

        set_activityIndicator(false);
        console.log('categoryResponse', JSON.stringify(categoryData));
        if (
          data &&
          data.status === 'success' &&
          data.response &&
          data.response.rows &&
          data.response.rows.length > 0
        ) {
          set_ideaList(data.response.rows);
        } else {
          set_ideaList([]);
        }
      } catch (error) {
        console.log('error', error);
        set_ideaList([]);
        set_activityIndicator(false);
      }
    };
    const ideaListUrl =
      'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/idea?pageNumber=1&pageSize=100&categoryId=' +
      (selectedCategoryID ? selectedCategoryID : '0') +
      '&search=' +
      (searchKey && searchKey.length > 0 ? searchKey : '') +
      '&loggedInUserId=56';
    const categoryUrl =
      'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/category';
    const unsubscribe = props.navigation.addListener('focus', () => {
      set_searchKey('');
      fetchData();
    });
    return unsubscribe;
  }, [props.navigation, searchKey, selectedCategoryID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        set_activityIndicator(true);

        const response = await fetch(ideaListUrl);
        const data = await response.json();

        const categoryResponse = await fetch(categoryUrl);
        const categoryData = await categoryResponse.json();

        if (
          categoryData &&
          categoryData.response &&
          categoryData.response.length > 0
        ) {
          let item = {
            CATEGORY_ID: 0,
            CATEGORY: 'All Topics',
          };
          let array = [item].concat(categoryData.response);
          set_categoryList(array);
        }

        set_activityIndicator(false);
        console.log('categoryResponse', JSON.stringify(categoryData));
        if (
          data &&
          data.status === 'success' &&
          data.response &&
          data.response.rows &&
          data.response.rows.length > 0
        ) {
          set_ideaList(data.response.rows);
        } else {
          set_ideaList([]);
        }
      } catch (error) {
        console.log('error', error);
        set_ideaList([]);
        set_activityIndicator(false);
      }
    };
    const ideaListUrl =
      'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/idea?pageNumber=1&pageSize=100&categoryId=' +
      (selectedCategoryID ? selectedCategoryID : '0') +
      '&search=' +
      (searchKey && searchKey.length > 0 ? searchKey : '') +
      '&loggedInUserId=56';
    const categoryUrl =
      'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/category';
    fetchData();
  }, [selectedCategoryID, searchKey]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
      <View
        style={[styles.container, {width: wp('80%'), marginLeft: wp('5%')}]}>
        <TouchableOpacity
          disabled={categoryList.length === 0}
          onPress={() => {
            catRBSheet.current.open();
          }}
          style={{
            color: '#A8A8A8',
            borderColor: '#E2E2E2',
            borderWidth: 1,
            padding: 10,
            backgroundColor: '#F5F5F5',
            width: wp('90%'),
            alignItems: 'center',
            marginTop: 20,
            alignContent: 'center',
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <Text
                numberOfLines={4}
                style={{
                  color: 'black',
                  height: 30,
                  fontSize: theme.FONT_SIZE_NORMAL,
                  fontFamily: font.font_Normal,
                  marginLeft: 10,
                }}>
                {selectedCategory ? selectedCategory : 'All Topics'}
              </Text>
            </View>
            <Image
              style={{width: wp('4%'), height: wp('4%')}}
              resizeMode="contain"
              source={require('../src/images/downArrow.svg')}></Image>
          </View>
        </TouchableOpacity>
        <View
          style={{
            color: '#A8A8A8',
            borderColor: '#E2E2E2',
            backgroundColor: '#F5F5F5',
            borderWidth: 1,
            padding: 10,
            width: wp('90%'),
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <TextInput
            maxLength={50}
            numberOfLines={1}
            style={{
              color: '#000000',
              fontSize: theme.FONT_SIZE_NORMAL,
              fontFamily: font.font_Normal,
              marginLeft: 10,
              height: 35,
            }}
            value={searchKey}
            placeholder="Search an Idea with a keyword"
            placeholderTextColor="#000"
            onChangeText={searchString => {
              set_searchKey(searchString);
            }}
          />
          <Image
            style={{
              width: wp('4%'),
              height: wp('4%'),
              flex: 1,
              position: 'absolute',
              marginRight: 5,
              alignSelf: 'center',
              right: 0,
            }}
            resizeMode="contain"
            source={require('../src/images/search.svg')}></Image>
        </View>
      </View>
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
      {activityIndicator ? null : (
        <IdeaList
          navigation={props.navigation}
          ideaList={ideaList}
          updateIdeaItem={updateIdeaItem}
        />
      )}
    </View>
  );
};

export default Ideas;
