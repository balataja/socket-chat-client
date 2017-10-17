import React from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import SocketIOClient from 'socket.io-client'

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
          text: '',
          user: props.user
        }
    
        this.onMessageSubmit = this.onMessageSubmit.bind(this)
    
        this.socket = SocketIOClient('http://localhost:3000')
        this.socket.on('connect', function () {
          console.log('Connected from React Native')
        })
        this.socket.on('newMessage', (message) => {
          this.setState({text: `${this.state.text}\n${message.from}: ${message.text}`})      
        })
        this.socket.on('newUser', (message) => {
          this.setState({text: `${this.state.text}\n${message.from}: ${message.text}`})      
        })
        this.socket.emit('createMessage', {
            from: this.state.user,
            text: 'Welcome to the Chat App!'
        })
    }

    onMessageSubmit(e) {
        this.socket.emit('createMessage', {
          from: this.state.user,
          text: e.nativeEvent.text
        })
    }

    render() {
        return (
            <View>
                <ScrollView>
                <Text>Scroll Me!</Text>
                <Text>{this.state.text}</Text>
                </ScrollView>
                <TextInput 
                    placeholder="Text Message"
                    onSubmitEditing={(newText) => this.onMessageSubmit(newText)}
                />
            </View>
        )
    }
}