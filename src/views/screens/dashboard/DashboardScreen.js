import React, { useContext, useState, useEffect } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, 
  Alert,
  ScrollView,
  Dimensions} from 'react-native';
  import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { useFocusEffect } from '@react-navigation/native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { updateProviderChannel, updateProviderType } from '../../../store/customerSlice';
import {CategoryCard} from '../../components';
import { useSelector, useDispatch } from 'react-redux';

const DashboardScreen = ({navigation}) => {


  const dispatch = useDispatch();

  const customerData = useSelector((state) => state.customer.customerData);
  const {ExitAuthenticatedUser} = useContext(AuthContext);

  // STATES
  const [greetings, setGreetings] = useState('');


    // function to load facilities
    const LogoutAuthenticatedUser = () => {

      Alert.alert("WealthIA", 'Do you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
          ExitAuthenticatedUser();
        }},
      ]);
    }
  // end of function

      //truncate strings 
      function TruncateCompanyName (message) {

        if(!message)
        return;

            if (message.length > 20) {
                return message.substring(0, 20) + "...";
            }else{
                return message;
            }
    }
    //end of truncate string

   //truncate strings 
  function TruncateString (message) {
        if (message.length > 12) {
            return ' ' + message.substring(0, 12) + "...";
        }else{
            return ' ' + message;
        }
    }
    //end of truncate string

