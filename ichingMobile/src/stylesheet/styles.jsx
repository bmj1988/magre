import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
    theme: {
        backgroundColor: 'rgb(10,10,10)',
        flex: 1,
        fontSize: '30px',
        paddingTop: StatusBar.currentHeight
    },
    text: {
        color: 'gold',
        fontSize: 25,
        fontWeight: '500'
    }
})

export default styles;
