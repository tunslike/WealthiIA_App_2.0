import React from "react";

import {Platform} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, icons } from '../../constants';
import { ConnectionScreen, DashboardScreen, FavoriteScreen, MessageScreen, ProviderMessageScreen } from "../screens";
import TabIcon from "../components/TabIcon";
import { useSelector } from 'react-redux';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    const customerData = useSelector((state) => state.customer.customerData);

    return(
        <Tab.Navigator
            
        screenOptions={{
            tabBarShowLabel:false,
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: COLORS.fgWhite,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                height: hp(7.5),
                borderRadius: wp(3),
                marginBottom: Platform.OS === 'ios' ? hp(3.5) : hp(2),
                marginHorizontal:wp(3),
                borderTopColor: 'transparent'
            }
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={DashboardScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.home}
                    title="Home"    
                />
            }}
            />
        <Tab.Screen 
            name="Favorites" 
            component={FavoriteScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.favorites}
                    title="Favorites" 
                    addStyle={{
                        marginLeft: wp(-5)
                    }}   
                />
            }}
            />
        <Tab.Screen 
            name="Connections" 
            component={ConnectionScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.portfolio}
                    title="Connections"
                    addStyle={{
                        marginLeft: wp(-2)
                    }}       
                />
            }}
            />
        <Tab.Screen 
            name="Messages" 
            component={(customerData.TYPE == 'Company') ? ProviderMessageScreen : MessageScreen}
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.chat}
                    title="Messages"  
                />
            }}
            />
    </Tab.Navigator>
    )
}

export default TabNavigator;