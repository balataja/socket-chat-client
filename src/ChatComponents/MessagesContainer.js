import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MessageSent from './MessageSent'
import MessageReceived from './MessageReceived'

export default class MessagesContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { user, messages } = this.props.messages
        var messagesFormatted = messages.map(function(message) {
            if (message.from === user)
            {
                return <MessageSent message={message} />
            } else {
                return <MessageReceived message={message} />
            }
        })

        return (
            <View>
                {messagesFormatted} 
            </View>
        )
    }
}