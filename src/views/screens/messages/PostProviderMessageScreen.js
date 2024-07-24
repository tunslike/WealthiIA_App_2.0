import React, {useState, useEffect} from 'react'
import { StyleSheet,TextInput, StatusBar, Image, Text, View, Alert, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import {InnerHeader, AppButton, Loader} from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

const PostProviderMessageScreen = ({navigation, route}) => {

    const customerData = useSelector((state) => state.customer.customerData);
    const {provideName, providerID, type, subCategoryId} = route.params;

    //states
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState(0)


    const saveConnection = () => {

        if(providerID == '') {
            Alert.alert("WealthIA", "Invalid provider session!")
            return;
        }

        Alert.alert("WealthIA", 'Do you want to save provider as connection?', [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => saveProviderConnection()},
          ]);
    }

    const saveProviderConnection = () => {

        const data = {
            client_id: customerData.CLIENT_ID,
            connect_id: providerID,
        };

        setLoading(true);
    
        axios.post(APIBaseUrl.developmentUrl + 'clients/saveConnection',data,{
          headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8082'
          }
        })
        .then(response => {
  
          setLoading(false)
  
          console.log(response)
  
          if(response.status == 201) {

              setConnection(1);
              Alert.alert("WealthIA", "Connection saved successfully!")
  
          }else{
  
            Alert.alert("WealthIA",'Oops! Unable to process your request, please try again')
  
          }
  
        })
        .catch(error => {
          console.log(error);
        });

    }

    //validate account number
    const postClientEnquiry = () => {

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
      
        Alert.alert("WealthIA", 'Do you want to post message to employer?', [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => postProviderMessage()},
        ]);
    
      }// end function

    const postProviderMessage = () => {

        const data = {
            clientid: customerData.CLIENT_ID,
            subcatid: subCategoryId,
            message: message,
            providerid: providerID,
            type: "2",
            channelCategory: type,
          };

          console.log(data)
  
          setLoading(true);
    
          axios.post(APIBaseUrl.developmentUrl + 'messages/postProviderMessage',data,{
            headers: {
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:8082'
            }
          })
          .then(response => {
    
            setLoading(false)
    
            console.log(response)
    
            if(response.status == 201) {

                navigation.navigate("PostSuccess", {type: "provider"})
    
            }else{
    
              Alert.alert("WealthIA",'Oops! Unable to process your request, please try again')
    
            }
    
          })
          .catch(error => {
            console.log(error);
          });
    }

    const validateProviderConnection = () => {

        console.log(providerID)
    
        axios.get(APIBaseUrl.developmentUrl + 'clients/checkSavedConnection/' + providerID,{},{
          headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8082'
          }
        })
        .then(response => {


            console.log(response.data);
  
          if(response.data.PROVIDER_ID) {
            setConnection(1)
          }else{
            setConnection(0)
          }

  
        })
        .catch(error => {
          console.log(error);
        });
    }



  //USE EFFECT
  useEffect(() => {

    //return greetings
    validateProviderConnection();

  });
  
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
    <Loader loading={loading} />
        <SafeAreaView style={{
            backgroundColor: COLORS.bgColor
        }}>

        <View style={{
            backgroundColor: COLORS.bgColor
        }}>
            <InnerHeader showtitle={true} title={type} />

            <View style={styles.subHdr}>
                <Text style={styles.descTxt}>Post message to</Text>
                <Text style={styles.hdrTxt}>{provideName}</Text>
            </View>

        </View>

            <View style={styles.body}>
            
                    <TouchableOpacity
                        style={[styles.providersList,{borderColor: (connection == 1) ? "#38a14b" : COLORS.fgTabColor}]}
                        onPress={() => (connection == 0) ? saveConnection() : null}
                    >
                    <Image 
                        source={icons.portfolio}
                        resizeMode="contain"
                        style={{
                            width:17,
                            height:17,
                            tintColor: (connection == 0) ? COLORS.fgCatHeader : "#38a14b",
                            marginRight:5
                        }}
                    />

                    {connection == 1 && 
                        <Text
                            style={[styles.provTxt, {color: (connection == 1) ? "#38a14b" : null}]}>
                            Provider saved as connection!
                        </Text>
                    }

                    {connection == 0 &&
                      <Text
                        style={styles.provTxt}>
                        Save provider as connection
                      </Text>
                    }
                    </TouchableOpacity>

                    <View
                        style={styles.descBox}
                    >
                    <Text
                        style={styles.desctitle}
                    >
                        Post your message and get a response from provider
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
        fontSize:wp(3),
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
        fontSize: wp(3.2),
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
        fontSize:wp(3)
    },
    providersList: {
        flexDirection: "row",
        marginTop:30,
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal:20,
        justifyContent: 'center',
        borderWidth:1,
        borderStyle: "solid",
        padding: wp(2),
        borderRadius: wp(2),
        marginHorizontal: wp(10),
        backgroundColor: COLORS.fgWhite
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
        fontSize: wp(5)
    },
    subHdr: {
        marginTop: wp(8),
        marginHorizontal: wp(5)
    }
})
export default PostProviderMessageScreen