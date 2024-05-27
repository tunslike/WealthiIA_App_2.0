import React from "react";
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { store } from './src/store/store';
import { AuthProvider } from "./src/context/AuthContext";
import Router from "./src/views/navigation/Router";
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1}}>
        <SafeAreaProvider>
            <AuthProvider>
              <Router />
            </AuthProvider>
        </SafeAreaProvider>
    </GestureHandlerRootView>
    </Provider>
  )
}

export default App;