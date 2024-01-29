import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { csrfFetch } from "../../../store/csrfFetch";
import { ReadingScreen } from "../READING";
import styles from '../../stylesheet/styles'

const TESTINGURL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL;

const Away = ({ navigation }) => {
    const [hex, setHex] = useState(null)
    const [alt, setAlt] = useState(null)
    const [bg, setBg] = useState(null)
    const [loading, setLoading] = useState(false)
    const popOff = () => {
        navigation.pop()
    }
    const viewChangingLinesExplainerText = () => {
        navigation.push("ChangingLinesExplainer")
    }
    const viewBareImage = () => {
        navigation.push("BareImage")
    }
    const getHex = async () => {
        setLoading(true)
        const response = await csrfFetch(`${TESTINGURL}/api/hex`)
        if (response.ok) {
            const result = await response.json()
            setHex(result.reading)
            setAlt(result?.alt)
            let bgString = `${TESTINGURL}${result.reading.art.slice(21)}`
            setBg({ uri: bgString })
        }
        else (console.log(response))

    }
    console.log(`HEX HERE`, hex)
    if (!hex && !loading) {
        return (

            <View style={styles.theme}>
                <Text>
                    <TouchableOpacity onPress={() => getHex()}>
                        <Text style={styles.text}>READ</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        )
    }

    if (!hex && loading) {
        return (
            <View>
                <Text>Loading. . .</Text>
            </View>
        )
    }

    return (
        <ReadingScreen reading={hex} alt={alt} bg={bg} action={viewChangingLinesExplainerText} viewImage={viewBareImage}/>
    )
}

export default Away
