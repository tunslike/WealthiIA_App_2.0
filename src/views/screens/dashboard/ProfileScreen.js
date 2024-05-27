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
import {InnerHeader, ProfileField, SettingCard} from '../../components';
import { useSelector, useDispatch } from 'react-redux';

const ProfileScreen = ({navigation}) => {

  const customerData = useSelector((state) => state.customer.customerData);

  return (
    <View
    style={{
      flex: 1, backgroundColor: COLORS.bgColor,
      paddingTop: Platform.OS === 'android' ? wp(2) : wp(13)
    }}
  >
    <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />
    <InnerHeader showtitle={false} title="Enquiries" />

    <ScrollView>

    <View style={styles.profilebox}>

            <View style={styles.profile_icon}>
                <Image 
                    source={icons.userIconProfile}
                    resizeMode="contain"
                    style={{
                        width: wp(13),
                        height: wp(13)
                    }}
                />
            </View>
            <View
            style={{
                marginHorizontal: 30,
                marginTop: 20,
                marginBottom:30
            }}
        >
        <Text
           style={styles.useridtxt}
        >
            Username: {customerData.USER_ID}
        </Text>
        </View>
    </View>

    <View style={styles.profileInputs}>

    <ProfileField 
    title="Full Name"
    value={customerData.FIRST_NAME + ' ' + customerData.LAST_NAME}
    icon={icons.name}
/>
<ProfileField 
    title="Email"
    value={customerData.EMAIL}
    icon={icons.mail}
/>
<ProfileField 
    title="Account"
    value={customerData.TYPE}
    icon={icons.type}
/>
<ProfileField 
    title="Phone"
    value={customerData.MOBILE_PHONE}
    icon={icons.phone}
/>
<ProfileField 
    title="State"
    value="Lagos"
    icon={icons.location}
/>
    </View>

    <View style={styles.profileButtom}>

            <Text style={styles.btmHeader}>Settings</Text>

            <View style={styles.btmBody}>
                    <SettingCard 
                    title="Change Password"
                    titleSign="C"
                    OnPress={() => navigation.navigate("ChangePassword")}
                />
                { (customerData.TYPE == 'Company') &&

                    <SettingCard 
                    title="Add Accounts"
                    titleSign="A"
                    OnPress={() => navigation.navigate("AddAccounts", {clientid: clientid})}
                    />
                }
            
            </View>

            <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.fgOrange,
                        borderRadius:wp(4),
                        padding:20,
                        marginTop:wp(5),
                        marginBottom: wp(15),
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
             
                >
                    <Text
                        style={{
                            fontFamily: FONTS.RUBIK_MEDIUM,
                            color: COLORS.fgWhite,
                            fontSize: wp(4)
                        }}
                    >
                        Logout
                    </Text>
                    <Image 
                        source={icons.logout2}
                        resizeMode="contain"
                        style={{
                            width:20,
                            height: 20,
                            tintColor: COLORS.fgWhite,
                            marginLeft:10
                        }}
                    />
                </TouchableOpacity>
    
    </View>

    </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
    btmBody: {
        backgroundColor: COLORS.fgWhite,
        borderRadius: wp(5),
        paddingTop:10,
        marginTop: 10,
        marginBottom: wp(8)
    },
    btmHeader: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(4),
        color: COLORS.fgCatHeader,
        marginLeft: wp(4)
    },
    profileButtom: {
        backgroundColor: COLORS.fgGray,
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        flex:1,
        marginTop: wp(3),
        paddingHorizontal: wp(5),
        paddingTop: wp(5)
    },
    profileInputs: {
        marginHorizontal: wp(5)
    },
    useridtxt: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(3.5),
        color: "#CACEDF"
    },
    profile_icon: {
        backgroundColor: COLORS.fgGray,
        borderRadius: wp(17.5),
        height:wp(17.5),
        width:wp(17.5),
        justifyContent:"center",
        alignItems: "center"
    },
    profilebox : {
        alignItems: 'center'
    }
});
export default ProfileScreen;

