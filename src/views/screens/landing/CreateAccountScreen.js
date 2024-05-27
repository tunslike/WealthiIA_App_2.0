import React, {useState, useEffect} from 'react'
import { StatusBar,
    TouchableOpacity,
    Platform,
    StyleSheet, 
    Text, Alert,
    View, Image} from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Loader} from '../../components';
import { SelectList } from 'react-native-dropdown-select-list'
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import OnboardingTextBox from '../../components/OnboardingTextBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const CompanyAccountScheme = Yup.object().shape({

  companyname: Yup.string()
    .min(10,'Company name is required')
    .max(50,'Company name is required')
    .required('Company name is required'),

  contactname: Yup.string()
    .min(4,'Contact name is required')
    .max(20,'Contact name is required')
    .required('Contact name is required'),

  email: Yup.string()
      .email('Email is required')
      .required('Email is required'),
    
  phone: Yup.string()
    .min(11, 'Phone is invalid')
    .max(11, 'Phone is invalid')
    .required('Phone is required'),

  password: Yup.string()
    .min(6, 'Must be more than six characters')
    .max(10, 'Must be less than 10 characters')
    .required('Password is required')
})


const IndividualAccountScheme = Yup.object().shape({

  firstname: Yup.string()
    .min(4,'First name is required')
    .max(20,'First name is required')
    .required('First name is required'),

  lastname: Yup.string()
    .min(4,'Last name is required')
    .max(20,'Last name is required')
    .required('Last name is required'),

  email: Yup.string()
      .email('Email is required')
      .required('Email is required'),
    
  phone: Yup.string()
    .min(11, 'Phone is invalid')
    .max(11, 'Phone is invalid')
    .required('Phone is required'),

  password: Yup.string()
    .min(6, 'Must be more than six characters')
    .max(10, 'Must be less than 10 characters')
    .required('Password is required')
})

