import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login2 = ({ navigation }) => { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const signin = async() => {
        if(username!="" && password!="") {
            await fetch('http://13.125.186.247:8000/common/auth/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password,
                })
            })
            .then(res => res.json())
            .then(resData=> {
                console.log("data=>"+resData);
                console.log("hello=>"+JSON.stringify(resData));
                if(resData.message == 'login success') {
                    navigation.navigate('Search2');
                    // 자동 로그인
                    console.log("hihi=>"+JSON.stringify(resData.user.id));
                    AsyncStorage.setItem(
                        // 'username', username
                        'userData', JSON.stringify({
                            // token: token,
                            'username': username,
                            'token': resData.token,
                            'id' : resData.user.id
                        })
                    )
                }
                else  alert('아이디 혹은 비밀번호를 확인해주세요!');
            })
        }
        else {
            alert('아이디 혹은 비밀번호를 입력해주세요!');
        }
        setUsername("");
        setPassword("");
    }
    const onChangeId = (payload) => setUsername(payload);
    const onChangePW = (payload) => setPassword(payload);
    

    return(
        <View style={styles.container}>
            <Text style={styles.title}> SKKULAR </Text>
            <Text style={styles.slogan}> 성균인을 위한 맞춤형 장학 알림 </Text>
            <View style={styles.form}>
                <TextInput 
                    onChangeText= {onChangeId}
                    placeholder={"아이디"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={username}
                />
                <TextInput 
                    secureTextEntry
                    onChangeText = {onChangePW}
                    placeholder={"비밀번호"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={password}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={signin}>
                    <Text style={{...styles.Btn, backgroundColor:'grey'}}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('RegisterId')}}>          
                    <Text style={{...styles.Btn, backgroundColor:'green'}}>간편 회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: '600',
        marginTop: 130,
    },
    slogan: {
        fontSize: 22,
        marginBottom: 30,
    },
    form: {
        width: '80%',
    },
    input: {
        fontSize: 15,
        backgroundColor: '#DDDDDD',
        marginVertical: 10,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    button: {
        width: '80%',
        alignItems: 'center',
        marginTop: 30,
    },
    Btn: {
        fontSize: 16,
        fontWeight: '600',
        width: 300,
        marginVertical: 7,
        paddingVertical: 10,
        textAlign: 'center',
    },
})

export default Login2;