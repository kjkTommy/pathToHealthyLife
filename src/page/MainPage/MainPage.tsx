import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WaterChecker from '../../components/WaterChecker/WaterChecker'
import { MenuIcon } from '../../components/MenuIcon/MenuIcon'

const MainPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <MenuIcon />
            </View>
            <Text style={styles.text}>Отслеживание выпитой воды</Text>
            <WaterChecker weight={113} size={185} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        position: 'relative',
        top: -20,
        right: -178,
    },
    text: {
        fontSize: 20,
        color: '#000',
    },
})

export default MainPage
