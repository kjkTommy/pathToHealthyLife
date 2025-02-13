import React from 'react'
import { View, StyleSheet } from 'react-native'
import GlassWithPlus from '../Glass/Glass'

interface ViewForGlassesProps {
    waterForOrganism: number
    incrementWater: () => void
    decrementWater: () => void
}

const ViewForGlasses = ({
    waterForOrganism,
    incrementWater,
    decrementWater,
}: ViewForGlassesProps) => {
    const valueGlasses = waterForOrganism / 0.25

    return (
        <View style={styles.containerWithGlasses}>
            {Array.from({ length: valueGlasses }).map((_, index) => (
                <GlassWithPlus
                    key={index}
                    incrementWater={incrementWater}
                    decrementWater={decrementWater}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    containerWithGlasses: {
        display: 'flex',
        width: 'auto',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
})

export default ViewForGlasses
