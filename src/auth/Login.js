import * as React from 'react';
import {
  Text,
  Alert,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {BubblesLoader} from 'react-native-indicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ToastHandler from '../ToastHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = props => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hitLogin, setHitLogin] = React.useState(false);
  const [isToast, setIsToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState(false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    input: {
      width: wp('80%'),
      height: 25,
      padding: 10,
      fontSize: 14,
      marginBottom: 10,
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
      style={{backgroundColor: 'white'}}
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: 100,
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}>
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
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
          value={username}
          onChangeText={username => setUsername(username.toLowerCase())}
          label="Email"
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
        <TouchableOpacity
          disabled={username.length === 0 || password.length === 0}
          style={{
            marginTop: 10,
            borderRadius: 5,
            height: 35,
            borderColor: 'black',
            justifyContent: 'center',
            backgroundColor:
              username.length === 0 || password.length === 0
                ? '#CCCCCC'
                : '#1B75BC',
            width: wp('80%'),
            alignItems: 'center',
          }}
          onPress={() => {
            let body = {
              username: username,
              password: password,
            };
            console.log('JSON.stringify(body)', JSON.stringify(body));
            setHitLogin(true);

            fetch(
              'https://p9niwgsv4d.execute-api.us-east-1.amazonaws.com/dev/signin',
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
                setHitLogin(false);
                console.log(' SignUp response ', JSON.stringify(data));
                if (data && data.status && data.status === 'success') {
                  await AsyncStorage.setItem(
                    'phoneNumber',
                    data.response.userData.phoneNumber,
                  );
                  await AsyncStorage.setItem(
                    'firstName',
                    data.response.userData.firstName,
                  );
                  await AsyncStorage.setItem(
                    'lastName',
                    data.response.userData.lastName,
                  );
                  await AsyncStorage.setItem(
                    'userId',
                    data.response.userData.userId,
                  );
                  await AsyncStorage.setItem(
                    'email',
                    data.response.userData.email,
                  );
                  await AsyncStorage.setItem(
                    'accessToken',
                    'Bearer ' + data.response.accessToken,
                  );

                  await AsyncStorage.setItem('idToken', data.response.idToken);
                  await AsyncStorage.setItem(
                    'refreshToken',
                    data.response.refreshToken,
                  );
                  props.navigation.goBack();
                }
                if (data && data.message && data.message.length > 0) {
                  setToastMsg(data.message);
                  setIsToast(true);
                }
              })
              .catch(error => {
                console.log('error', error);
                setHitLogin(false);
              });
          }}>
          {!hitLogin ? (
            <Text
              style={{
                fontSize: 12,
                color:
                  username.length === 0 || password.length === 0
                    ? '#666663'
                    : 'white',
                padding: 10,
              }}>
              Login
            </Text>
          ) : null}
          {hitLogin ? (
            <BubblesLoader size={16} dotRadius={5} color={'#FFFFFF'} />
          ) : null}
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            fontStyle: 'italic',
            marginTop: 20,
          }}>
          OR
        </Text>
        <Text
          style={{
            marginTop: 25,
            fontSize: 12,
            color: 'black',
            fontStyle: 'normal',
          }}>
          Login with
        </Text>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            style={{marginTop: 2}}
            onPress={() => {
              setToastMsg('Upcoming Feature');
              setIsToast(true);
            }}>
            <Image
              style={{
                width: wp('8%'),
                height: wp('8%'),
                marginBottom: wp('5%'),
              }}
              resizeMode="contain"
              source={require('../images/google.svg')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 2,
              marginLeft: wp('10%'),
              marginRight: wp('10%'),
            }}
            onPress={() => {
              setToastMsg('Upcoming Feature');
              setIsToast(true);
            }}>
            <Image
              style={{
                width: wp('8%'),
                height: wp('8%'),
              }}
              resizeMode="contain"
              source={require('../images/facebook-logo-2019.svg')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginTop: 2}}
            onPress={() => {
              setToastMsg('Upcoming Feature');
              setIsToast(true);
            }}>
            <Image
              style={{width: wp('8%'), height: wp('8%')}}
              resizeMode="contain"
              source={require('../images/twitter.svg')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              console.log('signup');
              props.navigation.navigate('SignUp');
            }}>
            <Text style={{fontSize: 12, color: '#1B75BC', fontStyle: 'italic'}}>
              Don't have an account? SignUp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              setToastMsg('Upcoming Feature');
              setIsToast(true);
            }}>
            <Text style={{fontSize: 12, color: '#1B75BC', fontStyle: 'italic'}}>
              Forgot password?
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

export default Login;
