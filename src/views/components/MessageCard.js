import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
    Image} from 'react-native'
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const MessageCard = ({coyText, onPress, title, message, date, type, readMode}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.container}>
      <View style={[styles.coyicon, {backgroundColor: (type == 1) ? "#F1F2F6" : "#A8B1DB",}]}>
        <Text style={styles.coyicontxt}>{coyText}</Text>
      </View>
      <View style={styles.msgbox}>
        <Text style={styles.txtmsg}>{title}</Text>
        <Text style={styles.descMsg}>{message}</Text>
      </View>
      <View style={styles.iconRead}>
        <Text style={styles.dateTxt}>{date}</Text> 
        <Image 
        source={(readMode == 0) ? icons.msgStatus : icons.msgRead}
        resizeMode="contain"
        style={{
            width:wp(4.3),
            height: wp(4.3),
            resizeMode: 'contain',
            marginTop: wp(6)
        }}
        />
     </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    iconRead: {
        alignItems: "flex-end"
    },
    dateTxt: {
        color: "#A8B1DB",
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(3.3),
        marginTop: wp(0.5)
    },
    descMsg: {
        color: "#9B9B9B",
        fontFamily: FONTS.RUBIK_REGULAR,
        lineHeight: wp(4.3),
        fontSize: wp(3)
    },
    msgbox: {
        flex:1
    },
    txtmsg: {
        color: COLORS.fgCatTitle,
        fontFamily: FONTS.RUBIK_MEDIUM,
        fontSize: wp(3.8),
        marginBottom: wp(1.5)
    },
    coyicontxt: {
        color: "#E5E5E5",
        fontFamily: FONTS.RUBIK_BOLD,
        fontSize: wp(8)
    },
    coyicon: {
        borderRadius: wp(4),
        height: wp(13),
        width: wp(13),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    container: {
        flexDirection: "row",
        backgroundColor: COLORS.fgWhite,
        justifyContent: 'space-between',
        borderBottomColor: "#F1F2F6",
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: wp(5),
        paddingHorizontal: wp(2),
        columnGap: wp(4)

    }
})
export default MessageCard

