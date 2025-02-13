import React, { useState, useCallback, memo } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { calculateWaterForWeight } from '../../utils/calculateWaterForWeight'
import ViewForGlasses from '../ViewForGlasses/ViewForGlasses'

interface WaterCheckerProps {
    weight: number
    size: number
}

const WaterChecker = memo(({ weight, size }: WaterCheckerProps) => {
    const waterForOrganism = calculateWaterForWeight({ weight, size })

    const [valueWater, setValueWater] = useState<number>(0)

    const incrementWater = useCallback(() => {
        setValueWater((prevValue) => prevValue + 0.25)
    }, [])

    const decrementWater = useCallback(() => {
        setValueWater((prevValue) => prevValue - 0.25)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Воды выпито</Text>
            <Text style={styles.secondaryText}>{`Цель: ${waterForOrganism.toFixed(2)}л`}</Text>
            <Text style={styles.textWithValue}>{`${valueWater.toFixed(2)}л`}</Text>
            <ViewForGlasses
                waterForOrganism={waterForOrganism}
                incrementWater={incrementWater}
                decrementWater={decrementWater}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#66C3F4',
        padding: 16,
        borderRadius: 12,
        gap: 4,
        margin: 12,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 600,
        color: '#FEFDFC',
    },
    secondaryText: {
        fontSize: 18,
        fontWeight: 500,
        color: '#FEFDFC',
    },
    textWithValue: {
        fontSize: 18,
        fontWeight: 500,
        color: '#FEFDFC',
    },
})

export default WaterChecker
