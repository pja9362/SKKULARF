import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from '@expo/vector-icons/Ionicons';


// pages
import Login from "../pages/Login";
import RegisterId from "../pages/RegisterId";
import RegisterPW from "../pages/RegisterPW";
import RegisterPlus from "../pages/RegisterPlus";
import Search from "../pages/Search";
import Bert from "../pages/Bert";
import Home from "../pages/Home";
import Fav from "../pages/Fav";
import Fav2 from "../pages/Fav2";
import Search2 from "../pages/Search2";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarm from "../pages/Alarm";
import Setting from "../pages/Setting";
import Details from "../pages/Details.js";

// page names for bottomTabs
const homeName = 'Home';
const favoredName = 'Fav2';
const searchName = 'Search2';
const bertName = "Bert";
const alarmName = 'Alarm';
const settingName = 'Setting';

const Tab = createBottomTabNavigator();

function BottomTabNavigator(){
    return(
        <Tab.Navigator 
        initialRouteName={homeName} 
        screenOptions={({route})=>({
            tabBarIcon:({focused, color, size})=>{
                let iconName;
                let rn = route.name;

                if(rn === homeName){
                    iconName=focused ? 'home' : 'home-outline';
                } else if (rn === searchName){
                    iconName=focused ? 'search' : 'search-outline';
                } 
                // else if(rn === bertName){
                //     iconName=focused ? 'bert' : 'bert-outline';
                // }
                else if (rn === settingName){
                    iconName=focused ? 'settings' : 'settings-outline';
                } else if (rn === alarmName){
                    iconName=focused ? 'alarm' : 'alarm-outline';
                } else if (rn === favoredName){
                    iconName=focused ? 'heart' : 'heart-outline';
                }

                return <Ionicons name={iconName} size={size} color={color}/>;
            },

            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor:'grey',
            tabBarLabelStyle:{paddingBottom:10, fontSize:10},
            tabBarStyle:{padding:10, height:70}
        })}>
            {/* options={{unmountOnBlur:true}} */}
        <Tab.Screen options={{unmountOnBlur:true}} name={favoredName} component={Fav2}/>
        <Tab.Screen  options={{unmountOnBlur:true}} name={searchName} component={Search2}/>
        <Tab.Screen name={homeName} component={Home}/>
        {/* <Tab.Screen name={alarmName} component={Alarm}/> */}
         <Tab.Screen name={bertName} options={{unmountOnBlur:true}} component={Bert}/>
        <Tab.Screen name={settingName} component={Setting}/>

    </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();


const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="RegisterId" component={RegisterId}/>
                <Stack.Screen name="RegisterPW" component={RegisterPW}/>
                <Stack.Screen name="RegisterPlus" component={RegisterPlus}/>

                <Stack.Screen name="Root" options={{headerShown:false}} component={BottomTabNavigator}/>
                <Stack.Screen name="Bert" options={{unmountOnBlur:true}} component={Bert}/>
                <Stack.Screen name="Details" component={Details}/>
            </Stack.Navigator>
                

        </NavigationContainer>
    )
}

export default Navigation;