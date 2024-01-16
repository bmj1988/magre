import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar } from "react-native";

const Away = ({ navigation }) => {
    const popOff = () => {
        navigation.pop()
    }
    return (
        <View style={{ paddingTop: StatusBar.currentHeight }}>
            <SafeAreaView style={styles.theme}>
                <TouchableOpacity onPress={() => popOff()}>
                    <Text style={{ color: "black", fontSize: 40 }}>GONE FISHIN</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    theme: {
        backgroundColor: 'white',
        marginTop: '40px'
    }
})

export default Away
