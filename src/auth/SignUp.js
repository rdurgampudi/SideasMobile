import * as React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {BubblesLoader} from 'react-native-indicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ToastHandler from '../ToastHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUp = props => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [hitSignUp, setHitSignUp] = React.useState(false);
  const [isToast, setIsToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    input: {
      width: wp('80%'),
      height: 25,
      padding: 10,
      fontSize: 14,
      marginBottom: 5,
      backgroundColor: 'white',
    },
    inputext: {
      width: wp('85%'),
      height: 44,
      padding: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });

  const closeToast = () => {
    setToastMsg('');
    setIsToast(false);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      style={styles.container}
      contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          style={{
            width: wp('15%'),
            height: wp('15%'),
            marginBottom: wp('5%'),
            marginTop: wp('5%'),
          }}
          resizeMode="contain"
          source={require('../images/logo.svg')}
        />
        <TextInput
          value={firstName}
          onChangeText={firstName => setFirstName(firstName)}
          label="First Name"
          mode={'outlined'}
          style={styles.input}
        />
        <TextInput
          value={lastName}
          onChangeText={lastName => setLastName(lastName)}
          label="Last Name"
          mode={'outlined'}
          style={styles.input}
        />
        <TextInput
          value={username}
          onChangeText={username => setUsername(username)}
          label="Email"
          mode={'outlined'}
          style={styles.input}
        />
        <TextInput
          value={phoneNumber}
          onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          label="Phone Number"
          mode={'outlined'}
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={password => setPassword(password)}
          label="Password"
          mode={'outlined'}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          label="Confirm Password"
          mode={'outlined'}
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity
          disabled={
            username.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0 ||
            firstName.length === 0 ||
            phoneNumber.length === 0 ||
            lastName.length === 0 ||
            hitSignUp
          }
          style={{
            marginTop: 10,
            borderRadius: 5,
            height: 35,
            borderColor: 'black',
            justifyContent: 'center',
            backgroundColor:
              username.length === 0 ||
              password.length === 0 ||
              confirmPassword.length === 0 ||
              firstName.length === 0 ||
              phoneNumber.length === 0 ||
              lastName.length === 0
                ? '#CCCCCC'
                : '#1B75BC',
            width: wp('80%'),
            alignItems: 'center',
          }}
          onPress={() => {
            console.log('signup');

            if (password === confirmPassword) {
              let body = {
                firstName: firstName,
                lastName: lastName,
                email: username,
                phoneNumber: phoneNumber + '',
                password: password,
              };
              console.log('JSON.stringify(body)', JSON.stringify(body));
              setHitSignUp(true);

              fetch(
                'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/signup',
                {
                  method: 'POST',
                  body: JSON.stringify(body),
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'en-US',
                  },
                },
              )
                .then(response => {
                  return response.json();
                })
                .then(async data => {
                  setHitSignUp(false);
                  console.log(' SignUp response ', JSON.stringify(data));
                  if (data && data.status && data.status === 'success') {
                  }
                  if (data && data.message && data.message.length > 0) {
                    setToastMsg(data.message);
                    setIsToast(true);
                    await AsyncStorage.setItem('username', data.response);

                    props.navigation.goBack();
                    props.navigation.goBack();
                  }
                })
                .catch(error => {
                  console.log('error', error);
                  setHitSignUp(false);
                });
            } else {
              setHitSignUp(false);
              setToastMsg('Password not matched with confirm password');
              setIsToast(true);
            }
          }}>
          {!hitSignUp ? (
            <Text
              style={{
                fontSize: 12,
                color:
                  username.length === 0 ||
                  password.length === 0 ||
                  confirmPassword.length === 0 ||
                  firstName.length === 0 ||
                  phoneNumber.length === 0 ||
                  lastName.length === 0
                    ? '#666663'
                    : 'white',
                padding: 10,
              }}>
              Sign Up
            </Text>
          ) : null}
          {hitSignUp ? (
            <BubblesLoader size={16} dotRadius={5} color={'#FFFFFF'} />
          ) : null}
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Text style={{fontSize: 12, color: '#1B75BC', fontStyle: 'italic'}}>
              Already have an account? SignIn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ToastHandler
        isToast={isToast}
        closeToast={closeToast}
        toastMsg={toastMsg}
      />
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