const CreateAccountScreen = ({navigation}) => {

  const [accountType, setAccountType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState([]);

  const [selected, setSelected] = React.useState("");

  const changeAccountType = (type) => {
    setAccountType(type);
  }

//function to load sectors
  const loadSectors = () => {

    axios.get(APIBaseUrl.developmentUrl + 'clients/loadSectors',{},{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      let data = response.data.map((item) => {
        return {key: item.SUB_CATEGORY_ID, value: item.SUB_NAME}
      })

      setSectors(data)

    })
    .catch(error => {
      console.log(error);
    });
}
//end of sectors

//function to create new individual account
    const CreateNewIndividualAccount = (values) => {

        const data = {
          first_name: values.firstname,
          last_name: values.lastname,
          mobile: values.phone,
          email: values.email,
          password: values.password,
          state: 'Lagos',
          client_type: "Individual"
        };

        console.log(data)

        setLoading(true);

        axios.post(APIBaseUrl.developmentUrl + 'clients/registerClient',data,{
          headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8082'
          }
        })
        .then(response => {

          setLoading(false)

          console.log(response)

          if(response.status == 201) {

              navigation.navigate("AccountSuccess", {type: "individual"})

          }else{

            Alert.alert("WealthIA",'Oops! Unable to process your request, please try again')

          }

        })
        .catch(error => {
          console.log(error);
        });

    }//end of function

    //function to create new individual account
    const CreateNewCompanyAccount = (values) => {

      if(selected == '') {
        Alert.alert("WealthIA", "Select Sector to proceed!")
        return;
      }

      const data = {
        sector:selected,
        company_name: values.companyname,
        contactName: values.contactname,
        mobile: values.phone,
        email: values.email,
        password: values.password,
        state: 'Lagos',
        client_type: "Company"
      };

      console.log(data)

      setLoading(true);

      axios.post(APIBaseUrl.developmentUrl + 'clients/registerCompany',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {

        setLoading(false)

        console.log(response)

        if(response.status == 201) {

            navigation.navigate("AccountSuccess", {type: "company"})

        }else{

          Alert.alert("WealthIA",'Oops! Unable to process your request, please try again')

        }

      })
      .catch(error => {
        console.log(error);
      });

  }//end of function

    //validate account number
      const createCompanyAccount = (values) => {
      
        Alert.alert("WealthIA", 'Do you want to create company account?', [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => CreateNewCompanyAccount(values)},
        ]);
  
      }//end function

    //create individual account
    const createIndividualAccount = (values) => {
      
      Alert.alert("WealthIA", 'Do you want to create individual account?', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => CreateNewIndividualAccount(values)},
      ]);

    }// end function
  
    //USE EFFECT
    useEffect(() => {

      loadSectors();
  
    },[]);
  
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
  <SafeAreaView style={{flex: 1}}>
      <Loader loading={loading} />
      <StatusBar backgroundColor={COLORS.screenGrey} barStyle="dark-content" />

      <View style={styles.signInBox}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.desc}>Select account type to get started</Text>
      </View>

      <View style={styles.tabBox}>
      <TouchableOpacity
        onPress={() => changeAccountType(0)}
        style={(accountType == 0) ? styles.activeTab : styles.notActive}
      >
          <Image 
            source={icons.profile} 
            style={{
              height: wp(4), width: wp(4), resizeMode: 'contain', tintColor:(accountType == 0) ? COLORS.fgWhite : COLORS.bgColor
            }}
          />
          <Text style={(accountType == 0) ? styles.activeTxt : styles.notActiveTxt}>Individual</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeAccountType(1)}
        style={(accountType == 1) ? styles.activeTab : styles.notActive}
      >
      <Image 
        source={icons.portfolio}
        style={{
          height: wp(4), width: wp(4), resizeMode: 'contain', tintColor: (accountType == 1) ? COLORS.fgWhite :  COLORS.bgColor
        }} 
      />
      <Text style={(accountType == 1) ? styles.activeTxt : styles.notActiveTxt}>Company</Text>
  </TouchableOpacity>

    </View>

    {/************************************ COMPANY ACCOUNT REGISTRATION STARTS HERE **************************/}
      {
          accountType == 1 &&

          <Formik
          initialValues={{
              companyname: '',
              contactname: '',
              email: '',
              phone: '',
              password: ''
          }}
          validationSchema={CompanyAccountScheme}
          onSubmit={values => createCompanyAccount(values)}
      >
    
      {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
    
          <View>
    
          <View style={styles.loginBox}>
                <SelectList 
                setSelected={(key) => setSelected(key)} 
                data={sectors} 
                save="value"
                fontFamily={FONTS.RUBIK_REGULAR}
                dropdownTextStyles={{
                  fontSize: wp(3.8),
                  color: COLORS.fgTabColor,
                }}
                inputStyles={{
                  fontSize: wp(3.8),
                  color: COLORS.fgTabColor,
                }}
                boxStyles={{
                  borderRadius: wp(3),
                  backgroundColor: COLORS.screenGrey,
                  paddingHorizontal: wp(4),
                  paddingVertical: Platform.OS === 'ios' ? wp(4.5) : wp(4),
                  marginBottom: wp(3),
                  borderWidth: 0
                }}
                placeholder="Select Sector"
            />
              {errors.firstname && 
                <Text style={styles.formErrortext}>{errors.firstname}</Text>
              } 
              <OnboardingTextBox 
                  icon={icons.portfolio}
                  placeholder="Enter Company Name"
                  value={values.companyname}
                  onChange={handleChange('companyname')}
              />
              {errors.companyname && 
                <Text style={styles.formErrortext}>{errors.companyname}</Text>
              } 
              <OnboardingTextBox 
              icon={icons.profile}
              placeholder="Enter Contact Name"
              value={values.contactname}
              onChange={handleChange('contactname')}
          />
          {errors.contactname && 
            <Text style={styles.formErrortext}>{errors.companyname}</Text>
          } 
              <OnboardingTextBox 
                icon={icons.mail}
                placeholder="Enter Email"
                value={values.email}
                onChange={handleChange('email')}
              />
              {errors.email && 
                <Text style={styles.formErrortext}>{errors.email}</Text>
              } 
            <OnboardingTextBox 
                icon={icons.phone}
                placeholder="Enter Phone"
                value={values.phone}
                onChange={handleChange('phone')}
                maxlength={11}
              />
              {errors.phone && 
                <Text style={styles.formErrortext}>{errors.phone}</Text>
              } 
              <OnboardingTextBox 
              icon={icons.password}
              placeholder="Enter Password"
              value={values.password}
              onChange={handleChange('password')}
              setSecureText={true}
            />
            {errors.password && 
              <Text style={styles.formErrortext}>{errors.password}</Text>
            } 
          </View> 
    
          <Text style={styles.terms}>By registering, you agree to the terms and conditions</Text>
    
          <View>
              <TouchableOpacity 
              onPress={handleSubmit}
              style={styles.btnCreateCoy}>
              <Text style={styles.createtxt}>Register</Text>
          </TouchableOpacity>
   
          </View>
    
          </View>
      )}
    
      </Formik>
      }

    {/************************************ COMPANY ACCOUNT REGISTRATION STARTS HERE **************************/}

    {/************************************ INDIVIDUAL ACCOUNT REGISTRATION STARTS HERE **************************/}
    {accountType == 0 &&
    
      <Formik
      initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          password: ''
      }}
      validationSchema={IndividualAccountScheme}
      onSubmit={values => createIndividualAccount(values)}
  >

  {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (

      <View>

      <View style={styles.loginBox}>
          <OnboardingTextBox 
              icon={icons.userIconProfile}
              placeholder="Enter First Name"
              value={values.firstname}
              onChange={handleChange('firstname')}
          />
          {errors.firstname && 
            <Text style={styles.formErrortext}>{errors.firstname}</Text>
          } 
          <OnboardingTextBox 
              icon={icons.profile}
              placeholder="Enter Last Name"
              value={values.lastname}
              onChange={handleChange('lastname')}
          />
          {errors.lastname && 
            <Text style={styles.formErrortext}>{errors.lastname}</Text>
          } 
          <OnboardingTextBox 
            icon={icons.mail}
            placeholder="Enter Email"
            value={values.email}
            onChange={handleChange('email')}
          />
          {errors.email && 
            <Text style={styles.formErrortext}>{errors.email}</Text>
          } 
        <OnboardingTextBox 
            icon={icons.phone}
            placeholder="Enter Phone"
            value={values.phone}
            onChange={handleChange('phone')}
            maxlength={11}
          />
          {errors.phone && 
            <Text style={styles.formErrortext}>{errors.phone}</Text>
          } 
          <OnboardingTextBox 
          icon={icons.password}
          placeholder="Enter Password"
          value={values.password}
          onChange={handleChange('password')}
          setSecureText={true}
        />
        {errors.password && 
          <Text style={styles.formErrortext}>{errors.password}</Text>
        } 
      </View> 

      <Text style={styles.terms}>By registering, you agree to the terms and conditions</Text>

      <View>
          <TouchableOpacity 
          onPress={handleSubmit}
          style={styles.btnCreate}>
          <Text style={styles.createtxt}>Register</Text>
      </TouchableOpacity>

      </View>

      </View>
  )}

  </Formik>
    }

  {/* INDIVIDUAL ACCOUNT REGISTRATION ENDS HERE */}

  <TouchableOpacity
  onPress={() => navigation.navigate("Login")}
