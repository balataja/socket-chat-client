import React from 'react'
import { Text, View } from 'react-native'

var dateFormat = require('dateformat');

export default class MessageReceived extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let date = dateFormat(this.props.message.createdAt, "h:MM:ss TT")
        
        return (
            <View style={{ flex: 1, alignItems: 'flex-start'}}>
                <Text style={{ fontSize: '8px'}} >{date}</Text>
                <Text style={{ maxWidth: '80%' }}>{`${this.props.message.from}: ${this.props.message.text}`}</Text>
            </View>
        )
    }
}