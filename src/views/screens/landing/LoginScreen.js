import React, {useContext} from 'react'
import { StatusBar,
    TouchableOpacity,
    Platform,
    StyleSheet, 
    Text, 
    View, Image} from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, images, FONTS, icons } from '../../../constants';
import OnboardingTextBox from '../../components/OnboardingTextBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../../../context/AuthContext';
import { Loader } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const LoginScheme = Yup.object().shape({

    username: Yup.string()
      .email('Email is required')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Must be 6 characters minimum')
      .max(12, 'Must be 12 characters maximum')
      .required('Password is required')
})

const LoginScreen = ({navigation}) => {

    const {ValidateCustomerLogin, isLoading} = useContext(AuthContext);


  const AuthenticateUser = async (values) => {
    ValidateCustomerLogin(values.username, values.password);
  }

  return (
    <KeyboardAwareScrollView 
          enableOnAndroid={true}
          keyboardShouldPersistTaps={"handled"}
          extraScrollHeight={-300}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: COLORS.screenGrey,
            justifyContent: 'center'
          }}
      > 
        <SafeAreaView>
        <Loader loading={isLoading} />

            <StatusBar backgroundColor={COLORS.screenGrey} barStyle="dark-content" />

            <View style={styles.logoArea}>
                <Image 
                source={images.logo}
                style={{
                    height: wp(18), width: wp(18), resizeMode:'contain'
                }}
                />
            </View>

            <View style={styles.signInBox}>
                <Text style={styles.title}>Sign in to Account</Text>
                <Text style={styles.desc}>Provide your email address and password to sign in</Text>
            </View>

        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={LoginScheme}
            onSubmit={values => AuthenticateUser(values)}
        >

        {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (

            <View>
            <View style={styles.loginBox}>
                <OnboardingTextBox 
                    icon={icons.userIconProfile}
                    placeholder="Enter your Email"
                    value={values.username}
                    onChange={handleChange('username')}
                />
                {errors.username && 
                    <Text style={styles.formErrortext}>{errors.username}</Text>
                } 
                <OnboardingTextBox 
                    icon={icons.password}
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange('password')}
                    setSecureText={true}
                />
                {errors.password && 
                    <Text style={styles.formErrortext}>{errors.password}</Text>
                } 

                <TouchableOpacity style={styles.btnForgot}>
                    <Text style={styles.forgotTxt}>Forgot Password?</Text>
                </TouchableOpacity>
            </View> 

            <View style={{marginBottom: wp(15)}}>
                <TouchableOpacity  
                    onPress={handleSubmit}
                    style={styles.btnLogin}>
                    <Text style={styles.logintxt}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => navigation.navigate("Account")}
                style={styles.btnCreate}>
                <Text style={styles.createtxt}>Create Account</Text>
            </TouchableOpacity>
            </View>

            </View>
        )}

        </Formik>
        
        </SafeAreaView>
      </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    formErrortext: {
        fontFamily: FONTS.RUBIK_REGULAR,
        fontSize: wp(3),
        marginLeft: wp(13),
        color: COLORS.errorRed,
        marginBottom: wp(3)
      },
    logintxt: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(4),
        color: COLORS.fgWhite
    },
    createtxt: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(4),
        color: COLORS.fgWhite
    },
    btnLogin: {
        marginTop: wp(10),
        marginHorizontal: wp(4),
        backgroundColor: COLORS.bgColor,
        alignItems: 'center',
        paddingVertical: wp(5.3),
        paddingHorizontal: wp(5),
        borderRadius: wp(3)
    },
    btnCreate: {
        marginTop: wp(3),
        marginHorizontal: wp(4),
        backgroundColor: COLORS.fgOrange,
        alignItems: 'center',
        paddingVertical: wp(5.3),
        paddingHorizontal: wp(5),
        borderRadius: wp(3)
    },
    forgotTxt: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(3.5),
        color: COLORS.fgOrange
    },
    btnForgot : {
        alignSelf: 'flex-end',
        marginRight: wp(1),
        marginTop: wp(4)
    },
    loginBox: {
        backgroundColor: COLORS.fgWhite,
        borderRadius: wp(4),
        marginHorizontal: wp(4),
        paddingBottom: wp(5),
        paddingTop: wp(3),
        paddingHorizontal: wp(3),
        marginTop: wp(10)
    },
    desc: {
        fontFamily: FONTS.RUBIK_REGULAR,
        color: COLORS.fgTabColor,
        fontSize: wp(3.3),
        marginTop: wp(3)
    },
    title: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        color: COLORS.fgDarkGrey,
        fontSize: wp(6.6)
    },
    signInBox: {
        marginTop: wp(10),
        marginHorizontal: wp(7)
    },
    logoArea: {
        marginTop: wp(10),
        alignItems: 'flex-end',
        marginHorizontal: wp(7)
      },
})
export default LoginScreen;

