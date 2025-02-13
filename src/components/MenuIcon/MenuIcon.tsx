import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

export const MenuIcon = () => {
    const [open, setOpen] = useState(false)
    const progress = useSharedValue(0)

    const toggleMenu = () => {
        setOpen(!open)
        progress.value = withTiming(open ? 0 : 1, { duration: 300 })
    }

    const lineStyle = (index: number) =>
        useAnimatedStyle(() => ({
            transform: [
                {
                    translateY: withTiming(open ? (index - 1) * 8 : (index - 1) * 8, {
                        duration: 300,
                    }),
                },
                {
                    scaleX: withTiming(open ? 0 : 1, { duration: 300 }),
                },
            ],
        }))

    const dotStyle = (index: number) =>
        useAnimatedStyle(() => ({
            transform: [{ translateY: withTiming(open ? (index - 1) * 8 : 0, { duration: 300 }) }],
            opacity: withTiming(open ? 1 : 0, { duration: 300 }),
        }))

    return (
        <TouchableOpacity onPress={toggleMenu} style={{ padding: 10 }}>
            <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                {[0, 1, 2].map((i) => (
                    <Animated.View
                        key={`line-${i}`}
                        style={[
                            {
                                position: 'absolute',
                                width: 20,
                                height: 2,
                                backgroundColor: 'black',
                                borderRadius: 1,
                            },
                            lineStyle(i),
                        ]}
                    />
                ))}
                {[0, 1, 2].map((i) => (
                    <Animated.View
                        key={`dot-${i}`}
                        style={[
                            {
                                position: 'absolute',
                                width: 4,
                                height: 4,
                                backgroundColor: 'black',
                                borderRadius: 2,
                            },
                            dotStyle(i),
                        ]}
                    />
                ))}
            </View>
        </TouchableOpacity>
    )
}
