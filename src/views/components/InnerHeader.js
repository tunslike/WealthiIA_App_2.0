import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, Platform,
    Image} from 'react-native'
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'

const InnerHeader = ({showtitle, title}) => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()}>
        <Image 
            source={icons.backarrow}
            style={{
                height: wp(4.7), width: wp(4.7), resizeMode: 'contain', tintColor: COLORS.fgWhite
            }}
        />
      </TouchableOpacity>
      {showtitle &&
        <Text style={styles.title}>{title}</Text>
      }
      <View style={styles.hdrToolbar}>
      <TouchableOpacity>
        <Image 
          source={icons.alert} 
          style={{
            height: wp(7), width: wp(7), tintColor: COLORS.fgWhite, resizeMode: 'contain'
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
      >
      <Image 
        source={icons.profile} 
        style={{
          height: wp(5.9), width: wp(5.9), tintColor: COLORS.fgWhite, resizeMode: 'contain'
        }}
      />
    </TouchableOpacity>
  </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    color: COLORS.fgButtonBorder,
    fontFamily: FONTS.RUBIK_MEDIUM,
    fontSize: wp(4.6)
  },
    hdrToolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: wp(4)
      },
    container: {
        marginTop: wp(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp(5),
        columnGap: wp(5)
    }
});

export default InnerHeader;

