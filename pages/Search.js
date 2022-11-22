import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity,ScrollView, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const Search = ({ navigation }) => {

    const [text, setText] = useState("");
    const [notices, setNotices] =  useState([{}]);
    // 검색 기능
    const [searchedData, setSearchedData] = useState([{}]);
    // const [contents, setContents] = useState({});

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
                <Text style={styles.title}>장학공고 검색</Text>
                {/* <TouchableOpacity onPress={showFilter}>          
                    <Text style={styles.filter}>Filter</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.form}>
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
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
            {
                Object.keys(notices).map(key => ( 
                <View style = {styles.content} key={key}>
                    <Text style = {{...styles.contentText, fontSize: 14, textAlign: 'center', backgroundColor: 'green', width: '30%', marginBottom: 5, padding: 3}} >{notices[key].department}</Text>
                    <Text style = {styles.contentText} >{notices[key].title}</Text>
                    <Text style = {{...styles.contentText, marginBottom: 10, color: 'grey'}} >{notices[key].date}</Text>                
                </View>
                ))}
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 15,
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
