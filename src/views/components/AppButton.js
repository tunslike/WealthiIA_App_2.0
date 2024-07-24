import React from 'react';
import {
    TouchableOpacity,
    Text, StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, FONTS, icons } from '../../constants'

const AppButton = ({title, onPress}) => {
 
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.5}
        >
            <Text
                style={styles.title}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.fgOrange,
        borderRadius: wp(4),
        paddingVertical: wp(5),
        alignItems: 'center',
    },
    title: {
        color: COLORS.fgWhite,
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(3.5)
    }
})

export default AppButton;
