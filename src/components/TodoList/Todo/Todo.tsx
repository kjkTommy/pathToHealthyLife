import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated'

export interface ITask {
    title: string
    id: number
}

const Todo = ({ title }: ITask) => {
    const translateX = useSharedValue(0)

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX
        },
        onEnd: () => {
            translateX.value = 0
        },
    })

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        }
    })

    return (
        <View style={styles.containerTodo}>
            <PanGestureHandler onGestureEvent={panGesture}>
                <Animated.View style={[styles.task, rStyle]}>
                    <Text style={styles.titleTodo}>{title}</Text>
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTodo: {
        width: '100%',
        alignItems: 'center',
    },
    task: {
        width: '94%',
        height: 70,
        marginVertical: 10,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: 'white',
        shadowOpacity: 0.08,
        borderRadius: 12,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
    },
    titleTodo: {
        fontSize: 16,
    },
})

export default Todo
