import React from 'react';
import { StyleSheet, Text, Platform, Image, TouchableOpacity } from 'react-native';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CategoryListCard = ({onPress, title}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={styles.container}
    >
      <Image 
        source={icons.stop}
        style={{
            width: wp(6), height: wp(6), resizeMode: 'contain'
        }}
      />
      <Text style={styles.title}>{title}</Text>
      <Image 
        source={icons.categoryArrow}
        resizeMode="contain"
        style={{
            width:wp(5),
            height:wp(5),
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    title: {
        color: COLORS.fgWhite,
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: Platform.OS === 'android' ? wp(4.2) : wp(5),
        flex: 1
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: wp(4.5),
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderRadius: wp(3.5),
        borderColor: COLORS.fgButtonBorder,
        paddingHorizontal: wp(4),
        paddingVertical: Platform.OS === 'android' ? wp(4) : wp(4.5),
        marginBottom: wp(5)
    }
})

export default CategoryListCard;