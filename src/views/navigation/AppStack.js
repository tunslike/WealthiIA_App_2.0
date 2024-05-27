import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddAccountScreen, ChangePasswordScreen, ChatScreen, 
         DashboardScreen, 
         EnquiryListScreen, 
         MessageChatScreen, 
         MessageScreen, 
         PostMessageScreen, 
         PostProviderMessageScreen, PostSuccessScreen, ProfileScreen, ProviderChannelScreen, ProviderChatScreen, ProviderListScreen, 
         ProviderMessageScreen} from '../screens';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();


const AppStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='Tab' component={TabNavigator} />
            <Stack.Screen name='Dashboard' component={DashboardScreen} />
            <Stack.Screen name='Enquiry' component={EnquiryListScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='Profile' component={ProfileScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='PostMessage' component={PostMessageScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='PostProviderMessage' component={PostProviderMessageScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='Message' component={MessageScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='ProviderMessage' component={ProviderMessageScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='MessageChat' component={MessageChatScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='Chat' component={ChatScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='ProviderChat' component={ProviderChatScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='ProviderList' component={ProviderListScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='AddAccount' component={AddAccountScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='ProviderChannel' component={ProviderChannelScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='PostSuccess' component={PostSuccessScreen} options={{animation: 'slide_from_bottom'}} />
        </Stack.Navigator>
    )
}

export default AppStack;