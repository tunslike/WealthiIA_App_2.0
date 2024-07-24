import React, {useEffect, useState,  useMemo, useCallback, useRef} from 'react';
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
import axios from 'axios';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { InnerHeader, ChannelCard, ProviderCard, Loader } from '../../components'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ProviderListScreen = ({navigation, route}) => {

        
    const {subCategory, subID} = route.params;

    const [loading, setLoading] = useState(false)
    const [providerList, setProviderList] = useState('');
    const [provider, setProvider] = useState('');
    const [providerId, setProviderId] = useState('');

    const BottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['35%','50%'], []);
  
    //callbacks
    const handleSheetChange = useCallback((index) => {
        console.log(index)
    }, []);

    const handleCloseBottomSheet = () => BottomSheetRef.current?.close();
    const handleOpenBottomSheet = (value, providerId) => {
        setProvider(value)
        setProviderId(providerId)
        BottomSheetRef.current?.expand();
    } 

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []
    )



       // function to verify data
   const fetchProviderList = () => {

    setLoading(true)

        axios.get(APIBaseUrl.developmentUrl + 'clients/fetchProviderList/'+subID,{},{
        headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
        })
        .then(response => {

            setLoading(false)

            console.log(response.data)
            setProviderList(response.data)

        })
        .catch(error => {
        console.log(error + "1");
        });

    }// end of function 


  //USE EFFECT
  useEffect(() => {

    handleCloseBottomSheet();
    fetchProviderList();

  }, []);

    return (
        <SafeAreaView
            style={{
            flex: 1, backgroundColor: COLORS.bgColor,
            }}
        >
        <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />

        <Loader loading={loading} />
        <InnerHeader
            showtitle={true}
            title="Sector"
        />

        <View style={styles.title}>
            <Text style={styles.titleTxt}>{subCategory}</Text>
        </View>

        <View style={styles.body}>

            <View style={styles.countbox}>
                <Image source={icons.portfolio} 
                    style={{
                        height:wp(4.5), width: wp(4.5), tintColor: COLORS.fgOrange, resizeMode: 'contain'
                    }}
                />
                <Text style={styles.countxt}>{providerList.length} Providers found</Text>
            </View>

            {providerList.length == 0 &&
                
                <View style={styles.alertbox}>
                    <Image 
                        source={images.no_provider}
                        style={{
                            height: wp(40), width: wp(40), resizeMode: 'contain', borderRadius: wp(4)
                        }}
                    />
                    <Text style={styles.txtAlert}> No provider connected to category!</Text>
                </View>
            }

            <ScrollView>
            <View style={styles.listbody}>

                {providerList.length > 0 &&
                    
                    providerList.map((item) => {
                        return(
                            <ProviderCard key={item.PROVIDER_ID}
                                onPress={() => handleOpenBottomSheet(item.PROVIDER_NAME, item.PROVIDER_ID)}
                                CoySign="A"
                                Name={item.PROVIDER_NAME}
                            />
                        )
                    })
                }
            </View> 

            </ScrollView>

        </View>

        {provider != '' ? (

        <BottomSheet
            ref={BottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            backdropComponent={renderBackdrop}
            backgroundStyle={{
                backgroundColor: COLORS.fgGray
            }}
        >
        <View style={styles.contentContainer}>
        <Text style={styles.titleConnect}>You are connected to</Text>
        <View style={styles.conectCoy}>
        <Image source={icons.portfolio} 
            style={{
                width:wp(5), height: wp(5), resizeMode: 'contain', tintColor: COLORS.fgOrange
            }}
        />
        <Text style={styles.connectTxt}>{provider}</Text>
        </View>
          <Text style={styles.bt_title}>Select approriate channel category</Text>

          <View style={styles.whitebox}>
                <ChannelCard 
                    title="Advice" 
                    desc="Get professional advice and tips"
                    onPress={() => navigation.navigate("PostProviderMessage",{type: "Advice", provideName: provider, providerID: providerId, subCategoryId:subID})} 
                />
                <ChannelCard 
                    title="Compliant" 
                    desc="Get Prompt complaint enquiries" 
                    onPress={() => navigation.navigate("PostProviderMessage",{type: "Compliant", provideName: provider, providerID: providerId, subCategoryId:subID})} 
                />
          </View>
        </View>
      </BottomSheet>) : null}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    whitebox: {
        backgroundColor: COLORS.fgWhite,
        borderRadius: wp(4),
        marginTop: wp(4)
    },
    titleConnect: {
        fontFamily: FONTS.RUBIK_REGULAR,
        fontSize: wp(3.5),
        color: COLORS.fgOrange,
        marginLeft: wp(3)
    },
    connectTxt:{
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(3.5),
        color: "#5E5757",
    },
    conectCoy: {
        backgroundColor: COLORS.fgWhite,
        paddingHorizontal: wp(4),
        paddingVertical: wp(3),
        borderRadius: wp(3),
        marginTop: wp(2),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: wp(2)
    },
    bt_title: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(3.7),
        marginTop: wp(8.5),
        color: "#293259",
        marginLeft: wp(2)
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: wp(5),
        paddingTop: wp(4)
      },
    txtAlert: {
        color: COLORS.fgTabColor,
        fontFamily: FONTS.RUBIK_REGULAR,
        fontSize: wp(3.5)
    },
    alertbox: {
        alignItems: 'center'
    },
    countxt: {
     fontFamily: FONTS.RUBIK_REGULAR,
     fontSize: wp(3.5),
     color: COLORS.fgCatHeader
    },
    countbox: {
        marginHorizontal: wp(5),
        marginTop: wp(10),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: wp(2),
        alignSelf: 'center'
    },
    listbody: {
        backgroundColor: COLORS.fgWhite,
        marginHorizontal: wp(5),
        marginTop: wp(10),
        borderRadius: wp(5),
    },
    body: {
        backgroundColor: COLORS.fgGray,
        flex: 1,
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8),
        marginTop: wp(5),
        paddingBottom: wp(30),
      },
    titleTxt: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        color: COLORS.fgWhite,
        fontSize: wp(5.5)
    },
    title: {
        marginHorizontal: wp(5),
        marginTop: wp(5)
    }
})
export default ProviderListScreen;
