import React from "react";
import {Viewm, Text} from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Login2 from "../pages/Login2";
import RegisterId from "../pages/RegisterId";
import RegisterPW from "../pages/RegisterPW";
import RegisterPlus from "../pages/RegisterPlus";
import Search2 from "../pages/Search2";
import Search3 from "../pages/Search3";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="Login" component={Login}/> */}
                <Stack.Screen name="Login2" component={Login2}/>
                <Stack.Screen name="RegisterId" component={RegisterId}/>
                <Stack.Screen name="RegisterPW" component={RegisterPW}/>
                <Stack.Screen name="RegisterPlus" component={RegisterPlus}/>

                <Stack.Screen name="Search3" component={Search3}/>
                <Stack.Screen name="Search2" component={Search2}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;