export interface ITask {
    title: string
    id: number
    isCompleted: boolean
}
export interface GlassWithPlusProps {
    incrementWater: () => void
    decrementWater: () => void
}
export interface ViewForGlassesProps extends GlassWithPlusProps {
    waterForOrganism: number
}
export interface WaterCheckerProps {
    weight: number
    size: number
}
export interface ValueForCalculating extends WaterCheckerProps {}
