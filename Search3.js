import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity,ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { LikeContext } from '../context/LikeContext';

const Search3 = ({ navigation }) => {
    const {addLike} = useContext(LikeContext);

    const [text, setText] = useState("");
    const [notices, setNotices] =  useState([{}]);
    // 검색 기능
    const [searchNotices, setSearchNotices] = useState([]);
    // const [contents, setContents] = useState({});
    const [searchItems, setSearchItems] = useState([]);
    const [username, setUsername] = useState("");
    const [id, setId] = useState("");
    // const [token, setToken] = useState("");

    const getData = async () => {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
            console.log(JSON.parse(value).username);
            // console.log(JSON.parse(value).token);
        setUsername(JSON.parse(value).username);

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
            //console.log(searchNotices);
            setSearchNotices(searchNotices);
            setSearchItems(searchItems);

            console.log(Object.keys(notices));
        })
      }, [])

      const addFav= async (key) => {
        let tmp = 0;
        tmp = parseInt(key)+33;
        console.log("addFav=> " + username + " " + tmp);

        addLike(username, tmp);
        console.log("addLike called!");
    }
    ///// fav 
    // const addFav = async(key) => {
    //     let tmp = 0;
    //     console.log(key);

    //     // setId(key);
    //     tmp = parseInt(key)+30;
    //     console.log(key);
    //     console.log("username: "+ username+ " key: "+ tmp);
    //     // POST
    //     await fetch('http://13.125.186.247:8000/scholar', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-type': "application/json"
    //         },
    //         body: JSON.stringify({
    //             'username': username,
    //             'id': tmp
    //             // 'token': token,
    //         })
    //         })
    //         .then(res => res.json())
    //         .then(resData=> {
    //             console.log(resData);
    //             // console.log("res.json()=>"+res.json());
    //             console.log("resData=>"+JSON.stringify(resData));
    //             // rconsole.log("resJson=>"+res.json());
    //             // else  alert('아이디 혹은 비밀번호를 확인해주세요!');
    //         })
    
        
    //     // setFavorite(!favorite);
    // }
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
                            <Pressable onPress={()=>addFav(key)}><AntDesign name="heart" size={20} color="grey" /></Pressable>
                        </View>
                        : null
                    : <View style = {styles.content} key={key}>
                        <Text style = {{...styles.contentText, fontSize: 14, textAlign: 'center', backgroundColor: 'green', width: '30%', marginBottom: 5, padding: 3}} >{notices[key].department}</Text>
                        <Text style = {styles.contentText} >{notices[key].title}</Text>
                        <Text style = {{...styles.contentText, marginBottom: 10, color: 'grey'}} >{notices[key].date}</Text>                
                        <Pressable onPress={()=>addFav(key)}><AntDesign name="heart" size={20} color="grey" /></Pressable>
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

export default Search3;