//return greetings
checkTimeGreetings = () => {

    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      setGreetings('Good Morning')
    } else if (curHr < 18) {
      setGreetings('Good Afternoon')
    } else {
      setGreetings('Good Evening')
    }
}

  //USE EFFECT
  useEffect(() => {

    //return greetings
    this.checkTimeGreetings();

  }, []);

  const ProcessNavigation = (type) => {

    dispatch(updateProviderType("Enquiries"))

    if(type == 'Enquiries') {

      if(customerData.TYPE == 'Individual') {

        navigation.navigate("Enquiry", {category_id: "3d42ec11-5edb-48c6-9fe5-14f4a10627a1", type: 1})

      }else if(customerData.TYPE == 'Company') {
        
        navigation.navigate("ProviderMessage",{type : "Enquiries"})
      
      }

    }else if(type == 'Providers') {

      dispatch(updateProviderChannel("Advice"))
      dispatch(updateProviderType(""))

      if(customerData.TYPE == 'Individual') {

        navigation.navigate("Enquiry", {category_id: "2d2dff9e-2e81-47a1-b6c9-4132f017d6b0", type: 2}) 

      }else if(customerData.TYPE == 'Company') {
        
        navigation.navigate("ProviderChannel")
      
      }

    }

  }

  return (
    <SafeAreaView
      style={{
        flex: 1, backgroundColor: COLORS.bgColor,
      }}
    >
      <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />

        {/* LOGOUT BUTTON */}
        <TouchableOpacity
        onPress={() => LogoutAuthenticatedUser()}
        style={{
            position: 'absolute',
            width: wp(13),
            height: wp(13),
            alignItems: 'center',
            justifyContent: 'center',
            right: wp(5),
            bottom: wp(30),
            backgroundColor: COLORS.fgOrange,
            borderRadius: wp(13),
            zIndex: 9999

        }}
        activeOpacity={0.7}
    >
        <Image 
            source={icons.logout2}
            resizeMode="contain"
            style={{
                height: 35,
                width: 35,
                tintColor: COLORS.fgWhite
            }}
        />

    </TouchableOpacity>
     {/* LOGOUT BOTTON ENDS */}

      {/* HEADER VIEW STARTS HERE */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hi, {(customerData.TYPE == 'Company') ? TruncateString(customerData.CONTACT_NAME)  : TruncateString(customerData.FIRST_NAME + ' ' + customerData.LAST_NAME)}</Text>
          <Text style={styles.greetTxt}>{greetings}</Text>
        </View>
        <View style={styles.hdrToolbar}>
            <TouchableOpacity>
              <Image 
                source={icons.alert} 
                style={{
                  height: wp(8), width: wp(8), tintColor: COLORS.fgWhite, resizeMode: 'contain'
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
            >
            <Image 
              source={icons.profile} 
              style={{
                height: wp(6.5), width: wp(6.5), tintColor: COLORS.fgWhite, resizeMode: 'contain'
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {customerData.TYPE == 'Individual' &&   
        <View style={styles.connections}>
            <Image 
            source={icons.portfolio}
            style={{
              height: wp(5), width: wp(5), resizeMode: 'contain', tintColor: COLORS.fgWhite
            }}
                />
              <Text style={styles.connTxt}>{customerData.connections.COUNT} Connections</Text>
        </View>
      }

      {customerData.TYPE == 'Company' &&

        <View style={styles.connections_coy}>
            <View> 
                <Text style={styles.coyTitle}>Company | Bank</Text>
                <Text style={styles.coy_name}>{TruncateCompanyName(customerData.providerDetails.PROVIDER_NAME)}</Text>
            </View>
            <Text style={styles.connTxt}>{customerData.connections.COUNT} Connections</Text>
        </View>
    
      }

      {/* HEADER VIEW ENDS HERE */}

      {/* BODY VIEW STARTS HERE */}
      <View style={styles.body}>
      

          <TouchableOpacity
              style={styles.notification}
              onPress={() => navigation.navigate("ProviderMessage")}
          >
              <Image 
                source={icons.chat} 
                style={{
                  height: wp(5), width: wp(5), tintColor: COLORS.fgWhite, resizeMode: 'contain'
                }}  
              />
              <Text style={styles.alertTxt}>You have new messages</Text>
              <View style={styles.countView}>
                <Text style={styles.msgCount}>{customerData.messageCount.COUNT}</Text>
              </View>
          </TouchableOpacity>

          <View style={styles.menu}>
                <Text style={styles.menuHdr}>Categories</Text>

                <CategoryCard 
                  onPress={() => ProcessNavigation('Enquiries')}
                  title="Enquiries"
                  desc = "Get prompt response on your enquries"
                  image={images.enquiry}
                />

                <CategoryCard 
                onPress={() => ProcessNavigation('Providers')}
                  title="Providers"
                  desc = "Connect directly with providers"
                  image={images.provider}
                />
                
          </View>
      </View>    
      {/* BODY VIEW ENDS HERE */}      
    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  coy_name: {
    color: "#BCC6F0",
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(3.5)
  },
  coyTitle: {
    color: "#A8B1DB",
    fontFamily: FONTS.RUBIK_REGULAR,
    fontSize: wp(3.3),
    marginBottom: wp(1)
  },
  menuHdr: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    color: COLORS.fgDarkGrey,
    fontSize: wp(4.4),
    marginBottom: wp(4),
    marginLeft: wp(3)
  },
  menu: {
    marginHorizontal: wp(4),
    marginTop: wp(10)
  },
  countView: {
    backgroundColor: COLORS.fgWhite,
    height: wp(7.5),
    width: wp(7.5),
    borderRadius: wp(7.5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  msgCount: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(3.9),
    color: COLORS.bgColor,
  },
  alertTxt: {
    flex: 1,
    fontFamily: FONTS.RUBIK_MEDIUM,
    color: COLORS.fgWhite,
    fontSize: wp(4.2),
    marginLeft: wp(3)  
  },
  notification: {
    backgroundColor: COLORS.fgOrange,
    borderRadius: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(4),
    marginTop: wp(5),
    padding: wp(4)
  },
  body: {
    backgroundColor: COLORS.fgGray,
    flex: 1,
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    marginTop: wp(5),
  },
  connTxt: {
    color: COLORS.screenGrey,
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(4)
  },
  connections: {
    columnGap: wp(1),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: wp(15),
    alignSelf: 'center'
  },

  connections_coy: {
    columnGap: wp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: wp(12),
    marginHorizontal: wp(5)
  },
  greetTxt: {
    color: COLORS.screenGrey,
    fontFamily: FONTS.RUBIK_LIGHT,
    fontSize: wp(4),
    marginTop: wp(2)
  },
  title: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    color: COLORS.fgWhite,
    fontSize: wp(5)
  },
  hdrToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: wp(5)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginTop: wp(4)
  }
})
export default DashboardScreen;
