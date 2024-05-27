import React, {useEffect, useState} from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { InnerHeader, CategoryListCard, Loader } from '../../components'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const EnquiryListScreen = ({navigation, route}) => {

    const { type } = route.params

    const [loading, setLoading] = useState(false)
    const [subCategories, setSubCategories] = useState('');
  
   // function to verify data
   const loadSubCategories = () => {

    setLoading(true)

        axios.get(APIBaseUrl.developmentUrl + 'categories/subCategories',{},{
        headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
        })
        .then(response => {

            setLoading(false)

            console.log(response.data)
            setSubCategories(response.data)

        })
        .catch(error => {
        console.log(error + "1");
        });

    }// end of function 

  //USE EFFECT
  useEffect(() => {

    loadSubCategories();

  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1, backgroundColor: COLORS.bgColor,
      }}
    >

    <Loader loading={loading} />
      
     <ImageBackground
        source={images.listbg}
        resizeMode='cover'
        style={{
            flex: 1
        }}
     >
        <InnerHeader />
    
        <View style={styles.title}>
            <Text style={styles.titleTxt}>{(type == 1) ? "Enquiries" : "Sectors" }</Text>
        </View>

        <ScrollView>

        <View style={styles.listBody}>

            {subCategories.length > 0 &&
                subCategories.map((item) => {
                    return (
                        <CategoryListCard 
                            key={item.SUB_CATEGORY_ID}
                            onPress={() => (type == 1) ? navigation.navigate("PostMessage", {subCategory: item.SUB_NAME, subID: item.SUB_CATEGORY_ID}) : navigation.navigate("ProviderList", {subCategory: item.SUB_NAME, subID: item.SUB_CATEGORY_ID})}
                            title={item.SUB_NAME}
                        />
                    )
                })
            }

        </View>

        </ScrollView>
    
     </ImageBackground>

    
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    listBody: {
        marginHorizontal: wp(5),
        marginTop: wp(8)
    },
    titleTxt: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        color: COLORS.fgWhite,
        fontSize: wp(6.5)
    },
    title: {
        marginHorizontal: wp(5),
        marginTop: wp(5)
    }
})

export default EnquiryListScreen;