import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountSuccessScreen, CreateAccountScreen, LoginScreen, WelcomeScreen } from '../screens';


const Stack = createNativeStackNavigator();


const AuthStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Login' component={LoginScreen} options={{animation: 'slide_from_right'}}/>
            <Stack.Screen name='Account' component={CreateAccountScreen} options={{animation: 'slide_from_right'}}/>
            <Stack.Screen name='AccountSuccess' component={AccountSuccessScreen} options={{animation: 'slide_from_bottom'}} />
        </Stack.Navigator>
    )
}

export default AuthStack;