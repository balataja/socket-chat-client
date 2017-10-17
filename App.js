import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import SocketIOClient from 'socket.io-client'

import EnterUserName from './src/EnterUserName'
import ChatScreen from './src/ChatScreen'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: ''
    }

    this.setUserName = this.setUserName.bind(this)
  }

  setUserName(name) {
    this.setState({user: name.nativeEvent.text})
  }

  render() {
    let view = null;
    if (this.state.user)
    {
      view = <ChatScreen user={this.state.user} />
    } else {
      view = <EnterUserName setUserName={this.setUserName}/> 
    }

    return (
      <View style={{ 
          flex: 1,  
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
      }}>
        {view}
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
