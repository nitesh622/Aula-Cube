import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CommentCard = (props) => {
    const commentData = props.comment;

    return (
        <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#aaaaa9'}}>{'__'}</Text>
                <View style={{marginLeft: 5}}>
                    <Text style={styles.nameBox}>{commentData.name}</Text>
                    <Text style={{fontSize: 12, color: '#9a9999'}}>{commentData.email}</Text>
                    <Text style={{fontSize: 16, marginVertical: 10}}>{commentData.body}</Text>
                </View>
            </View>
        </View>
    )
}

export default CommentCard

const styles = StyleSheet.create({
    nameBox: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: 'black'
    }
})