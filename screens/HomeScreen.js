import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import PostCard from '../components/PostCard';
import Entypo from 'react-native-vector-icons/Entypo';

const HomeScreen = () => {
    useEffect(()=>{
        getPosts()
    }, []);

    const [selectedPost, setSelectedPost] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [postsData, setPostsData] = useState([]);

    const getPosts = async () => {
      const url = `https://jsonplaceholder.typicode.com/posts`;
      const options = {
        method: 'GET',
      };
      
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setPostsData(result);
      } catch (error) {
        console.error(error);
      }
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        style={styles.dropDownButton}
                        onPress={() => {setClicked(!clicked);}}
                    >
                        <Text style={{fontWeight:'600', fontSize: 18, color: '#595858'}}>
                            {selectedPost == null ? 'Select Post' : 'Post: ' + selectedPost.id}
                        </Text>
                        {
                            clicked ? (
                                <Entypo name={'chevron-up'} size={22}/>
                            ) 
                            : (
                                <Entypo name={'chevron-down'} size={22}/>
                            )
                        }
                    </TouchableOpacity>

                    <View style={{width: '90%', marginVertical: 25}}>
                        {
                            selectedPost == null
                            ? <View style={{alignItems: 'center', justifyContent: 'center', height: '90%'}}>
                                <Text style={{fontSize: 25}}>{'Select a Post!'}</Text>
                            </View>
                            : <PostCard post={selectedPost} option={2}/>
                        }
                    </View>
                </View>
            </ScrollView>
            {
                clicked ? (
                    <View
                        style={styles.dropDownListView}
                    >
                        <FlatList
                            data={postsData}
                            renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.postButton}
                                        onPress={() => {
                                            setSelectedPost(item)
                                            setClicked(false)
                                        }}
                                    >
                                        <PostCard post={item} option={1}/>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                ) : null
            }
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    dropDownButton: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#e3e3e3',
        borderColor: '#dadada'
    },
    dropDownListView: {
        elevation: 5,
        marginTop: 5,
        height: '70%',
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        position: 'absolute',
        marginTop: 75,
    },
    postButton: {
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#8e8e8e',
        paddingVertical: 15,
    }
})