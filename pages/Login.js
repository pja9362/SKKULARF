import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
// import { LoginContext } from '../context/LoginContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY_STATE = "@success";
// const STORAGE_KEY_LOGIN_PW = "@loginPw";

const Login = ({ navigation }) => { 
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const {login, saveStates} = useContext(LoginContext);

    const checkInput =() => {
        // check with API
        console.log("--------체크시작---------");
        console.log("id=> "+id+" password=> "+password);
        console.log("!!!!호출 전 현재상태=>"+saveStates);

        login(id,password);

        console.log("???? 호출 후 현재상태=>"+saveStates);
        (saveStates == "login success") ? 
            navigation.navigate('Search2')
        :  (alert('아이디 혹은 비밀번호를 확인해주세요!'),
        console.log("다시 확인"))
          

        


        setId("");
        setPassword("");
    }

    const onChangeId = (payload) => setId(payload);
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
                    value={id}
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
                <TouchableOpacity onPress={checkInput}>
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

export default Login;