import React, { useCallback, useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "../../stylesheet/styles";
import * as Font from 'expo-font'
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Home = ({ navigation }) => {

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const fetchFonts = async () => {
            try {

                await Font.loadAsync({
                    'NotoSerifTC-Bold': require('../../assets/fonts/NotoSerifTC-Bold.otf'),
                })
            }

            catch (e) {
                console.warn(e);
            }
            finally {
                setLoaded(true)
            }
        }
        fetchFonts();
    }, [])

    const navigateToPost = () => {
        navigation.push("Away")
    }

    const onLayoutRootView = useCallback(async () => {
        if (loaded) {
            await SplashScreen.hideAsync();
        }
    }, [loaded])

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.theme} onLayout={onLayoutRootView}>
            <View style={{ width: 400, height: 200 }}>
                <View style={{ position: 'absolute', right: 55, bottom: -5 }}>
                    <Text style={styles.bigText}>易经</Text>
                </View>
            </View>
            <View style={{ position: 'relative', bottom: 100 }}>
                <TouchableOpacity onPress={() => navigateToPost()}>
                    <Text style={styles.text}>{'I CHING \n THE BOOK OF CHANGES'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


export default Home
