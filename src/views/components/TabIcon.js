import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image, 
    Platform} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, FONTS } from '../../constants';

const TabIcon = ({focused, icon, title, addStyle}) => {
    return (
        <View style={[styles.isFocusedTab,{...addStyle}]}>
            <Image source={icon} 
                style={{
                    height: wp(5.5),
                    width: wp(5.5),
                    resizeMode: 'contain',
                    tintColor: (focused) ? COLORS.bgColor : COLORS.fgCatHeader,
                    marginBottom: wp(1)
                }}
            />
            <Text
                style={[styles.focusText, {color: focused ? COLORS.bgColor : COLORS.fgCatHeader}]}
            >{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    focusText: {
        fontSize: wp(3.3),
        fontFamily: FONTS.RUBIK_REGULAR,
    },
    isFocusedTab: {
        backgroundColor: COLORS.tabColorActive,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'ios' ? wp(6.5) : null
    }
});

export default TabIcon;