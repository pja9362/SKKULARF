// 정답
import axios from "axios";
import React, {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY_STATE = "@success";

export const LoginContext = createContext({});

export const LoginProvider = ({children}) => {
    // const saveState = async (toSave) => {
    //     await AsyncStorage.setItem(STORAGE_KEY_STATE, toSave);
    // };
    const [saveStates, setSaveStates] = useState("");

    const login = (username,password) => {
        console.log("~~~~~로그인 함수 호출~~~~~");

        axios
        .post("http://13.125.186.247:8000/common/auth/", {
            'username': username,
            'password': password,
        })
        .then(res =>{
            console.log(res);
            // console.log("로그인 성공!!=>"+res.data.message);
            // setSaveStates(res.data.message);
            // console.log(res);
            // console.log(res.data);
        })
        .catch(e=>{
            // console.log(res);
            // setSaveStates("login error");
            // console.log("로그인 실패??=>"+`login error ${e}`);
            // console.log("Context 파일?=>"+saveStates);
        })

    }
    const value = {saveStates , setSaveStates, login};

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};