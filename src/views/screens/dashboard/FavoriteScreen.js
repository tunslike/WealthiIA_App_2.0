import React, {useState, useEffect} from 'react'
import { StyleSheet, StatusBar, Image, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import {InnerHeader, ConnectionCard, Loader} from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import moment from 'moment';

const FavoriteScreen = () => {

  const customerData = useSelector((state) => state.customer.customerData);
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState('');


  const loadConnections = () => {

    setLoading(true);

    axios.get(APIBaseUrl.developmentUrl + 'clients/loadConnections/'+customerData.CLIENT_ID,{},{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      setLoading(false)
      setConnection(response.data)

    })
    .catch(error => {
      setLoading(false)
      console.log(error);
    });
}

  //USE EFFECT
  useEffect(() => {

    loadConnections();

  },[]);

  return (
    <SafeAreaView style={{
      backgroundColor: COLORS.bgColor,
      flexGrow: 1,
      }}>
            <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />
            <Loader loading={loading} />
            <InnerHeader showtitle={false} title="Enquiries" />
          <View style={styles.subHdr}>
            <Text style={styles.hdrTxt}>Favorites</Text>
          </View>

          <View style={styles.body}>

                <View
                style={styles.providersList}
            >
            <Image 
                source={icons.favorites}
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
                View your favorite messages
            </Text>
            </View>

            {connection.length > 0 &&

            <View style={styles.listBg}>

            {
              connection.map((item) => {
                return (
                  <ConnectionCard 
                    key={item.SEQ_NUM}
                    title={item.PROVIDER_NAME}
                    desc={`Connected since ${moment(item.DATE_CREATED).format('DD-MMM-yyyy')}`}
                  />
                  )
                })
            }
            </View>
            }
        
          </View>

    </SafeAreaView>
  )
}

export default FavoriteScreen;

const styles = StyleSheet.create({

  listBg: {
      backgroundColor: COLORS.fgWhite,
      marginHorizontal: wp(5),
      marginTop: wp(10),
      borderRadius: wp(5)
  },
  provTxt: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    color: COLORS.fgCatHeader,
    fontSize:wp(3.5)
},
  providersList: {
    flexDirection: "row",
    marginTop:wp(7),
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
    paddingBottom: wp(30)
  },
  hdrTxt: {
    fontFamily: FONTS.RUBIK_MEDIUM,
    color: COLORS.fgWhite,
    fontSize: wp(4.8)
},
subHdr: {
    marginTop: wp(8),
    marginHorizontal: wp(5)
}
})