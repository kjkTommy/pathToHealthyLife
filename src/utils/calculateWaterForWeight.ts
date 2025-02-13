interface ValueForCalculating {
    weight: number
    size: number
}

export const calculateWaterForWeight = ({ weight, size }: ValueForCalculating): number => {
    const volumeGlass = 0.25
    let result = 0
    if (size <= weight + 100) {
        result = weight * 0.03
    } else {
        result = weight * 0.025
    }
    return Math.ceil(result / volumeGlass) * volumeGlass
}
