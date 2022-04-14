// @flow
import theme from './theme.style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import * as fonts from './fonts';

export default StyleSheet.create({

  text_bold_large: {
    //fontWeight: theme.FONT_WEIGHT_BOLD,
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.BLACK_COLOR,
    fontFamily:fonts.font_Bold

   },
  text_medium_medium: {
    //fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.LABEL_COLOR,
    fontFamily:fonts.font_Light

  },
  text_light_small: {
    //fontWeight: theme.FONT_WEIGHT_LIGHT,
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.LABEL_COLOR,
    fontFamily:fonts.font_Normal
  },
  text_bold_very_large: {
    //fontWeight: theme.FONT_WEIGHT_BOLD,
    fontFamily:fonts.font_Bold,
    fontSize: theme.FONT_SIZE_VERY_LARGE,
    color: theme.LABEL_COLOR
  },
  modal_title: {
    //fontWeight: theme.FONT_WEIGHT_BOLD,
    fontFamily:fonts.font_Bold,
    fontSize: theme.FONT_SIZE_XL,
    color: theme.BLACK_COLOR
  },
  normal_black_text: {
   // fontWeight: theme.FONT_WEIGHT_NORMAL,
    fontFamily:fonts.font_Normal,
    fontSize: theme.FONT_SIZE_NORMAL,
    color: theme.BLACK_COLOR
  },
  normal_bold_text: {
    //fontWeight: theme.FONT_WEIGHT_BOLD,
    fontFamily:fonts.font_Bold,
    fontSize: theme.FONT_SIZE_NORMAL,
    color: theme.BLACK_COLOR
  },
  positive_button_text: {
    //fontWeight: theme.FONT_WEIGHT_NORMAL,
    fontFamily:fonts.font_Normal,
    fontSize: theme.FONT_SIZE_NORMAL,
    color: theme.PRIMARY_BACKGROUND_COLOR
  },
  negative_button_text: {
    //fontWeight: theme.FONT_WEIGHT_NORMAL,
    fontFamily:fonts.font_Normal,
    fontSize: theme.FONT_SIZE_NORMAL,
    color: theme.ERROR_BACKGROUND
  },
  progressloader: {
    backgroundColor: theme.WHITE_COLOR,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around'
  },
  modalBackground: {
    backgroundColor: 'red',
    flexDirection: 'column',

  },
  activityIndicatorWrapper: {
    backgroundColor: 'red',
    height: hp('10%'),
    width: wp('100%'),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'

  },
  line:{
    height:StyleSheet.hairlineWidth,
    width: "100%",
    alignSelf: 'center',
    backgroundColor: theme.BORDER_LIGHT_COLOR,
    marginTop:3,
    marginBottom:3
  },
  textInput : {
    padding: theme.TEXT_INPUT_PADDING,
    alignSelf: 'stretch'
  },
  hbox : {
    flexDirection: 'row'
  },
  billinInfo_single_item_style : {
    width: wp('80%'), justifyContent: 'center', padding: 10, paddingTop: 20, paddingBottom: 20,
    overflow: 'hidden',
    marginBottom: 0,
    marginTop: 10,
    minHeight: hp("7%"),
    backgroundColor: '#F7F7F8',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderStyle:'solid',
    borderRadius:6,
    borderColor: '#BBBFCA'
  },

});
