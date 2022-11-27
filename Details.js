import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity,ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



const Details = ({ navigation }) => {

    const [text, setText] = useState("");
    const [notices, setNotices] =  useState([{}]);

    // 로딩
    useEffect(() => {
        getNotices();
    }, [])

    const getNotices = async() => {
        const response = await fetch(
            `http://13.125.186.247:8000/api/scholar`
        );
        const json = await response.json();
        
        setNotices(json);

    }

    const showFilter = async () => {
        alert('filter clicked');
    }
    const searchList = async () => {
        alert('filter clicked');
    }

    const onChangeText = (payload) => setText(payload);

    
    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.title}>장학 제목 예시</Text>
            </View>
            <View style={styles.box}>
                {/* 상단 제목 */}
                <View style={styles.center}>
                    <Text style={styles.check}>
                        내 지원 자격 확인하기
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
                            현재 학기
                        </Text>
                        <Text style={styles.myInfo}>
                            내 설정
                        </Text>
                        <Text style={styles.iconCheck}>
                            <Ionicons name='md-checkmark-circle' size={32} color="green"/>
                        </Text>
                    </View>

                    {/* 소득 분위 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            소득 분위
                        </Text>
                        <Text style={styles.myInfo}>
                            내 설정
                        </Text>
                        <Text style={styles.iconCheck}>
                            가능
                        </Text>
                    </View>

                    {/* 평균 평점 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            평균 평점
                        </Text>
                        <Text style={styles.myInfo}>
                            내 설정
                        </Text>
                        <Text style={styles.iconCheck}>
                            가능
                        </Text>
                    </View>

                    {/* 직전학기 평점 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            직전학기 평점
                        </Text>
                        <Text style={styles.myInfo}>
                            내 설정
                        </Text>
                        <Text style={styles.iconCheck}>
                            가능
                        </Text>
                    </View>

                    {/* 등본상 거주지 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            등본상 거주지
                        </Text>
                        <Text style={styles.myInfo}>
                            내 설정
                        </Text>
                        <Text style={styles.iconCheck}>
                            가능
                        </Text>
                    </View>

                    {/* 소속학과 */}
                    <View style={styles.comparison}>
                        <Text style={styles.scholar}>
                            소속학과
                        </Text>
                        <Text style={styles.myInfo}>
                            내 설정
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