import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "../../stylesheet/styles";


const Home = ({ navigation }) => {
    const navigateToPost = () => {
        navigation.push("Away")
    }
    return (
        <SafeAreaView style={ styles.theme }>
            <Text style={styles.text}>Bellow world</Text>
            <TouchableOpacity onPress={() => navigateToPost()}>
                <Text style={styles.text}>GO AWAY</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


export default Home
