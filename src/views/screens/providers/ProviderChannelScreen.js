import React, {useState, useEffect} from 'react'
import { StyleSheet, StatusBar, Image, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import {InnerHeader, ConnectionCard, Loader} from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { updateProviderChannel, updateProviderType } from '../../../store/customerSlice';
import moment from 'moment';

const ProviderChannelScreen = ({navigation}) => {

  const dispatch = useDispatch();

  const customerData = useSelector((state) => state.customer.customerData);
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState('');


  const navigateProviderMessage = (channel, type) => {

    if(channel == 'Advice') {

      dispatch(updateProviderChannel('Advice'))
      dispatch(updateProviderType('Providers'))

      navigation.navigate("ProviderMessage")

    }else if(channel == 'Compliant') {


      dispatch(updateProviderChannel('Compliant'))
      dispatch(updateProviderType('Providers'))

      navigation.navigate("ProviderMessage")

    }
  }

  return (
    <SafeAreaView style={{
      backgroundColor: COLORS.bgColor,
      flexGrow: 1,
      }}>
            <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />
            <Loader loading={loading} />
            <InnerHeader showtitle={false} title="Enquiries" />
          <View style={styles.subHdr}>
            <Text style={styles.hdrTxt}>Message Channel</Text>
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
                    tintColor: COLORS.fgOrange,
                    marginRight:5
                }}
            />
            <Text
                style={styles.provTxt}>
                Select approriate channel category
            </Text>
            </View>

          
            <View style={styles.listBg}>


            <ConnectionCard 
              title="Advice"
              desc="Provide professional service advice"
              onPress={() => navigateProviderMessage('Advice')}
            />
          
          <ConnectionCard 
            title="Compliant"
            desc="Provide response to complaint enquiries"
            onPress={() => navigateProviderMessage('Compliant')}
        />

      
            </View>
     
        
          </View>

    </SafeAreaView>
  )
}

export default ProviderChannelScreen;

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
    fontSize: wp(6)
},
subHdr: {
    marginTop: wp(8),
    marginHorizontal: wp(5)
}
})