import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect, useState, Component } from 'react';
// import {HeartOutlined, HeartFilled} from '@ant-design/icons';	
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity,ScrollView, TouchableHighlight, Pressable } from 'react-native';
// import { Button } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
// import { LikeContext } from '../context/LikeContext';
import Icon from 'react-native-vector-icons/AntDesign';
// Push Notification
// import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
// import { TouchableOpacity } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
//////////
const Fav = ({ navigation }) => {
    // console.log("FAV PAGE!!!!!!!!!!!!!");
    // const {addFav} = useContext(LikeContext);
    const [favorite, setFavorite] = useState();
    const [number, setNumber] =useState(0); 
    const [heart, setHeart] = useState([]);
    const [heartNotices, setHeartNotices] = useState([{}]);

    const [text, setText] = useState("");
    const [notices, setNotices] =  useState([{}]);
    // 검색 기능
    const [searchNotices, setSearchNotices] = useState([]);
    // const [contents, setContents] = useState({});
    const [searchItems, setSearchItems] = useState([]);
    const [searchKey, setSearchKey] = useState([]);
    const [username, setUsername] = useState("");
    const [noticeId, setNoticeId] = useState("");
    const [id, setId] = useState("");
    // const [token, setToken] = useState("");
    const [length, setLength] = useState("");
    const [searchKey2, setSearchKey2] = useState([]);

    const getData = async () => {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
            console.log(JSON.parse(value).username);
            console.log(JSON.parse(value).id)
            // console.log(JSON.parse(value).token);
        setUsername(JSON.parse(value).username);
        setId(JSON.parse(value).id);
        // setToken(JSON.parse(value).token);
        // console.log(value.parse.username);
        }
    }  
    useEffect(() => {

        // Notifications.scheduleNotificationAsync({
        //     content: {
        //       title: "NEW 맞춤장학!",
        //       body: '학우분의 조건에 맞는 장학 게시글이 새롭게 업로드 되었습니다. 확인해보세요!',
        //     },
        //     trigger: {
        //       seconds: 3, //onPress가 클릭이 되면 60초 뒤에 알람이 발생합니다.
        //     },
        //   });
        // const tmpKey = [... searchKey];
        // console.log("temp Key!?!!?!?!?!?=>"+tmpKey.length);
        // console.log("!!!!!!!!!!!!!MID => "+ searchKey.length); // 업데이트 되기 전 data 값 출력

        fetch('http://13.125.186.247:8000/scholar')
        .then((res)=> res.json())
        .then((resData)=> {
            // console.log("displayFavorite!!!!!!!!!!!!!=>"+JSON.stringify(resData));
            getData();
            
            setNotices(resData);
            // console.log(noticeArray)
            // console.log("noticeArray=>"+resData);
            const searchNotices = resData.map((notices) => {
                return notices.title;
            })
            const searchItems = resData.map((notices) => {
                return notices;
            })
            const searchKey = resData.map((notices) => {
                // console.log("search key id ㅊㅜㄹ려ㄱ"+notices.id);
                searchKey2.push(notices.id);
                return notices.id;
            })
            
            // console.log('전체 개수? -> '+ searchKey.length);
            // console.log('KEY2!!!!!! -> '+ searchKey2);
            setLength(searchKey.length);
            //console.log(searchNotices);
            // console.log("길이가 얼마니? :" + length);
            setSearchNotices(searchNotices);
            setSearchItems(searchItems);
            setSearchKey(searchKey);
            console.log("!!!!!!!!!!!!!AFTER => "+ searchKey.length); // 업데이트 되기 전 data 값 출력

            // console.log("First search item => "+ searchNotices);
            AsyncStorage.setItem(
                'favData', JSON.stringify({
                    'favKey': searchKey,
                })
            )
        })
        return () => {
            // 업데이트 되기 전에 출력
            console.log("맞춤장학 출력!!!!!!!!!!!!!!!!!"); // 업데이트 되기 전 data 값 출력
            // console.log("First search item => "+ searchNotices);
            Notifications.scheduleNotificationAsync({
                content: {
                  title: "NEW 맞춤장학!",
                  body: '학우분의 조건에 맞는 장학 게시글이 새롭게 업로드 되었습니다. 확인해보세요!',
                },
                trigger: {
                  seconds: 4, //onPress가 클릭이 되면 60초 뒤에 알람이 발생합니다.
                },
              });
        }
      },[searchKey.length])

    // notices
    ///// fav 
    const deleteFav = async(key) => {
        // getHeart();
        console.log("current Key=>"+key);
        console.log("username => "+id);
        console.log("userId: " + id + " key: "+ key);
        // await fetch(`http://13.125.186.247:8000/scholar/${key}`, {
        //     method: 'DELETE',
        await fetch(`http://13.125.186.247:8000/scholar`, {
            method: 'DELETE', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user': id,
                'product_option': key
            })
        })
        .then(response => {
            return response.json( )
        })
        .then(data => 
            // this is the data we get after putting our data, do whatever you want with this data
            console.log(data) 
        );
     
       // now do whatever you want with the data  
        // // POST
        // await fetch(`http://13.125.186.247:8000/scholar`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-type': "application/json"
        //     },
        //     body: JSON.stringify({
        //         'user': id,
        //         'product_option': key
        //         // 'token': token,
        //     })
        //     })
        //     .then(res => res.json())
        //     .then(resData=> {
        //         // $("#like AntDesign").css('color', 'red');
            
        //         console.log("삭제 성공!!!!!!!!!=>"+resData);
        //         // console.log("res.json()=>"+res.json());
        //         console.log("resData Here!!=>"+JSON.stringify(resData));
        //     })
    
            
    }
    
    /////// fav 

  
    const items = searchNotices;
    const list = searchItems;

    const filteredNotices = searchNotices.filter((item) => {
        return item.includes(text);
    })

    const renderItem = notices.map((notices) => {
        return (
            <View>
                <Text>department : {notices.department}</Text>
                <Text>title : {notices.title}</Text>
                <Text>date : {notices.date}</Text>
            </View>
        )
    })


    const showFilter = async () => {
        alert('filter clicked');
    }
    const searchList = async () => {
        alert('filter clicked');
    }

    const onChangeText = (payload) => {
        setText(payload);
    }

    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>내 관심장학</Text>
                {/* <TouchableOpacity onPress={showFilter}>          
                    <Text style={styles.filter}>Filter</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.form}>
                <View style={styles.searchBar}>
                    <TextInput  
                            onChangeText= {onChangeText}
                            placeholder={"장학금 검색"} 
                            style={styles.input}
                            returnKeyType = "done"
                            value={text}
                        />
                    <TouchableOpacity onPress={searchList}>          
                        <Text style={styles.searchBtn}>Search</Text>
                    </TouchableOpacity>
                    </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
            {
                Object.keys(notices) != "" ? 
                Object.keys(notices).map(key => 
                    (text !== "" )? 
                            notices[key].title.includes(text) ? 
                            <TouchableOpacity style = {styles.content} key={key} onPress={()=>navigation.navigate('Details')}>
                                <View style={styles.box}>
                                    <Text style={styles.dDay}>
                                        D-2
                                    </Text>
                                    <Text style = {styles.deparmentInfo} >{notices[key].department}</Text>
                                    <Pressable style={styles.favBtn} id = "like" onPress={()=>deleteFav(key)}><AntDesign name="heart" size={20} color="grey" /></Pressable>
                                </View>
                                
                                <Text style = {styles.scholarTitle} >{notices[key].title}</Text>
                                <Text style = {styles.dateInfo} >{notices[key].date}</Text>                
                                
                            </TouchableOpacity>
                            : null
                        
                    // : (favorite[key] == "true")?
                    // :( heart[key] == "true") ?
                    :   <TouchableOpacity style = {styles.content} key={key} onPress={()=>navigation.navigate('Details')}>
                            {/* <Pressable onPress={()=>addFav(key)} style={{padding:5}}>
                                {heart[key]?<Icon name="heart" size={20} color={'red'}></Icon>:<Icon name="heart" size={20} color={'white'}></Icon>}
                            </Pressable> */}
                            <View style={styles.box}>
                                <Text style={styles.dDay}>
                                    D-2
                                </Text>
                                <Text style = {styles.departmentInfo} >{notices[key].department}</Text>
                                <TouchableOpacity
                                    key={key}
                                    onPress={()=>deleteFav(searchKey[key])}
                                    style={styles.favBtn}
                                >
                                {heart[key]?
                                <Icon name="hearto" size={20} color={'#3D3D3D'}></Icon>
                                :<Icon name="heart" size={20} color={'#595959'}></Icon>
                                }
                            </TouchableOpacity>
                            </View>
                                <Text style = {styles.scholarTitle} >{notices[key].title}</Text>
                                <Text style = {styles.dateInfo} >{notices[key].date}</Text>                
                        </TouchableOpacity>
                            
                    )
                : <View >
                    <Text style = {styles.emptyText}> {"관심 장학이 없습니다."}</Text>
                </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#F5F5F5'
    },
    header: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },

    form: {
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        borderRadius: 50,
        width: '90%',
        height:50,
        borderWidth:1,
        borderColor:'#AEAEAE',
        marginBottom:5
    },
    searched: {
        width: '95%',
        padding: 4,
        marginHorizontal: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: '75%',
        fontSize: 17,
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    searchBtn: {
        textAlign:'center',
        textAlignVertical:'center',
        height:40,
        width: 65,
        fontWeight: 'bold',
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        borderRadius:20
    },
    content: {
        backgroundColor: '#F5F5F5',
        marginTop: 10,
        borderRadius: 20,
        borderWidth:1,
        borderColor:'grey'
    },
    scrollContent: {
        width: '90%',
    },
    contentText: {
        fontSize: 15,
        fontWeight: '600',
        paddingHorizontal: 20,
        paddingVertical: 3
    },

    // 게시물
    box:{
        flexDirection:"row",
        borderBottomColor:'grey',
        borderBottomWidth:1,
        width:'95%',
        marginLeft:8,
        paddingBottom:8
    },  
    dDay:{
        backgroundColor:'#3A7525',
        color:'white',
        width:57,
        height:25,
        textAlign:'center',
        textAlignVertical:'center',
        borderRadius:20,
        fontSize:16,
        marginLeft:5,
        marginTop:10,
        flex:3
    },
    departmentInfo:{
        fontWeight:'bold',
        fontSize:17,
        marginLeft:15,
        marginTop:11,
        flex:11
    },
    favBtn:{
        marginTop:13,
        marginRight:10,
        flex:1
    },
    scholarTitle:{
        marginTop:7,
        marginLeft:15,
        fontSize:17,
        fontWeight:'500',
        width:'90%'
    },
    dateInfo:{
        textAlign:'right',
        marginRight:10,
        color:'grey',
        marginBottom:5
    }


})

export default Fav;