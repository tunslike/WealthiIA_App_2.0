import { Platform } from "react-native";

const FONTS = {
  ...Platform.select({
    ios: {
        RUBIK_BOLD: 'Rubik-Bold',
        RUBIK_LIGHT: 'Rubik-Light',
        RUBIK_REGULAR: 'Rubik-Regular',
        RUBIK_MEDIUM: 'Rubik-Medium',
        RUBIK_SEMIBOLD: 'Rubik-SemiBold'
    },
    android: {
        RUBIK_BOLD: 'Rubik-Bold',
        RUBIK_LIGHT: 'Rubik-Light',
        RUBIK_REGULAR: 'Rubik-Regular',
        RUBIK_MEDIUM: 'Rubik-Medium',
        RUBIK_SEMIBOLD: 'Rubik-SemiBold'
    }
  })
}

export default FONTS;