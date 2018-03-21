import React from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import SocketIOClient from 'socket.io-client'

import MessagesContainer from './ChatComponents/MessagesContainer'
import MessageInput from './ChatComponents/MessageInput'

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
          user: this.props.user,
          messages: []
        }
    
        this.onMessageSubmit = this.onMessageSubmit.bind(this)
    
        this.socket = SocketIOClient('https://socket-chat-backend.herokuapp.com/');
        this.socket.on('connect', function () {
          console.log('Connected from React Native')
        })
        this.socket.on('newMessage', (message) => {
          this.setState({messages: this.state.messages.concat([message])})
        })
        this.socket.on('newUser', (message) => {
          this.setState({messages: this.state.messages.concat([message])})
          
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
                <Text>Chat Screen</Text>
                <ScrollView>
                    <MessagesContainer messages={this.state} />
                </ScrollView>
                <TextInput 
                    style={{ alignItems: 'flex-end' }}
                    placeholder="Text Message"
                    onSubmitEditing={(newText) => this.onMessageSubmit(newText)}
                />
                <MessageInput onSubmit={this.onMessageSubmit} />
            </View>
        )
    }
}