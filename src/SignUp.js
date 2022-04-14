import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';

import {
  widthPercentageToDP as wp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SignUp = () => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: wp('3%'),
      backgroundColor: '#FFFFFF',
      marginLeft: wp('3%'),
      marginRight: wp('3%'),
      justifyContent: 'center',
      width: wp('96%'),
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
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: 120}}
        showsVerticalScrollIndicator={false}>
        <View>
          <TextInput label="Email" value={'text'} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
