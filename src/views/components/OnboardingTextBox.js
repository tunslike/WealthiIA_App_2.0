import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, Platform,
         Keyboard,
        TextInput } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const OnboardingTextBox = ({ placeholder,maxlength, phone, onFocus, onChange, value, icon, setSecureText}) => {
  return (
    <View style={styles.container}>

        <Image source={icon} 
            style={{
                width: wp(4.5), height: wp(4.5), 
                resizeMode: 'contain', tintColor: COLORS.fgOrange,
                marginRight: wp(4)
            }}
        />

        <TextInput
            value={value}
            onChangeText={onChange}
            style={styles.inputStyle}
            placeholder={placeholder}
            placeholderTextColor={COLORS.fgTabColor}
            keyboardType={(phone == 1) ? "phone-pad" : "default"}
            autoCapitalize='none'
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={setSecureText}
            returnKeyType='next'
            maxLength={maxlength}
            onFocus={onFocus}
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
    fontFamily: FONTS.RUBIK_REGULAR,
    fontSize: wp(3.6),
    width: wp(100),
    color: COLORS.fgDarkGrey,

  },
   container : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp(3),
    backgroundColor: COLORS.screenGrey,
    paddingHorizontal: wp(4),
    paddingVertical: Platform.OS === 'ios' ? wp(5) : wp(1.3),
    marginBottom: wp(3)
   }
})

export default OnboardingTextBox;