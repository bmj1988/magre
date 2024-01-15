import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

const Away = ({ navigation }) => {
    const popOff = () => {
        navigation.pop()
    }
    return (
        <SafeAreaView style={styles.theme}>
            <TouchableOpacity onPress={popOff}>
                <Text style={{ color: "white" }}>GONE FISHIN</Text>
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

export default Away
