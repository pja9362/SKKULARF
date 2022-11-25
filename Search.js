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

const Search = ({ navigation }) => {

    // const {addFav} = useContext(LikeContext);
   const [favorite, setFavorite] = useState();

   const [heart, setHeart] = useState([]);

//    const toggleHeart = (key) => {
//        setHeart(!heart);
//     //    heart[key] = !heart;
//        console.log("cur heart => "+heart);
//     //    fillHeart();
//     }

    const [text, setText] = useState("");
    const [notices, setNotices] =  useState([{}]);
    // 검색 기능
    const [searchNotices, setSearchNotices] = useState([]);
    // const [contents, setContents] = useState({});
    const [searchItems, setSearchItems] = useState([]);
    const [username, setUsername] = useState("");
    const [noticeId, setNoticeId] = useState("");
    const [id, setId] = useState("");
    // const [token, setToken] = useState("");

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
    // getData();
    

    useEffect(() => {
        fetch(`http://13.125.186.247:8000/api/scholar`)
        .then((res)=>res.json())
        .then((noticeArray)=> {
            getData();
            setNotices(noticeArray);
            // console.log(noticeArray)
            const searchNotices = noticeArray.map((notices) => {
                return notices.title;
            })
            const searchItems = noticeArray.map((notices) => {
                return notices;
            })
            const initHeart = noticeArray.map((notices) => {
                return false;
            })
            //console.log(searchNotices);
            setSearchNotices(searchNotices);
            setSearchItems(searchItems);
            setHeart(initHeart);
            console.log(Object.keys(notices));
        })
      }, [])


    
    ///// fav 
    const addFav = async(key) => {

        // displayFav(key, favorite);
        let tmp = 0;
        console.log("clicked key=> "+key);
        // setId(key);
        tmp = parseInt(key)+33;
        console.log(key);
        console.log("username: "+ username+ "userId: " + id + " key: "+ tmp);
        // POST
        await fetch('http://13.125.186.247:8000/scholar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                'user': id,
                'product_option': tmp
                // 'token': token,
            })
            })
            .then(res => res.json())
            .then(resData=> {
                // $("#like AntDesign").css('color', 'red');
            
                console.log(resData);
                // console.log("res.json()=>"+res.json());
                console.log("resData Here!!=>"+JSON.stringify(resData));
                // rconsole.log("resJson=>"+res.json());
                // else  alert('아이디 혹은 비밀번호를 확인해주세요!');
                // setHeart(!heart);
                heart[key] = !(heart[key]);
                console.log("cur heart => "+heart[key]);
            })
    
            
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
                        <View style = {styles.content} key={key}>
                            <Text style = {{...styles.contentText, fontSize: 14, textAlign: 'center', backgroundColor: 'green', width: '30%', marginBottom: 5, padding: 3}} >{notices[key].department}</Text>
                            <Text style = {styles.contentText} >{notices[key].title}</Text>
                            <Text style = {{...styles.contentText, marginBottom: 10, color: 'grey'}} >{notices[key].date}</Text>                
                            <Pressable id = "like" onPress={()=>addFav(key)}><AntDesign name="heart" size={20} color="grey" /></Pressable>
                        </View>
                        : null
                    : <View style = {styles.content} key={key}>
                        {/* <Pressable onPress={()=>addFav(key)} style={{padding:5}}>
                            {heart[key]?<Icon name="heart" size={20} color={'red'}></Icon>:<Icon name="heart" size={20} color={'white'}></Icon>}
                        </Pressable> */}
                        
                        
                        <TouchableOpacity
                                key={key}
                                onPress={()=>addFav(key)}
                                style={{padding:5}}
                            >
                            {heart[key]?
                            <Icon name="hearto" size={20} color={'#3D3D3D'}></Icon>
                            :<Icon name="heart" size={20} color={'#595959'}></Icon>
                            }
                        </TouchableOpacity>
                        
                        <Text style = {{...styles.contentText, fontSize: 14, textAlign: 'center', backgroundColor: 'green', width: '30%', marginBottom: 5, padding: 3}} >{notices[key].department}</Text>
                        <Text style = {styles.contentText} >{notices[key].title}</Text>
                        <Text style = {{...styles.contentText, marginBottom: 10, color: 'grey'}} >{notices[key].date}</Text>                
    
                        {/* <View key={key}>      
                        {/* {
                              (favorite)?
                              <View>
                                <AntDesign name="heart" size={30} color="#eb4b4b" />
                              </View>
                            
                             :
                             <View>
                             <AntDesign name="hearto" size={30} color="#999" />
                             </View>
                            } */}
                            {/* <HeartButton like={favorite} onPress={()=>addFav(key)}></HeartButton> */}
                    

                        {/* <View>
                            <Button title="Button" onPress={() => addFav(key)}/>        
                        </View>                  */}

                    </View>
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
        backgroundColor: '#DDDDDD',
        borderRadius: 15,
        width: '90%',
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
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    searchBtn: {
        width: 'auto',
        paddingHorizontal: 8,
        fontWeight: '600',
    },
    content: {
        backgroundColor: '#DDDDDD',
        marginTop: 15,
        borderRadius: 10,
    },
    scrollContent: {
        width: '90%',
    },
    contentText: {
        fontSize: 15,
        fontWeight: '600',
        paddingHorizontal: 20,
        paddingVertical: 3
    }

})

export default Search;
