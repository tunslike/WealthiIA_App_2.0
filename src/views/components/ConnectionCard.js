import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ConnectionCard = ({onPress, title, desc}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={styles.container}
    >
        <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
        </View>
        <Image 
        source={icons.categoryArrow}
        resizeMode="contain"
        style={{
            width:wp(5),
            height:wp(5),
            tintColor: COLORS.fgOrange
        }}
    />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    desc: {
        color: COLORS.bgColor,
        fontFamily: FONTS.RUBIK_REGULAR,
        fontSize: wp(3.3)
    },
    title: {
        color: "#5E5757",
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(4.2),
        marginBottom: wp(1.5)
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: "#F1F2F6",
        borderBottomWidth:1,
        padding: wp(4.5)
    }
})
export default ConnectionCard;