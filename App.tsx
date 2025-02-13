import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainPage from './src/page/MainPage/MainPage'

const Stack = createStackNavigator()
const AppContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
                <Stack.Screen name="Main" component={MainPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function App() {
    return <AppContainer />
}
