import React, {useState, useEffect, useCallback} from 'react'
import { StyleSheet,TextInput, StatusBar, Image, Text, View, Alert, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import {InnerHeader, Loader} from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat'
import { ScrollView } from 'react-native-gesture-handler';

const ChatScreen = ({navigation, route}) => {

  const customerData = useSelector((state) => state.customer.customerData);
  const {messageid, message, category, dateCreated, providerName, type, clientName} = route.params;

  const [loading, setLoading] = useState(false);
  const [messageReply, setMessageReply] = useState('');
  const [messageResponse, setMessageResponse] = useState('');
  const [messages, setMessages] = useState([])
  const [chatMessage, setChatMessage] = useState('');


  // load Message response
  const LoadMessageResponse = () => {

    setLoading(true);

    axios.get(APIBaseUrl.developmentUrl + 'messages/loadMessageResponses/' + messageid ,{},{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      setLoading(false)

      console.log(response.data)

      if(response.status == 200) {

          var newMessage = [];

          response.data.map((item) => {

            var obj = {};
                obj['_id'] = item.RESPONSE_ID;
                obj['text'] = item.RESPONSE_MESSAGE;
                obj['createdAt'] = item.RESPONSE_DATE;
                obj['user'] = {
                    '_id' : item.RESPONSE_BY,
                    'name' : 'user',
                    'avatar' : 'https://placeimg.com/140/140/any'
                }
                newMessage.push(obj)
            })

            setMessages(newMessage);

      }else{

        Alert.alert("WealthIA",'Oops! Unable to load data, please try again')

      }

    })
    .catch(error => {
      console.log(error);
    });

  }

  // post message response
  const postMessageReply = (message) => {

    let chatMsg = message[0].text;


    //check message
    if(!chatMsg) {
      Alert.alert("WealthIA","Enter your message!")
      return;
  }

  if(chatMsg.trim() == '') {
      Alert.alert("WealthIA","Your message is empty!")
      return;
  }

  if(chatMsg.trim().length < 10) {
      Alert.alert("WealthIA","Message must be more than 50 characters")
      return;
  }

  if(chatMsg.trim().length > 500) {
      Alert.alert("WealthIA","Message cannot be more 500 characters")
      return;
  }

  const data = {
      msgRuestID:messageid,
      message: chatMsg,
      response_by: customerData.CLIENT_ID,
    };

    setLoading(true);

    axios.post(APIBaseUrl.developmentUrl + 'messages/postMessageResponse',data,{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      setLoading(false)

      if(response.status == 200) {

        var newMessage = [];

        response.data.map((item) => {

          var obj = {};
              obj['_id'] = item.RESPONSE_ID;
              obj['text'] = item.RESPONSE_MESSAGE;
              obj['createdAt'] = item.RESPONSE_DATE;
              obj['user'] = {
                  '_id' : item.RESPONSE_BY,
                  'name' : 'user',
                  'avatar' : 'https://placeimg.com/140/140/any'
              }
              newMessage.push(obj)
          })

          Alert.alert("WealthIA", "Your response has been posted")

      }else{

        Alert.alert("WealthIA",'Oops! Unable to process your request, please try again')

      }

    })
    .catch(error => {
      console.log(error);
    });
}

const onSend = useCallback((messages = []) => {
  setMessages(previousMessages =>
    GiftedChat.append(previousMessages, messages),
  )
  postMessageReply(messages)
}, [])

  //USE EFFECT
  useEffect(() => {

   LoadMessageResponse();

  },[]);


    //truncate strings 
    function TruncateFullname (message) {
            if (message.length > 20) {
                return message.substring(0, 20) + " ...";
            }else{
                return message;
            }
    }
    //end of truncate string

  return (
   
        <SafeAreaView style={{
            backgroundColor: COLORS.bgColor,
            flexGrow: 1,
        }}>

        <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />

        <Loader loading={loading} />

        <View style={{
            backgroundColor: COLORS.bgColor
        }}>
            <InnerHeader showtitle={(type == 1) ? true : false} title="Enquiries" />

            {type == 1 && 
              <View style={styles.subHdr}> 
                <Text style={styles.hdrTxt}>{category}</Text>
              </View>
            }
  
            {type == 2 &&
                <View style={styles.subHdr}>
                        <View style={styles.chatTitle}>
                        <Image 
                            source={icons.chat}
                            resizeMode="contain"
                            style={{
                                width:17,
                                height:17,
                                tintColor: COLORS.fgOrange,
                                marginRight:5
                            }}
                        />
                        <Text style={styles.txtChat}>You are chatting with</Text>
                      </View>
                      <Text style={styles.hdrTxt}>{providerName}</Text>
                 </View>
            }

            {customerData.TYPE == 'Company' && 
              <View style={styles.subHdr}>
                  <View style={styles.chatTitle}>
                    <Image 
                        source={icons.chat}
                        resizeMode="contain"
                        style={{
                            width:17,
                            height:17,
                            tintColor: COLORS.fgOrange,
                            marginRight:5
                        }}
                    />
                    <Text style={styles.txtChat}>You are chatting with</Text>
                  </View>
                  
                  <Text style={styles.hdrTxt}>{TruncateFullname(clientName)}</Text>
              </View>
          }

          
        </View>

            <View style={styles.body}>
            
            <View style={styles.msghdr}>
              <View
                style={styles.providersList}
              >
                  <Image 
                      source={icons.msgicon}
                      resizeMode="contain"
                      style={{
                          width:17,
                          height:17,
                          tintColor: COLORS.fgCatTitle,
                          marginRight:5
                      }}
                  />
                    <Text
                        style={styles.provTxt}>
                        Enquiry message
                    </Text>
              </View>
              <Text style={styles.datePosted}>Posted: {dateCreated}</Text>

            </View>
                   
                <View style={styles.msgBox}>
                    <Text style={styles.msgTxt}>{message}</Text>
                </View>

                <View style={styles.social}>
                    <View style={styles.views}>
                    <Image  
                      source={icons.view}
                      resizeMode="contain"
                      style={{
                        width: wp(4), height: wp(4), resizeMode: 'contain', 
                        tintColor: COLORS.fgOrange
                      }}  
                      />
                      <Text style={styles.viewtxt}>18</Text>
                    </View>

                    <View style={[styles.views,{marginLeft: wp(-3), marginBottom: wp(0)}]}>
                    <Image  
                      source={icons.thumbsup}
                      resizeMode="contain"
                      style={{
                        width: wp(4), height: wp(4), resizeMode: 'contain', 
                        tintColor: COLORS.fgOrange
                      }}  
                      />
                      <Text style={styles.viewtxt}>32</Text>
                    </View>
                </View>


                <View style={styles.chatwindow}>


                <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                textInputStyle={{
                    fontFamily: FONTS.RUBIK_REGULAR,
                    fontSize: wp(3.8),
                    marginHorizontal: wp(10),
                }}
                renderBubble={(props) => (
                    <Bubble 
                        {...props}
                        wrapperStyle={{
                            right: {
                                fontFamily: FONTS.RUBIK_REGULAR,
                                marginBottom: wp(3),
                                fontSize: wp(2)
                            },
                            left: {
                                marginBottom: wp(3),
                                fontFamily: FONTS.RUBIK_REGULAR,
                                fontSize: wp(3),
                                marginLeft: wp(-9)
                            }
                        }}
                    />
                )}
                renderSend={(props) => (
                    <Send
                        {...props}
                        containerStyle={{
                            backgroundColor: COLORS.fgOrange,
                            height: wp(13),
                            width: wp(14),
                            marginTop: wp(1),
                            marginRight: wp(3),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: wp(3),
                        }}
                    >
                            <Image 
                                source={icons.sendicon}
                                resizeMode="contain"
                                style={{
                                    width:wp(6),
                                    height:wp(6),
                                    tintColor: COLORS.fgWhite
                                }}
                            />
                    </Send>
                )}
                alwaysShowSend={true}
                user={{
                  _id: customerData.CLIENT_ID,
                }}
              />


                {/** hell
                <ScrollView
                    style={{flex:1}}
                >

                      {
                        messageResponse.length > 0 &&

                        messageResponse.map((item) => {
                          return (
                            <View
                              key={item.RESPONSE_ID}
                              style={{
                                backgroundColor: '#ebf4ff',
                                padding: wp(2),
                                borderRadius:wp(2),
                                marginBottom: wp(2),
                                alignSelf: 'flex-end',
                                maxWidth: wp(80),
                              }}
                            >
                              <Text style={styles.respTxt}>{item.RESPONSE_MESSAGE}</Text>
                            </View>
                          )
                        })
                      }

                      {messageResponse.length == 0 &&
                        <Text style={styles.noresponse}>No response yet!</Text>
                      }
                </ScrollView>

                */}

                </View>
            </View>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  respTxt: {
    fontFamily: FONTS.RUBIK_REGULAR,
    color: COLORS.fgDarkGrey,
    fontSize: wp(3.3)
  },
  noresponse: {
      fontFamily: FONTS.RUBIK_REGULAR,
      color: COLORS.fgTabColor,
      fontSize: wp(3.5)
  },
  datePosted: {
    fontFamily: FONTS.RUBIK_REGULAR,
    color: COLORS.fgOrange,
    fontSize: wp(2.8),
    marginTop: wp(1)
  },
  msghdr: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginTop: wp(5)
  },
  btnpost: {
    backgroundColor: COLORS.fgOrange,
    paddingVertical: wp(4.5),
    paddingHorizontal: wp(5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(3),
  },
  postMsg: {
      fontFamily: FONTS.RUBIK_REGULAR,
      fontSize: wp(3.5),
      color: COLORS.fgDarkGrey,
      width:wp(56)
  },
  postTxt: {
    backgroundColor: COLORS.fgWhite,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(3),
    padding: wp(5),
    columnGap: wp(3),
    flex: 1
  },
  postBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginTop: wp(5),
    columnGap: wp(3)
  },
  chatwindow: {
    backgroundColor: COLORS.fgWhite,
    height: wp(110),
    marginHorizontal: wp(3),
    marginTop: wp(3),
    borderRadius: wp(4),
    paddingBottom: wp(3),
    paddingTop: wp(1)
  },
  social: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: wp(-1.5)
  },
  viewtxt: {
    fontFamily: COLORS.fgOrange,
    fontSize: wp(3.5),
    color: COLORS.fgOrange
  },
  views: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(3),
    marginHorizontal: wp(8),
    columnGap: wp(1)
  },
  msgTxt: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(3.3),
    color: "#625E5E",
    lineHeight: wp(5)
  },
  msgBox: {
    backgroundColor: "#E5E5E5",
    borderRadius: wp(4),
    marginHorizontal: wp(5),
    marginTop: wp(2),
    padding: wp(5),
    minHeight: wp(25)
  },
  txtChat: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    color: "#CACEDF",
    fontSize: wp(3.8)
  },
  chatTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(1),
    marginBottom: wp(1)
  },
  msgbody: {
    marginHorizontal: wp(5),
    marginTop: wp(3),
    backgroundColor: COLORS.fgWhite,
    padding: wp(1.2),
    borderRadius: wp(4)
  },
  nomsgtxt: {
     fontFamily: FONTS.RUBIK_REGULAR,
     color: COLORS.fgOrange,
     fontSize: wp(3.2),
     marginTop: wp(5)
  },
  noMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(25)
  },
  txtmsgcounter: {
    color: COLORS.fgGray,
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(3.5)
  },
  msgCount: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(1.5),
    marginTop: wp(1)
  },
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
        fontFamily: FONTS.RUBIK_MEDIUM,
        color: COLORS.fgCatTitle,
        fontSize:wp(3.5)
    },
    providersList: {
        flexDirection: "row",
        alignItems: 'center',
    },
    body: {
        backgroundColor: COLORS.fgGray,
        flex: 1,
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8),
        marginTop: wp(3),
        paddingBottom: wp(30),
        minHeight: wp(200)
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
        marginTop: wp(10),
        marginHorizontal: wp(5),
    }
})
export default ChatScreen;