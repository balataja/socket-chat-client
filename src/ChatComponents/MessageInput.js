import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

export default class MessageInput extends React.Component {
    render() {
        return (
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '0%'}}>
                <TextInput 
                    placeholder="Enter Message.."
                    onSubmitEditing={(message) => this.props.onSubmit(message)} />
            </View>
        )
    }
}