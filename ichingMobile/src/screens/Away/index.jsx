import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { csrfFetch } from "../../../store/csrfFetch";

const TESTINGURL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL;

const Away = ({ navigation }) => {
    const [hex, setHex] = useState(null)
    const [alt, setAlt] = useState(null)
    const popOff = () => {
        navigation.pop()
    }
    const getHex = async () => {
        const response = await csrfFetch(`${TESTINGURL}/api/hex`)
        if (response.ok) {
            const result = await response.json()
            setHex(result.reading1)
            setAlt(result?.reading2)
        }
        else (console.log(response))

    }
    return (
        <View style={{ paddingTop: StatusBar.currentHeight }}>
            <SafeAreaView style={styles.theme}>
                <TouchableOpacity onPress={() => popOff()}>
                    <Text style={{ color: "black", fontSize: 40 }}>GONE FISHIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getHex()}>
                    <Text style={{ color: "black", fontSize: 40 }}>READ</Text>
                </TouchableOpacity>
                {hex && Object.values(hex).map((attr) => {
                    return <Text key={attr}>{attr}</Text>
                })}
                {alt && Object.values(alt).map((attr) => {
                    return <Text key={attr}>{attr}</Text>
                })}

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
