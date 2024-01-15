import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

const Home = ({ navigation }) => {
    const navigateToPost = () => {
        navigation.push("Away")
    }
    return (
        <SafeAreaView style={ styles.theme }>
            <Text style={{ color: "white" }}>Hello world</Text>
            <TouchableOpacity onPress={navigateToPost}>
                <Text>GO AWAY</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    theme: {
        backgroundColor: 'rgb(10,10,10)',
        flex: 1
    }
})

export default Home
