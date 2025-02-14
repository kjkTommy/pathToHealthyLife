import React from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS,
} from 'react-native-reanimated'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { ITask } from '../../../types'
const LIST_ITEM_HEIGHT = 70
const { width: SCREEN_WIDTH } = Dimensions.get('window')

const TRANSLATE_X_THRESHOLD_DELETE = -SCREEN_WIDTH * 0.3
const TRANSLATE_X_THRESHOLD_CHECK = SCREEN_WIDTH * 0.3

const Todo = ({
    title,
    id,
    removeTask,
    markTaskAsDone,
    isCompleted,
}: ITask & {
    removeTask: (id: number) => void
    markTaskAsDone: (id: number) => void
    isCompleted: boolean
}) => {
    const translateX = useSharedValue(0)
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT)
    const marginVertical = useSharedValue(10)
    const opacity = useSharedValue(1)
    const backgroundColor = useSharedValue(isCompleted ? 'green' : 'white')
    const color = useSharedValue(isCompleted ? 'white' : 'black')

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            if (isCompleted) return

            translateX.value = event.translationX
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD_DELETE
            const shouldMarkDone = translateX.value > TRANSLATE_X_THRESHOLD_CHECK
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH)
                itemHeight.value = withTiming(0)
                marginVertical.value = withTiming(0)
                opacity.value = withTiming(0, {}, () => {
                    runOnJS(removeTask)(id)
                })
            } else if (shouldMarkDone) {
                backgroundColor.value = withTiming('green')
                color.value = withTiming('white')
                runOnJS(markTaskAsDone)(id)
                translateX.value = withTiming(0)
            } else {
                translateX.value = withTiming(0)
            }
        },
    })

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            backgroundColor: backgroundColor.value,
            color: color.value,
        }
    })
    const rTextStyle = useAnimatedStyle(() => {
        return {
            color: color.value,
        }
    })
    const rIconDeleteContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD_DELETE ? 1 : 0)
        return { opacity }
    })
    const rIconCheckContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value > TRANSLATE_X_THRESHOLD_CHECK ? 1 : 0)
        return { opacity }
    })

    const rTaskContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacity.value,
        }
    })

    return (
        <Animated.View style={[styles.containerTodo, rTaskContainerStyle]}>
            <Animated.View style={[styles.iconContainerCheck, rIconCheckContainerStyle]}>
                <FontAwesome5 name="check" size={LIST_ITEM_HEIGHT * 0.7} color="green" />
            </Animated.View>
            <Animated.View style={[styles.iconContainerDelete, rIconDeleteContainerStyle]}>
                <FontAwesome name="trash-o" size={LIST_ITEM_HEIGHT * 0.7} color="red" />
            </Animated.View>
            <PanGestureHandler onGestureEvent={panGesture}>
                <Animated.View style={[styles.task, rStyle]}>
                    <Animated.Text style={[styles.titleTodo, rTextStyle]}>{title}</Animated.Text>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    iconContainerDelete: {
        height: LIST_ITEM_HEIGHT,
        width: LIST_ITEM_HEIGHT,
        position: 'absolute',
        right: '7%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainerCheck: {
        height: LIST_ITEM_HEIGHT,
        width: LIST_ITEM_HEIGHT,
        position: 'absolute',
        left: '7%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTodo: {
        width: '100%',
        alignItems: 'center',
    },
    task: {
        width: '94%',
        height: LIST_ITEM_HEIGHT,
        justifyContent: 'center',
        paddingLeft: 20,
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
