import React from 'react';
import { useEffect, useState, useContext } from 'react';
// import { postApi, getApi } from "../src/api";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { AuthContext } from '../context/AuthContext';


const years = ["1학기", "2학기", "3학기", "4학기", "5학기", "6학기", "7학기", "8학기"]
const income = ["1분위","2분위","3분위","4분위","5분위","6분위","7분위","8분위","9분위","10분위"]
const univ = ["1학년/인문과학계열","1학년/사회과학계열","1학년/자연과학계열","1학년/공학계열","건설환경공학부","건축학과",
"경영학과","경제학과","교육학과","국어국문학과","글로벌경영학과","글로벌경제학과","글로벌리더학부","글로벌바이오멛기컬공학과","기계공학부","나노공학과",
"데이터사이언스융합전공","독어독문학과","디자인학과","러시아어문학과","무용학과","문헌정보학과","물리학과","미디어커뮤니케이션학과","미술학과",
"바이오메카트로닉스학과","반도체시스템공학과","사학과","사회복지학과","사회학과","생명과학과","소비자학과","소프트웨어학과","수학과","수학교육과",
"스포츠과학과","시스템경영공학과","신소재공학부","심리학과","아동/청소년학과","약학과","연기예술학과","영상학과","영어영문학과","유학/동양학과",
"융합생명공학과","의상학과","의학과","인공지능융합전공","자기설계융합전공","전자전기공학부","정치외교학과","중어중문학과","철학과","컬쳐앤테크놀로지융합전공",
"컴퓨터교육과","통계학과","프랑스어문학과","한문교육과","한문학과","행정학과","화학공학/고분자공학부","화학과"]

const RegisterPlus = ({ navigation }) => {

    const [averageGPA, setAverageGPA] = useState("");
    const [lastGPA, setLastGPA] = useState("");
    const [email, setEmail] = useState("");
    const [residence, setResidence] = useState("");
    const [semester, setSemester] = useState("");
    const [department, setDepartment] = useState("");
    const [incomes, setIncomes] = useState("");

    const {register} = useContext(AuthContext);
    console.log("등록?=>"+register.username+"비번?=>"+register.password);

    const onChangeAverageGPA = (payload) => setAverageGPA(payload);
    const onChangeLastGPA = (payload) => setLastGPA(payload);
    const onChangeEmail = (payload) => setEmail(payload);
    const onChangeResidence = (payload) => setResidence(payload);


    const submit = async () => {

        console.log("submit");
        const userId = register.username;
        console.log("userId=> "+ userId);
        const userPW = register.password;

        register(userPW, userId, semester, lastGPA, averageGPA, incomes, department, residence, email);
        console.log(userPW, userId, semester, lastGPA, averageGPA, incomes, department, residence, email);
           

        // console.log(semester + department + incomes);
        // console.log(lastGPA + averageGPA + residence + email);
        navigation.navigate('Login2');
        // setId("");
        // setAverageGPA("");
        
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}> 거의 다 됐어요! </Text>
            <Text style={styles.slogan}> 
                맞춤형 장학금을 추천받으시려면{"\n"}학우님의 학적 정보를 기입해주세요!
            </Text>
            <SelectDropdown
                data={years}
                defaultButtonText="현재학기"
                onSelect={(selectedYear, index)=>{
                    console.log(selectedYear, index);
                    setSemester(selectedYear);
                }}
                buttonTextAfterSelection={(selectedYear, index)=>{
                    return selectedYear
                }}
                rowTextForSelection={(Year, index)=>{
                    return Year
                }}
                search={true}
            />
            <SelectDropdown 
                data={income}
                defaultButtonText="소득분위"
                onSelect={(selectedIncome, index)=>{
                    console.log(selectedIncome, index);
                    setIncomes(selectedIncome);
                }}
                buttonTextAfterSelection={(selectedIncome, index)=>{
                    return selectedIncome
                }}
                rowTextForSelection={(Income, index)=>{
                    return Income
                }}
                search={true}
            />
            <View style={styles.form}>
                <TextInput 
                    onChangeText={onChangeAverageGPA}
                    placeholder={"평균평점 (x.x/4.5)"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={averageGPA}
                />
                <TextInput 
                    onChangeText={onChangeLastGPA}
                    placeholder={"직전학기 평점 (x.x/4.5)"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={lastGPA}
                />
                <TextInput 
                    onChangeText= {onChangeEmail}
                    placeholder={"이메일"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={email}
                    autoCapitalize='none'
                />
                <TextInput 
                    onChangeText= {onChangeResidence}
                    placeholder={"거주지"} 
                    style={styles.input}
                    returnKeyType = "done"
                    value={residence}
                    autoCapitalize='none'
                />
            </View>
            <SelectDropdown 
                data={univ}
                defaultButtonText="소속학과"
                onSelect={(selectedUniv, index)=>{
                    console.log(selectedUniv, index);
                    setDepartment(selectedUniv);
                }}
                buttonTextAfterSelection={(selectedUniv, index)=>{
                    return selectedUniv
                }}
                rowTextForSelection={(univ, index)=>{
                    return univ
                }}
                search={true}
            />
            <View>
                <TouchableOpacity onPress={submit}>          
                    <Text style={{...styles.Btn, backgroundColor:'black', color:'white'}}>다음</Text>
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
        marginTop: 30,
        marginBottom:30
    },
    slogan: {
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 30,
    },
    form: {
        width: '80%',
    },
    input: {
        textAlign:'right',
        fontSize: 15,  
        marginVertical: 10,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderBottomColor:'grey',
        borderBottomWidth:1
    },
    button: {
        width: '80%',
        alignItems: 'center',
        marginTop: 30,
    },
    Btn: {
        fontSize: 16,
        fontWeight: '600',
        width: 310,
        marginVertical: 7,
        paddingVertical: 10,
        marginTop: 30,
        textAlign: 'center',
        borderRadius:10
    },
})

export default RegisterPlus;