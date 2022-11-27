import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity,ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const Details = ({ navigation }) => {

    const [text, setText] = useState("");
    const [notices, setNotices] =  useState([{}]);
    const [username, setUsername] = useState("");
    const [noticeId, setNoticeId] = useState("");
    const [id, setId] = useState("");
    const [income, setIncome] = useState("");
    const [lastgpa, setLastgpa] = useState("");
    const [fullgpa, setFullgpa] = useState("");
    const [residence, setResidence] = useState("");
    const [departments, setDepartments] = useState("");
    const [semester, setSemester] = useState("");
    const [con_incoome, setCon_income] = useState("");

    // setTitle(JSON.parse(clickedValue).title);
    //     setAge(JSON.parse(clickedValue).age);
    //     setBScore(JSON.parse(clickedValue).bef_score);
    //     setTScore(JSON.parse(clickedValue).total_score);
    //     setIncome(JSON.parse(clickedValue).income),
    //     setMajor(JSON.parse(clickedValue).major),
    //     setWhere(JSON.parse(clickedValue).where)
    const [title, setTitle] = useState("");
    const [age, setAge] = useState("");
    const [bscore, setBScore] = useState("");
    const [tscore, setTScore] = useState("");
    const [money, setMoney] = useState("");
    const [major, setMajor] = useState("");
    const [where, setWhere] = useState("");
 

    const getData = async () => {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
            console.log(JSON.parse(value).username);
            console.log(JSON.parse(value).id);
            // console.log(JSON.parse(value).token);

        setUsername(JSON.parse(value).username);
        setId(JSON.parse(value).id);
        setIncome(JSON.parse(value).income);
        setLastgpa(JSON.parse(value).lastgpa);
        setFullgpa(JSON.parse(value).fullgpa);
        setResidence(JSON.parse(value).residence);
        setDepartments(JSON.parse(value).departments);
        setSemester(JSON.parse(value).semester);
        // setToken(JSON.parse(value).token);
        // console.log(value.parse.username);
        }

        const clickedValue = await AsyncStorage.getItem('clickedItem');
        if (clickedValue !== null) {
            console.log(JSON.parse(clickedValue).title);
            console.log(JSON.parse(clickedValue).age);
        }

        setTitle(JSON.parse(clickedValue).title);
        setAge(JSON.parse(clickedValue).age);
        setBScore(JSON.parse(clickedValue).bef_score);
        setTScore(JSON.parse(clickedValue).total_score);
        setMoney(JSON.parse(clickedValue).income),
        setMajor(JSON.parse(clickedValue).major),
        setWhere(JSON.parse(clickedValue).where)
        
    }

    // 로딩
    useEffect(() => {
        fetch(`http://13.125.186.247:8000/api/bert/`)
        .then((res)=>res.json())
        .then((resData)=> {
            getData();
            // setNotices(resData);
            // // console.log("BERT!!!!!!"+JSON.stringify(resData));
            // // console.log("HERE NOTICES!!!!!!! : "+ notices );

            // const searchNotices = resData.map((notices) => {
            //     // console.log("notices title : " + notices.title);
            //     return notices.title;
            // })
            // const searchItems = resData.map((notices) => {
            //     // console.log("NOTICE&&&&&&& + " + JSON.stringify(notices));
            //     return notices;
            // })
            // const searchKey = resData.map((notices) => {
            //     // console.log("notices title : " + notices.id);
            //     return notices.id;
            // })
            // const goalSemester = resData.map((notices) => {
            //     // console.log("notices semester : " + notices.con_age);
            //     return;
            // })
            // //console.log(searchNotices);
            // setSearchNotices(searchNotices);
            // setSearchItems(searchItems);
            // setSearchKey(searchKey);

            // // setGoalSemester(goalSemester);
            // // console.log("TITLE!!!! => "+ searchNotices);
            // // console.log("WHOLE NOTICE!!!! => "+ JSON.stringify(searchItems));
            // // console.log("KEY!!!! => "+ searchKey);
        })
    }, [])



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}></Text>
            </View>
            <View style={styles.box}>
                {/* 상단 제목 */}
                <View style={styles.center}>
                    <Text style={styles.check}>
                        {title}
                    </Text>
                </View>
                {/* 비교 표 */}
                <View>
                    {/* 표 상단 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            공고
                        </Text>
                        <Text style={styles.myInfo}>
                            내 설정
                        </Text>
                        <Text style={styles.iconCheck}>
                            
                        </Text>
                    </View>

                    
                    {/* 현재학기 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            {age}
                        </Text>
                        <Text style={styles.myInfo}>
                            {semester}
                        </Text>
                        <Text style={styles.iconCheck}>
                            <Ionicons name='md-checkmark-circle' size={32} color="green"/>
                        </Text>
                    </View>

                    {/* 소득 분위 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            {money}
                        </Text>
                        <Text style={styles.myInfo}>
                            {income}
                        </Text>
                        <Text style={styles.iconCheck}>
                            가능
                        </Text>
                    </View>

                    {/* 평균 평점 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            {tscore}
                        </Text>
                        <Text style={styles.myInfo}>
                            {fullgpa}
                        </Text>
                        <Text style={styles.iconCheck}>
                            가능
                        </Text>
                    </View>

                    {/* 직전학기 평점 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            {bscore}
                        </Text>
                        <Text style={styles.myInfo}>
                            {lastgpa}
                        </Text>
                        <Text style={styles.iconCheck}>
                            가능
                        </Text>
                    </View>

                    {/* 등본상 거주지 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            {where}
                        </Text>
                        <Text style={styles.myInfo}>
                            {residence}
                        </Text>
                        <Text style={styles.iconCheck}>
                            가능
                        </Text>
                    </View>

                    {/* 소속학과 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            {major}
                        </Text>
                        <Text style={styles.myInfo}>
                            {departments}
                        </Text>
                        <Text style={styles.iconCheck}>
                            가능
                        </Text>
                    </View>
                </View>
                {/* 결과 표시 */}
                <View style={styles.result}>
                    <Text style={styles.resultText}>
                        아쉽게도 학우님은 해당 장학금에 지원하실 수 없습니다...
                    </Text>
                    <Text style={styles.etc}>
                        자세한 지원 자격 및 공고 내용은 학교 홈페이지를 참고해주세요!
                    </Text>
                </View>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => {navigation.navigate()}}>          
                    <Text style={{...styles.Btn, backgroundColor:'black', color:"white"}}>공고 확인하러 가기</Text>
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
    header: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    box:{
        borderWidth:1,
        bordercolor: 'grey',
        width: '90%',
        borderRadius: 20,
        alignItems:'center'
    },
    center:{
        alignItems:'center',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        width:'90%'
    },
    check:{
        margin:15,
        textAlign:'center',
        backgroundColor:'#3A7525',
        width:170,
        fontSize:16,
        borderRadius:20,
        padding:5,
        color:'white'
    },
    // 비교 표
    comparison:{
        flexDirection:'row',
        alignItems:'center',
        width:'90%',
    },
    scholar:{
        textAlign:'center',
        width:'40%',
        fontSize:17,
        padding:10
    },
    myInfo:{
        textAlign:'center',
        width:'40%',
        fontSize:17,
        fontWeight:'bold'
    },
    iconCheck:{
        textAlign:'center',
        width:'20%',
        fontSize:17
    },

    result:{
        margin:20,
        alignItems:'center',
        width:'75%',
    },

    resultText:{
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center'
    },

    etc:{
        width:'75%',
        marginTop:30,
        textAlign:'center'
    },

    button:{
        marginTop:40,
        width:'90%',
    },

    Btn:{
        textAlign:'center',
        height:40,
        fontSize:15,
        borderRadius:20,
        textAlignVertical:'center',
        fontWeight:'bold'
    }
})

export default Details;