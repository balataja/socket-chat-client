import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import SocketIOClient from 'socket.io-client'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }

    this.onMessageSubmit = this.onMessageSubmit.bind(this)
    this.socket = SocketIOClient('http://localhost:3000')
    this.socket.on('connect', function () {
      console.log('Connected from React Native')
    })
    this.socket.on('newMessage', (message) => {
      this.setState({text: `${this.state.text}\nFrom Server: ${message.text}`})      
    })
  }

  onMessageSubmit(e) {
    this.setState({text: `${this.state.text}\n${e.nativeEvent.text}`})
    this.socket.emit('createMessage', {
      from: 'User',
      text: e.nativeEvent.text
    })
  }

  render() {
    return (
      <View style={{flex: 1,  
          flexDirection: 'column',
          justifyContent: 'flex-start'}}>
        <ScrollView>
          <Text>Scroll Me!</Text>
          <Text>{this.state.text}</Text>
        </ScrollView>
        <TextInput 
          placeholder="Text Message"
          onSubmitEditing={(newText) => this.onMessageSubmit(newText)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
