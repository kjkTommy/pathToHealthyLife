import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PreviewPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello world, it's the Preview page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        color: '#000',
    },
})

export default PreviewPage
