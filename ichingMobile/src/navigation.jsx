import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home"
import Away from "./screens/Away"
import Gateway from "./screens/Gateway";
import ChangingLinesExplainer from "./screens/ChangingLinesExplainer";
import BareImage from "./screens/BareImage";

export default RootNavigation = () => {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions} initialRouteName="Gateway">
                <Stack.Screen name='Gateway' component={Gateway} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Away' component={Away} />
                <Stack.Screen name='ChangingLinesExplainer' component={ChangingLinesExplainer} />
                <Stack.Screen name='BareImage' component={BareImage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