>
  <Text style={styles.loginBtn}>Already have an account? Login here</Text>
</TouchableOpacity>
  
  </SafeAreaView>
</KeyboardAwareScrollView>
  )
}



const styles = StyleSheet.create({
  formErrortext: {
    fontFamily: FONTS.RUBIK_REGULAR,
    fontSize: wp(3),
    marginLeft: wp(10),
    color: COLORS.errorRed,
    marginBottom: wp(3)
  },
  loginBtn: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(3.7),
    color: COLORS.fgDarkGrey,
    textAlign: 'center',
    marginTop: wp(5)
  },
  terms: {
    marginHorizontal: wp(5.2),
    fontFamily: FONTS.RUBIK_REGULAR,
    fontSize: wp(3.4),
    color: COLORS.fgCatHeader,
    marginTop: wp(4),
    marginBottom: wp(3)
  },
  notActiveTxt: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(3.7),
    color: COLORS.bgColor
  },
  notActive: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(1.8),
    borderColor: COLORS.bgColor,
    borderWidth: 1.2,
    borderStyle: 'solid',
    paddingHorizontal: wp(10),
    paddingVertical: wp(3.6),
    borderRadius: wp(2)
  },
  activeTxt: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(3.7),
    color: COLORS.fgWhite
  },
  activeTab: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(1.8),
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: wp(10),
    paddingVertical: wp(3.8),
    borderRadius: wp(2)
  },
  tabBox: {
    marginBottom: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(6),
    marginTop: wp(5),
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
    marginTop: wp(5),
    marginHorizontal: wp(4),
    backgroundColor: COLORS.fgOrange,
    alignItems: 'center',
    paddingVertical: wp(5.3),
    paddingHorizontal: wp(5),
    borderRadius: wp(3)
},
btnCreateCoy: {
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
    paddingTop: wp(3),
    paddingHorizontal: wp(3),
    marginTop: Platform.OS === 'android' ? wp(5) : wp(2)
},
desc: {
    fontFamily: FONTS.RUBIK_REGULAR,
    fontSize: wp(3.4),
    color: COLORS.fgCatHeader,
    marginTop: wp(1.5)
},
title: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    color: COLORS.fgDarkGrey,
    fontSize: wp(6.6)
},
signInBox: {
    marginTop: wp(6),
    marginHorizontal: wp(7)
},
logoArea: {
    marginTop: wp(10),
    alignItems: 'flex-end',
    marginHorizontal: wp(7)
  },
})

export default CreateAccountScreen;

