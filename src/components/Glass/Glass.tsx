import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import Svg, { Polygon, Line } from 'react-native-svg'

interface GlassWithPlusProps {
    incrementWater: () => void
    decrementWater: () => void
}

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon)

const GlassWithPlus = ({ incrementWater, decrementWater }: GlassWithPlusProps) => {
    const [isFilled, setIsFilled] = useState(false)
    const waterHeight = useSharedValue(0)

    const animatedProps = useAnimatedProps(() => ({
        points: `46,130 74,130 94,${130 - waterHeight.value} 28,${130 - waterHeight.value}`,
    }))

    const handlePress = () => {
        setIsFilled((prevState) => {
            const newState = !prevState
            waterHeight.value = withTiming(newState ? 100 : 0, { duration: 500 })

            if (newState) {
                incrementWater()
            } else {
                decrementWater()
            }

            return newState
        })
    }

    return (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Svg height="50" width="40" viewBox="0 0 120 150">
                <Polygon points="40,140 60,140 60,20 20,20" fill="#E0E0E0" />
                <Polygon points="60,140 80,140 100,20 60,20" fill="#FEFDFC" />

                <Line x1="60" y1="55" x2="60" y2="85" stroke="black" strokeWidth="5" />
                <Line x1="45" y1="70" x2="75" y2="70" stroke="black" strokeWidth="5" />

                <AnimatedPolygon animatedProps={animatedProps} fill="#0E89CB" />
            </Svg>

            <TouchableOpacity
                onPress={handlePress}
                style={{
                    position: 'absolute',
                    width: 50,
                    height: 50,
                    top: 10,
                    left: '50%',
                    marginLeft: -25,
                }}
            />
        </View>
    )
}

export default GlassWithPlus
