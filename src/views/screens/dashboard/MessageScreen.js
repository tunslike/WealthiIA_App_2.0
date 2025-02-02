import React, {useState, useEffect} from 'react'
import { StyleSheet, StatusBar, Image, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import {InnerHeader, MessageCard, Loader} from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { AuthContext } from '../../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const MessageScreen = ({navigation, route}) => {

  const customerData = useSelector((state) => state.customer.customerData);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const loadMessages = () => {

      setLoading(true);

      axios.get(APIBaseUrl.developmentUrl + 'messages/loadMessages/'+customerData.CLIENT_ID,{},{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {

        setLoading(false)
        setMessage(response.data)

      })
      .catch(error => {
        setLoading(false)
        console.log(error);
      });
}

const loadEnquiriesMessages = () => {

  //setLoading(true);

  axios.get(APIBaseUrl.developmentUrl + 'messages/providerEnquries/'+customerData.SECTOR_ID,{},{
    headers: {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8082'
    }
  })
  .then(response => {

    setLoading(false)

    //console.log(response.data)
    setMessage(response.data.enquiries)

  })
  .catch(error => {
    setLoading(false)
    console.log(error);
  });
}

    //truncate strings 
    function TruncateString (message) {
      if (message.length > 45) {
          return message.substring(0, 45) + " ...";
      }else{
          return message;
      }
  }
  //end of truncate string


  useFocusEffect(
    React.useCallback(() => {
      loadMessages();
    }, [])
  );


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
            <InnerHeader showtitle={false} title="Enquiries" />

            <View style={styles.subHdr}>
                <Text style={styles.hdrTxt}>
                    {(customerData.TYPE == 'Individual') &&
                        "Messages"
                    }
                    {(customerData.TYPE == 'Company') &&
                       "Enquries"
                    }
                </Text>
                <View style={styles.msgCount}>
                  <Image source={icons.chat} 
                    style={{
                      height: wp(4), width: wp(4), 
                      resizeMode: 'contain', tintColor: COLORS.fgOrange
                    }}
                  />
                  <Text style={styles.txtmsgcounter}>Total {message.length}</Text>
                </View>
            </View>

        </View>

            <View style={styles.body}>
            
                    <View
                        style={styles.providersList}
                    >
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
                    <Text
                        style={styles.provTxt}>
                        Unread Messages {0}
                    </Text>
                    </View>

               
            {message == 0 &&
            
              <View style={styles.noMessage}>
                <Image source={images.no_msg} 
                  style={{
                    height: wp(40), width: wp(40), resizeMode: 'contain',
                    borderRadius: wp(8)
                  }}
                />
                <Text style={styles.nomsgtxt}>Sorry, you do not have any message!</Text>
              </View>
            }

            {message.length > 0 &&
            
              <View style={styles.msgbody}>

              <FlatList 
              data={message}
              keyboardDismissMode="on-drag"
              keyExtractor={item => `${item.REQUEST_ID}`} 
              showsVerticalScrollIndicator={false}
              renderItem={
                  ({ item }) => {
                      return (
                          <MessageCard
                          readMode={item.CHECKED}
                          type={item.TYPE}
                          coyText={item.PROVIDER_NAME == null ? item.SUB_NAME.charAt(0) : item.PROVIDER_NAME.charAt(0)} 
                          title={item.PROVIDER_NAME == null ? item.SUB_NAME + ' Enquiry' : item.PROVIDER_NAME}
                          message={TruncateString(item.MESSAGE)}
                          date={moment(item.DATE_CREATED, "YYYYMMDD").fromNow()}
                          onPress={() => navigation.navigate("Chat", {messageid: item.REQUEST_ID, category: item.SUB_NAME, message: item.MESSAGE, dateCreated: item.DATE_CREATED_FORMATED, providerName: item.PROVIDER_NAME, type: item.TYPE})}
                          />
                      )
                  }
              }
            />  


              {/*
              <MessageCard 
                onPress={() => navigation.navigate("MessageChat")}
                type={1}
                readMode={1}
                coyText="C"
                title="Investment Enquiry"
                message="Hello this is a new message about health management"
                date="7 months ago"
              />
              <MessageCard
                coyText="C"
                title="Health Management Enquiry"
                message="Hello this is a new message about health management"
                date="7 months ago"
            />
            <MessageCard
                coyText="K"
                type={1}
                title="Investment Enquiry"
                message="Hello this is a new message about health management"
                date="6 months ago"
        />

            <MessageCard
                coyText="Q"
                type={1}
                readMode={1}
                title="Loans Enquiry"
                message="Hello this is a new message about health management"
                date="6 months ago"
              />

              <MessageCard
              coyText="H"
              type={1}
              readMode={1}
              title="Pensions Enquiry"
              message="Hello this is a new message about health management"
              date="2 months ago"
            />
          */}

              </View>
            }


            </View>

        </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  msgbody: {
    marginHorizontal: wp(3),
    marginTop: wp(5),
    backgroundColor: COLORS.fgWhite,
    padding: wp(1.2),
    borderRadius: wp(4),
    marginBottom:wp(32)
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
    fontSize: wp(3.2)
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
        color: COLORS.fgCatHeader,
        fontSize:wp(3.5)
    },
    providersList: {
        flexDirection: "row",
        marginTop:wp(5),
        alignItems: 'center',
        paddingHorizontal:20,
        marginLeft: wp(2)
    },
    body: {
        backgroundColor: COLORS.fgGray,
        flex: 1,
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8),
        marginTop: wp(5),
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
        fontSize: wp(4.8)
    },
    subHdr: {
        marginTop: wp(8),
        marginHorizontal: wp(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
export default MessageScreen;