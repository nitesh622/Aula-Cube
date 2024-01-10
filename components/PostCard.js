import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CommentCard from './CommentCard';

const PostCard = (props) => {
    const postData = props.post;
    const option = props.option;
    const [commentsData, setCommentsData] = useState([]);

    useEffect(()=>{getComments()}, [])

    const getComments = async () => {
        let url = ``;
        if(option == 1) {
            url = `https://jsonplaceholder.typicode.com/posts/${postData.id}/comments/?_limit=1`
        }
        else {
            url = `https://jsonplaceholder.typicode.com/posts/${postData.id}/comments`
        }

        const options = {
          method: 'GET',
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setCommentsData(result);
        } catch (error) {
          console.error(error);
        }
    }

    return (
        <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 10}}>
                    <View style={styles.profileOuterView}>
                        <Image source={require('../assets/profile.png')} style={{height: 25, width: 25}} />
                    </View>
                </View>
                <View style={{width: '88%'}}>
                    <Text style={styles.titleBox}>{postData.title}</Text>
                    <Text style={styles.bodyBox}>{postData.body}</Text>
                    <View style={styles.buttonsBox}>
                        <TouchableOpacity>
                            <FontAwesome name={'comment-o'} size={18}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome name={'heart-o'} size={18}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name={'share-2'} size={18}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderLeftWidth: 1, borderColor: '#aaaaa9'}}>
                        <View style={{}}>
                            {
                                commentsData.map((comment, i)=> {
                                    return (
                                        <CommentCard comment={comment} key={i}/>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PostCard

const styles = StyleSheet.create({
    profileOuterView: {
        borderRadius: 30, 
        borderWidth: 1, 
        marginTop: 10
    },
    titleBox: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: 'black'
    },
    bodyBox:{
        fontSize: 18, 
        marginVertical: 10, 
        color: '#4c4c4b'
    },
    buttonsBox: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 15, 
        width: '90%'
    }
})