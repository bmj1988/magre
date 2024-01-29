import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
    theme: {
        backgroundColor: '#2b2825',
        flex: 1,
        fontSize: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    text: {
        color: '#ddcba9',
        fontSize: 25,
        fontFamily: 'NotoSerifTC-Bold',
        fontWeight: '500',
        textAlign: 'center'
    },
    titleCard: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200
    },
    bigText: {
        color: '#ddcba9',
        fontSize: 150,
        fontFamily: 'NotoSerifTC-Bold',
        textShadowColor: 'gold',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10
    },
    readingText: {
        color: '#2b2825',
        fontSize: 150,
        fontFamily: 'NotoSerifTC-Bold',
        textShadowColor: 'gold',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        lineHeight: 200
    },
    readingAspect: {
        color: '#2b2825',
        fontSize: 30,
        fontFamily: 'NotoSerifTC-Bold',
        textShadowColor: 'gold',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        marginBottom: 60,
        textAlign: 'center'
    },
    readingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '300px'
    },
    readingScrollView: {
        width: '80%',
        height: 'fit-content',
        backgroundColor: '#c8b18c40',
        marginBottom: 60,
        paddingTop: 20

    },
    readingTextSmall: {
        fontFamily: 'NotoSerifTC-Bold',
        fontSize: 15,
        color: '#0e0e0e'
    },
    readingChangingLink: {
        fontFamily: 'NotoSerifTC-Bold',
        fontSize: 15,
        color: '#0e0e0e',
        textDecorationLine: 'underline',
        textDecorationColor: '#0e0e0e'
    },
    changingLinesText: {
        color: '#ddcba9',
        fontSize: 18,
        fontFamily: 'NotoSerifTC-Bold',
    },
    changingLinesContainer: {
        backgroundColor: '#2b2825',
        flex: 1,
        fontSize: '30px',
        justifyContent: 'start',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight

    },
    changingLinesTextContainer: {
        width: '80%',
    },
    line: {
        fontSize: 30,
        color: 'black',
        lineHeight: 20,
        fontWeight: '900'
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'column-reverse',
    }
})

export default styles;
