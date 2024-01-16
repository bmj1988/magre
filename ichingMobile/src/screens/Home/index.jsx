import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

const Home = ({ navigation }) => {
    const navigateToPost = () => {
        navigation.push("Away")
    }
    return (
        <SafeAreaView style={ styles.theme }>
            <Text style={styles.text}>Bellow world</Text>
            <TouchableOpacity onPress={() => navigateToPost()}>
                <Text style={{ color: "white", fontSize: 40 }}>GO AWAY</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    theme: {
        backgroundColor: 'rgb(10,10,10)',
        flex: 1,
        fontSize: '30px',
    },
    text: {
        color: 'pink',
        fontSize: 25,
        fontWeight: '500'
    }
})

export default Home
