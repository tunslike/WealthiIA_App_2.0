import React from 'react'
import { 
    Image,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    Platform,
    StyleSheet, 
    Text, 
    View, 
    Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, FONTS, icons } from '../../constants';

const CategoryCard = ({title, desc, onPress, image}) => {
  return (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <ImageBackground
            style={styles.display}
            source={image}
            imageStyle={{ borderRadius: wp(3)}}
        >
        </ImageBackground>
        <View style={{flex: 1}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{desc}</Text>
        </View>
        <Image source={icons.categoryArrow} 
            style={{
                height: wp(5), width: wp(5), resizeMode: 'contain'
            }}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    desc: {
        color: COLORS.fgTabColor,
        fontFamily: FONTS.RUBIK_LIGHT,
        fontSize: wp(3.3),
        marginRight: wp(5)
    },
    title: {
        color: COLORS.fgCatTitle,
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(4.3),
        marginBottom: wp(4)
    },
    display: {
        height: wp(22),
        width: wp(30),
        borderRadius: wp(10),
        marginRight: wp(3)
    },
    container: {
        backgroundColor: COLORS.fgWhite,
        borderRadius: wp(4),
        padding: wp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: wp(4)
    }
})
export default CategoryCard