import React from 'react';
import { useEffect, useState, useContext } from 'react';
// import { postApi, getApi } from "../src/api";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
// import { postApi, getApi } from "../src/api";


const RegisterId = ({ navigation }) => {
    const [id, setId] = useState("");
    const [checking, setChecking] = useState(false);
    const {register} = useContext(AuthContext);

    const checkDouble = async () => {
        // check with API
        alert('I will check');
        // if vaild
        setChecking(true);
        
        // setId("");
        setPassword("");
    }

    const saveId =  (toSave) => {
        register.username = toSave;
        console.log("등록?=>"+register.username);
    };

    const submit = () => {
        // 중복 확인 했는지 체크
        checking ? (
            navigation.navigate('RegisterPW'),
            console.log(id),
            saveId(id)
        )
        : alert('id valid checking!');
    }

    const onChangeId = (payload) => setId(payload);

    return (
        <View style={styles.container}>
            <Text style={styles.title}> 환영합니다! </Text>
            <Text style={styles.slogan}> 사용할 아이디를 입력해주세요. </Text>
            <View style={styles.form}>
                <TextInput 
                    onChangeText= {onChangeId}
                    placeholder={"아이디"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={id}
                />
                <TouchableOpacity onPress={checkDouble}>          
                    <Text style={styles.idCheck}>중복확인</Text>
                </TouchableOpacity>
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
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '10%'
    },
    idCheck: {
        width: 'auto',
        paddingVertical: 10,
        paddingHorizontal: 5,
        fontSize: 15,
        fontWeight: '700',
    },
    input: {
        width: '85%',
        fontSize: 15,
        backgroundColor: '#DDDDDD',
        marginVertical: 10,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    Btn: {
        fontSize: 16,
        fontWeight: '600',
        width: 300,
        marginVertical: 7,
        marginTop: 30,
        paddingVertical: 10,
        textAlign: 'center',
    },
})

export default RegisterId;