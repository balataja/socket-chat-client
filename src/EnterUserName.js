import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

export default class EnterUserName extends React.Component {
    render() {
        return (
            <View >
                <TextInput 
                    placeholder="Enter UserName"
                    onSubmitEditing={(name) => this.props.setUserName(name)} />
            </View>
        )
    }
}