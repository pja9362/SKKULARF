import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const RegisterPW = ({ navigation }) => {
    const {register} = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const onChangePW = (payload) => setPassword(payload);
    const onChangePW2 = (payload) => setPassword2(payload);
    
    const savePW = (toSave) => {
        register.password = toSave;
        console.log("등록?=>",register.password);
    };
    const submit = () => {
        // check with API
        //alert('I will check');
        password === password2 ? (
            navigation.navigate('RegisterPlus'),
            console.log(password),
            savePW(password)
            // loadPW()
        )
        : alert('invalid!') 

        setPassword("");
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}> 환영합니다! </Text>
            <Text style={styles.slogan}> 사용할 비밀번호를 입력해주세요. </Text>
            <View style={styles.form}>
                <TextInput 
                    secureTextEntry
                    onChangeText= {onChangePW}
                    placeholder={"비밀번호"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={password}
                />
                 <TextInput 
                    secureTextEntry
                    onChangeText= {onChangePW2}
                    placeholder={"비밀번호 확인"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={password2}
                />
            </View>
            <View>
                <TouchableOpacity onPress={submit}>          
                    <Text style={{...styles.Btn, backgroundColor:'green'}}>다음</Text>
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
        marginTop: 30,
        textAlign: 'center',
    },
})

export default RegisterPW;