import React from 'react';
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View } from 'react-native';
  import { COLORS, images, FONTS, icons } from '../../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const WelcomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1}}>
    <ImageBackground
      resizeMethod="auto"
      resizeMode='cover'
      style={styles.welcomebg}
      source={images.loginbg}
    >

      <View style={styles.logoArea}>
          <Image 
            source={images.whitelogo}
            style={{
              height: wp(23), width: wp(23), resizeMode:'contain'
            }}
          />
      </View>

      <View style={styles.welcomeArea}>
            <Text style={styles.welcomeTxt}>Welcome to Wealthia</Text>
            <Text style={styles.introtxt}>Experience an exclusive and tailored financial advisory services</Text>
      </View>

      <View style={styles.btnBody}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Account")}
            style={styles.btnGetStarted}
          >
            <Text style={styles.btnStartedTxt}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => navigation.navigate("Login")}
          style={styles.btnLogin}>
            <Text style={styles.btnLogintxt}>Sign In</Text>
          </TouchableOpacity>
      </View>

    </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: COLORS.fgWhite,
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    paddingVertical: Platform.OS === 'android' ? wp(4.5) : wp(5.5),
    marginTop: wp(3)
  },
  btnLogintxt: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(4),
    color: COLORS.fgDarkGrey,
    textAlign: 'center'
  },
  btnStartedTxt: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(4),
    color: COLORS.fgWhite,
    textAlign: 'center'
  },
  btnGetStarted: {
    backgroundColor: COLORS.fgOrange,
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    paddingVertical: Platform.OS === 'android' ? wp(4.5) : wp(5.5),
  },
  btnBody: {
      marginHorizontal: wp(5),
      marginTop: wp(10),
      marginBottom: wp(20)
  },
  introtxt: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(4),
    color: COLORS.fgButtonBorder,
    marginTop: wp(5),
    width: wp(80),
    lineHeight: wp(5.7)
  },
  welcomeTxt: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(10),
    color: COLORS.fgWhite
  },
  welcomeArea: {
    marginTop: wp(15),
    marginHorizontal: wp(5),
    marginBottom: wp(10)
  },
  logoArea: {
    marginTop: wp(8),
    alignItems: 'flex-end',
    marginHorizontal: wp(5)
  },
  welcomebg: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain'
}
})

export default WelcomeScreen;

