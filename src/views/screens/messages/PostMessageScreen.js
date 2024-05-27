import React, {useState} from 'react'
import { StyleSheet,TextInput, StatusBar, Image, Text, View, Alert, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import {InnerHeader, AppButton, Loader} from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

const PostMessageScreen = ({navigation, route}) => {

    const customerData = useSelector((state) => state.customer.customerData);
    const {subCategory, subID} = route.params;

    //states
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    //validate account number
    const postClientEnquiry = () => {
      
        Alert.alert("WealthIA", 'Do you want to post your enquiry message?', [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => postEnquiryMessage()},
        ]);

      }// end function

    const postEnquiryMessage = () => {

          //check message
          if(!message) {
            Alert.alert("WealthIA","Enter your message!")
            return;
        }

        if(message.trim() == '') {
            Alert.alert("WealthIA","Your message is empty!")
            return;
        }

        if(message.trim().length < 10) {
            Alert.alert("WealthIA","Message must be more than 50 characters")
            return;
        }

        if(message.trim().length > 500) {
            Alert.alert("WealthIA","Message cannot be more 500 characters")
            return;
        }

        const data = {
            clientid: customerData.CLIENT_ID,
            subcatid: subID,
            message: message,
            type: "1",
          };

          console.log(data)
    
          setLoading(true);
    
          axios.post(APIBaseUrl.developmentUrl + 'messages/postEnquiryMessage',data,{
            headers: {
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:8082'
            }
          })
          .then(response => {
    
            setLoading(false)
    
            console.log(response)
    
            if(response.status == 201) {

                navigation.navigate("PostSuccess", {type: "enquiries"})
    
            }else{
    
              Alert.alert("WealthIA",'Oops! Unable to process your request, please try again')
    
            }
    
          })
          .catch(error => {
            console.log(error);
          });

    }
  
  return (
    <KeyboardAwareScrollView 
        enableOnAndroid={true}
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={-300}
        contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.fgGray
        }}
    > 
    <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />
        <SafeAreaView style={{
            backgroundColor: COLORS.bgColor
        }}>

        <Loader loading={loading} />

        <View style={{
            backgroundColor: COLORS.bgColor
        }}>
            <InnerHeader showtitle={true} title="Enquiries" />

            <View style={styles.subHdr}>
                <Text style={styles.descTxt}>Post message to channel</Text>
                <Text style={styles.hdrTxt}>{subCategory}</Text>
            </View>

        </View>

            <View style={styles.body}>
            
                    <View
                        style={styles.providersList}
                    >
                    <Image 
                        source={icons.portfolio}
                        resizeMode="contain"
                        style={{
                            width:17,
                            height:17,
                            tintColor: COLORS.fgCatHeader,
                            marginRight:5
                        }}
                    />
                    <Text
                        style={styles.provTxt}>
                        25 Providers connected to this channel
                    </Text>
                    </View>

                    <View
                        style={styles.descBox}
                    >
                    <Text
                        style={styles.desctitle}
                    >
                        Post your enquiry below and get a response from connected employers
                    </Text>
                    </View>

                    <View style={styles.msgbox}>

                    <TextInput
                        style={styles.textInputbox}
                        placeholder="Type your message here"
                        autoCapitalize="none"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(message) => setMessage(message)}
                        value={message}
                    />
                    </View>

                    <View
                    style={styles.counter}
                >
                        <Text
                            style={styles.txtCounter}
                        >Total Characters {message.length}</Text>
                </View>

<View style={styles.btnbox}>
    <AppButton 
        title="Post Message" 
        onPress={postClientEnquiry}
    />
</View>

            </View>

        </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    txtCounter: {
        color: "#AEAEAE",
        fontFamily: FONTS.RUBIK_REGULAR,
        fontSize: wp(3.1)
    },
    counter: {
        marginHorizontal: wp(5),
        alignItems: "flex-end",
        marginTop: wp(3)
    },
    btnbox: {
        marginTop: wp(10),
        marginHorizontal: wp(5)
    },
    textInputbox: {
        textAlignVertical:'top', 
        fontSize:wp(3.5),
        fontFamily: FONTS.RUBIK_REGULAR,
        minHeight: wp(70),
        paddingHorizontal: wp(4),
        paddingTop: wp(4)
    },
    msgbox: {
        marginHorizontal: wp(4),
        backgroundColor: COLORS.fgWhite,
        borderRadius: wp(4),
    },
    desctitle: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(3.5),
        lineHeight:wp(5),
        color: COLORS.fgCatTitle
    },
    descBox: {
        marginHorizontal: wp(4),
        marginVertical: wp(5)
    },
    provTxt: {
        fontFamily: FONTS.RUBIK_REGULAR,
        color: COLORS.fgCatHeader,
        fontSize:wp(3.5)
    },
    providersList: {
        flexDirection: "row",
        marginTop:30,
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal:20,
        justifyContent: 'center'
    },
    body: {
        backgroundColor: COLORS.fgGray,
        flex: 1,
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8),
        marginTop: wp(5),
        paddingBottom: wp(30)
      },
    descTxt: {
        color: COLORS.fgButtonBorder,
        fontFamily: FONTS.RUBIK_REGULAR,
        fontSize: wp(3.5),
        marginBottom: wp(1.5)
    },
    hdrTxt: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        color: COLORS.fgWhite,
        fontSize: wp(6)
    },
    subHdr: {
        marginTop: wp(8),
        marginHorizontal: wp(5)
    }
})
export default PostMessageScreen