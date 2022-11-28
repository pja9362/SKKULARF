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
const Bert = ({ navigation }) => {
   
    // const {addFav} = useContext(LikeContext);
    const [favorite, setFavorite] = useState();

    const [heart, setHeart] = useState([]);
    const [favNotice, setFavNotice] = useState([]);

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
    const [tmp, setTmp] = useState("");

    const getData = async () => {
        const value = await AsyncStorage.getItem('userData');
        setUsername(JSON.parse(value).username);
        setId(JSON.parse(value).id);
    }
    // getData();

    const [state, setState] = useState({ data: null, error: false, loading: true })

    useEffect(() => {
        setState(state => ({ data: state.data, error: false, loading: true }))
        const intervalBert = setInterval(()=> {
            fetch(`http://13.125.186.247:8000/api/bertcmp`)
            .then((res)=>res.json())
            .then((noticeArray)=> {
                getData();
                setNotices(noticeArray.data);
    
                // console.log("여기봐!!!!!!!!"+JSON.stringify(noticeArray));
    
                const searchNotices = noticeArray.data.map((notices) => {
                    return notices.title;
                })
                const searchItems = noticeArray.data.map((notices) => {
                    return notices;
                })
                const searchKey = noticeArray.data.map((notices) => {
                    // console.log("Key?????????????//=> "+notices.id);
                    return notices.id;
                })
                //console.log(searchNotices);
                setTmp(searchKey.length);
                setSearchNotices(searchNotices);
                setSearchItems(searchItems);
                setSearchKey(searchKey);
                
                if(searchKey.length != tmp && tmp != 0 ) {
                    console.log(searchKey.length+" vs "+ tmp + "개수가 변경됨");
                    // tmp++;
                    // PUSH NOTIFICATION
                    Notifications.scheduleNotificationAsync({
                        
                        content: {
                        title: "!!!!!NEW 맞춤장학공고!",
                        body: '맞춤 장학공고가 새롭게 업데이트 되었습니다. 확인해보세요!',

                        },
                        trigger: {
                            seconds: 1,
                            // repeats: false //onPress가 클릭이 되면 60초 뒤에 알람이 발생합니다.
                        },
                        // date: new Date(Date.now() + 2 * 1000),
                    });
                    setTmp(searchKey.length);
                    }
            })
        },1000)
        return () => clearInterval(intervalBert);
    }, [tmp])

      const moveDetail = async(key) => {
        // console.log("clicked key? : "+ key);
        // console.log("어디 페이지로 이동? : " + searchKey[key]);
        // console.log("해당 페이지 제목? : " + searchNotices[key]);
        console.log("전체 공고? : "+ JSON.stringify(searchItems[key]));
        // console.log("소득분위? : "+ searchItems[key].con_income);
        AsyncStorage.setItem(
            // 'username', username
            'clickedItem', JSON.stringify({
                // token: token,
                'title': searchNotices[key],
                'age' : searchItems[key].con_age,
                'bef_score' : searchItems[key].con_bef_score,
                'total_score' : searchItems[key].con_total_score,
                'income' : searchItems[key].con_income,
                'major' : searchItems[key].con_major,
                'where' : searchItems[key].con_where
            })
        )
        navigation.navigate('Details');
    }

    
    ///// fav 
    const addFav = async(key) => {

        // displayFav(key, favorite);
        let tmp = 0;
        console.log("clicked key=> "+key);
        // setId(key);

        console.log( "userId: " + id + "product - option: "+ key);
        // POST
        await fetch('http://13.125.186.247:8000/favorscholar/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                'user': id,
                'product_option': key
                // 'token': token,
            })
            })
            .then(res => res.json())
            .then(resData=> {
                console.log(resData);
                AsyncStorage.setItem(
                    // 'username', username
                    'fav', JSON.stringify({
                        // token: token,
                        'favNotice': heart,
                    })
                )
                // PUSH NOTIFICATION
                Notifications.scheduleNotificationAsync({
                    content: {
                      title: "NEW 관심장학!",
                      body: '관심장학이 새롭게 업데이트 되었습니다. 확인해보세요!',
                    },
                    trigger: {
                      seconds: 3, //onPress가 클릭이 되면 60초 뒤에 알람이 발생합니다.
                    },
                  });
                
            })
    
            
    }
    /////// fav 

  
    const items = searchNotices;
    const list = searchItems;

    const filteredNotices = searchNotices.filter((item) => {
        return item.includes(text);
    })



    const showFilter = async () => {
        alert('filter clicked');
    }
    const searchList = async () => {
        navigation.navigate('Fav');
    }

    const onChangeText = (payload) => {
        setText(payload);
    }

    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>장학공고 검색</Text>
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
                        <Text style={styles.searchBtn}>검색 🔍</Text>
                    </TouchableOpacity>
                    </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
                {
                Object.keys(notices).map(key => 
                    text !== "" ? 
                        notices[key].title.includes(text) ? 
                        <TouchableOpacity style = {styles.content} key={key} onPress={()=> moveDetail(key)}>
                            <View style={styles.box}>
                                <Text style={styles.dDay}>
                                    D-2
                                </Text>
                                <Text style = {styles.departmentInfo} >{notices[key].department}</Text>
                                <Pressable style={styles.favBtn} id = "like" onPress={()=>addFav(searchKey[key])}><AntDesign name="heart" size={20} color="grey" /></Pressable>
                            </View>
                            <Text style = {styles.scholarTitle} >{notices[key].title}</Text>
                            <Text style = {styles.dateInfo} >{notices[key].date}</Text>                
                        </TouchableOpacity>
                        : null


                    : <TouchableOpacity style = {styles.content} key={key} onPress={()=> moveDetail(key)}>
                        {/* <Pressable onPress={()=>addFav(key)} style={{padding:5}}>
                            {heart[key]?<Icon name="heart" size={20} color={'red'}></Icon>:<Icon name="heart" size={20} color={'white'}></Icon>}
                        </Pressable> */}
                        <View style={styles.box} >
                            <Text style={styles.dDay}>
                                D-2
                            </Text>
                            <Text style = {styles.departmentInfo} >{notices[key].department}</Text>
                            {/* 관심장학 버튼 */}
                            <TouchableOpacity
                                key={key}
                                onPress={()=>addFav(searchKey[key])}
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
        flexDirection:'row'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    filter:{
        flexDirection:'row',
        width:'85%',
    },
    dateBox:{
        flex:1,
        width:150,
        borderColor:'#3A7525',
        borderWidth:2,
        marginRight:5,
        borderRadius:10,
        height:30,
    },
    dateBoxText:{
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:3
    },
    filterBox:{
        flex:1,
        width:130,
        textAlign:'center',
        borderColor:'#3A7525',
        borderWidth:2,
        marginLeft:5,
        borderRadius:10,
        height:30,

    },
    filterBoxText:{
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:3
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
        width: '90%',
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
        marginTop:3,
        marginBottom:5
    }


})

export default Bert;
