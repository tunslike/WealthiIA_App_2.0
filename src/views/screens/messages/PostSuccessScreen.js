import React from 'react'
import {View,
    Text,
    TouchableOpacity,
    StatusBar, StyleSheet,
    Image } from 'react-native'
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const PostSuccessScreen = ({navigation, route}) => {
    const { type } = route.params

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />
      <View style={styles.iconbg}>
        <Image 
                source={icons.success_icon}
                resizeMode="contain"
                style={{
                    width: 100,
                    height: 100
                }}
            />
      </View>
      <Text style={styles.txtMsg}>
      Your message has been posted successfully!
</Text>


{type == 'enquries' && 
    <Text style={styles.txtDesc}>
    Connected providers will provide a response to your message soon.
    Please check your messages later
    </Text>
}

{type == 'provider' && 
    <Text style={styles.txtDesc}>
    The provider will provide a response to your message soon.
    Please check your messages later
    </Text>
}

      <View style={styles.btnbody}>
            <TouchableOpacity
            style={styles.btnCompleted}
            onPress={() => navigation.navigate("Tab")}
        >
            <Text
                style={styles.txtCompleted}
            >
                Completed
            </Text>
            <Image 
                source={icons.thumbsup}
                resizeMode="cover"
                style={{
                    width: wp(5),
                    height: wp(5),
                    tintColor: COLORS.fgWhite,
                    marginBottom:5,
                    marginLeft: 5
                }}
            />
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    btnCompleted: {
        backgroundColor: COLORS.fgOrange,
        paddingVertical: wp(5),
        width: "100%",
        borderRadius: wp(3),
        marginTop: wp(20),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    txtCompleted: {
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(4),
        color: COLORS.fgWhite
    },
    btnbody: {
        marginHorizontal: wp(5)
    },
    txtMsg: {  
        textAlign: "center",
        lineHeight: wp(7),
        color: COLORS.fgGray,
        marginTop: wp(10),
        fontSize: wp(4.5),
        paddingHorizontal: wp(3),
        fontFamily: FONTS.RUBIK_MEDIUM
    },
    txtDesc: {  
        textAlign: "center",
        lineHeight: wp(5.2),
        color: "#BCC6F0",
        marginTop: wp(10),
        fontSize: wp(4),
        paddingHorizontal: wp(8),
        fontFamily: FONTS.RUBIK_MEDIUM
    },
    iconbg: {
        backgroundColor: COLORS.fgWhite,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        width: wp(30),
        borderRadius: wp(10),
        height: wp(30)
    },
    container: {
        flex:1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: COLORS.bgColor,
    }
})
export default PostSuccessScreen;
