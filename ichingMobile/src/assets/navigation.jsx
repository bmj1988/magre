import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home"
import Away from "./screens/Away"

export default RootNavigation = () => {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Away' component={Away}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
