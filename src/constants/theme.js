import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");


export const COLORS = {

    screenGrey: "#F5F5F5",
    bgColor: "#4F62B7",
    fgOrange: "#F78C4B",
    fgGray: "#F1F2F6",
    fgWhite: "#FFFFFF",
    fgDarkGrey: "#433E3E",
    fgButtonBorder: "#A8B1DB",
    fgTabColor: "#828282",
    fgCatHeader: "#625E5E",
    fgCatTitle: "#293259",
}

export const FONTS = {
    loginTitle: { fontFamily: "Rubik-Medium", fontSize: 45},
    loginSubTitle: {fontFamily: "Rubik-Medium", fontSize: 19},
    loginButtonText: {fontFamily: "Rubik-Medium", fontSize: 17},
    loginPageText : {fontFamily: "Rubik-Medium", fontSize: 28},
    loginPageTextDesc : {fontFamily: "Rubik-Medium", fontSize: 18},
    TextInput : {fontFamily: "Rubik-Medium", fontSize: 17},
    ForgotPassword : {fontFamily: "Rubik-Medium", fontSize: 15},
    RegisterText : {fontFamily: "Rubik-Medium", fontSize: 16},
    TermsCondText : {fontFamily: "Rubik-Regular", fontSize: 13},
    AccountTypeText : {fontFamily: "Rubik-Medium", fontSize: 15},
    TabText : {fontFamily: "Rubik-Regular", fontSize: 12},
    welcomeText : {fontFamily: "Rubik-Medium", fontSize: 22},
    greetingText : {fontFamily: "Rubik-Light", fontSize: 15},
    CategoryText : {fontFamily: "Rubik-Medium", fontSize: 23},
    CategoryListHeader : {fontFamily: "Rubik-Medium", fontSize: 23},
    CoySigh : {fontFamily: "Rubik-Bold", fontSize: 40},
    MsgTitle : {fontFamily: "Rubik-Medium", fontSize: 16},
};

const appTheme = { COLORS, FONTS};

export default appTheme;