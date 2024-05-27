import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../constants';

const SettingCard = ({title, titleSign, OnPress}) => {
 
    return (

        <TouchableOpacity
        style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "#F1F2F6",
            borderBottomWidth:1,
            paddingBottom:wp(4),
            paddingTop:wp(2),
            paddingHorizontal: wp(5),
            alignItems: "center"
        }}
        onPress={OnPress}
    >
        <View
            style={{
                backgroundColor: "#F1F2F6",
                width:47,
                height:49,
                borderRadius:10,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text
                style={{
                    fontFamily: FONTS.RUBIK_MEDIUM,
                    color: "#E5E5E5",
                    fontSize: 30
                }}
            >
                {titleSign}
            </Text>
        </View>

        <View
            style={{
                flex:1,
                paddingHorizontal: 15
            }}
        >
            <Text
                style={
                    {
                        fontFamily: FONTS.RUBIK_MEDIUM,
                        color: "#5E5757",
                        fontSize: 16.5,
                        marginBottom:5,
                    }               
                }
            >
                {title}
            </Text>
        </View>
            <Image 
            source={icons.categoryArrow}
            resizeMode="contain"
            style={{
                width:20,
                height:20,
                tintColor: COLORS.fgOrange
            }}
        />
    
    </TouchableOpacity>
    )
    
}

export default SettingCard;