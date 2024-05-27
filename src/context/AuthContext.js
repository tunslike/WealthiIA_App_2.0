import React, {createContext, useState} from 'react';
import { Keyboard, Alert } from 'react-native';
import axios from 'axios';
import { APIBaseUrl } from '../constants';
import { useDispatch } from 'react-redux';
import { updateCustomerData } from '../store/customerSlice';

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {

    const dispatch = useDispatch();

    const [userToken, setUserToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [defaultChannel, setDefaultChannel] = useState('Advice');
    const [defaultType, setDefaultType] = useState('Providers');

    
    const ValidateCustomerLogin = (username, password) => {

        setErrorMessage(null)

        if(username == '' || password == '') {
            setErrorMessage('Please enter your email and password to proceed!');
            return;
        }

        //DISMISS KEYBOARD
        Keyboard.dismiss();

        setIsLoading(true);

        const options = {
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
          };

        const data = {
            email: username,
            password: password
          };
        
          axios.post(APIBaseUrl.developmentUrl + 'clients/clientLogin', data, options)
          .then(response => {
  
              setIsLoading(false);

              if(response.data.statusCode == 200) {

                dispatch(updateCustomerData(response.data))
                setUserToken(response.data.token);

              }else{

                setIsLoading(false)
                Alert.alert("WealthIA", "Incorrect Email or Password!")
                return;
              }
          })
          .catch(error => {
  
              setIsLoading(false);
              setErrorMessage('Service is unavailable, please retry!')
              Alert.alert("WealthIA", 'An error occurred')
  
              console.log(error);
          });
    }

    // FUNCTION TO LOGOUT USER
    const ExitAuthenticatedUser = async () => {

            try{
        
                //disable tokens
                setUserToken(null)
    
            }catch(exception) {
                console.log(exception)
            }
    }// END OF FUNCTION

    return(
        <AuthContext.Provider value={{
            ValidateCustomerLogin,
            userToken, isLoading, ExitAuthenticatedUser,
            defaultChannel, defaultType
        }}>
            {children}
        </AuthContext.Provider>
    )

}