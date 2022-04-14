// @flow
import React, {Component} from 'react';
import theme from './styles/theme.style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modalbox';
import {Image, Text, View} from 'react-native';

class ToastHandler extends Component {
  timer = null;
  constructor(props) {
    super(props);
    this.state = {
      seconds: 10,
    };
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isToast}
        entry={'bottom'}
        coverScreen={false}
        backdropOpacity={0}
        backdrop={false}
        swipeToClose={false}
        backdropPressToClose={false}
        position={'top'}
        onOpened={() => {
          setTimeout(() => {
            this.props.closeToast();
          }, 2000);
        }}
        style={{
          width: wp('90%'),
          marginTop: hp('85%'), //"75%"
          maxHeight: hp('8%'),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.TOAST_SUCCESS_COLOR,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginLeft: 5,
              marginRight: 5,
            }}>
            <Image
              source={require('../src/images/irm-icon-success-outline.svg')}
            />
            <Text
              maxFontSizeMultiplier={1}
              style={{
                flex: 1,
                paddingRight: 8,
                marginLeft: 10,
                marginRight: 10,
                color: 'white',
                fontSize: 12,
                alignSelf: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              {this.props.toastMsg}
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ToastHandler;
