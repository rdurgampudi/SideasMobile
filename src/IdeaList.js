import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import IdeaItem from './IdeaItem';
import theme from './styles/theme.style';
import * as font from './styles/fonts';
import {
  listenOrientationChange as lor,
  removeOrientationListener as rol,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const IdeaList = props => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1,
      backgroundColor: 'white',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
  console.log('props.ideaList', props.ideaList);

  return (
    <View style={styles.container}>
      {props.ideaList && props.ideaList.length > 0 ? (
        <FlatList
          contentContainerStyle={{paddingBottom: 120}}
          showsVerticalScrollIndicator={false}
          data={props.ideaList}
          renderItem={({item, index}) => (
            <View>
              <IdeaItem
                navigation={props.navigation}
                item={item}
                index={index}
                updateIdeaItem={props.updateIdeaItem}
              />
              <View
                style={{
                  width: wp('100%'),
                  height: 4,
                  alignSelf: 'center',
                  marginTop: wp('5%'),
                  backgroundColor: '#F5F5F5',
                }}
              />
            </View>
          )}
        />
      ) : null}

      {props.ideaList && props.ideaList.length === 0 ? (
        <Text
          numberOfLines={4}
          style={{
            color: '#000000',
            fontSize: theme.FONT_SIZE_NORMAL,
            fontFamily: font.font_Normal,
            marginLeft: 5,
          }}>
          No Ideas, Please refine your search.
        </Text>
      ) : null}
    </View>
  );
};

export default IdeaList;
