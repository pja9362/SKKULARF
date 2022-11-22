import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from '@react-navigation/native';

import React from 'react';
import Login from './pages/Login';
import RegisterId from './pages/RegisterId'
import RegisterPW from './pages/RegisterPW'
import Search from './pages/Search';
import RegisterPlus from './pages/RegisterPlus';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import { LoginProvider } from './context/LoginContext';

const Stack = createStackNavigator();

const App = () => {
    return (
        <AuthProvider>
            <LoginProvider>
                <Navigation/>
            </LoginProvider>
        </AuthProvider>
    )
        
}

export default App;

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import React from 'react';
// import Login from './pages/Login';
// import RegisterId from './pages/RegisterId'
// import RegisterPlus from './pages/RegisterPlus';
// import RegisterPW from './pages/RegisterPW'
// import Search from './pages/Search';
// import Search2 from './pages/Search2';
// import Search3 from './pages/Search3';

// const Stack = createStackNavigator();

// const App = () => {
//     return(
//         <NavigationContainer>
//             <Stack.Navigator>
//             <Stack.Screen name="Search2" component={Search2}/>
//                 <Stack.Screen name="RegisterPW" component={RegisterPlus}/>
//                 <Stack.Screen name="Search3" component={Search3}/>
//                 {/* <Stack.Screen name="Search" component={Search}/> */}

//                 <Stack.Screen name="Login" component={Login}/>
//                 <Stack.Screen name="RegisterId" component={RegisterId}/>
//                 <Stack.Screen name="RegisterPW" component={RegisterPW}/>
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

// export default App;

// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, Text, View } from 'react-native';

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <Text>Open up App.js to start working on your app!</Text>
// //       <StatusBar style="auto" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });
