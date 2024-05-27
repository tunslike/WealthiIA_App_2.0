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

const ProviderCard = ({onPress, CoySign, Name}) => {
  return (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <View style={styles.coySign}>
            <Text style={styles.txtCoy}>
                {CoySign}
            </Text>
        </View>
        <Text style={styles.title}>
            {Name}
        </Text>

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

const styles = StyleSheet.create({
    title: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(4.2),
        color: "#5E5757",
        flex: 1
    },
    txtCoy: {
        fontFamily: FONTS.RUBIK_BOLD,
        color: "#d4d4d4",
        fontSize: wp(8)
    },
    coySign: {
        backgroundColor: "#ebecf2",
        width:wp(15),
        height:wp(14),
        borderRadius:wp(4),
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#F1F2F6",
        borderBottomWidth:1,
        columnGap: wp(4.8),
        paddingVertical: wp(4),
        paddingHorizontal: wp(5),

    }
});
export default ProviderCard;

