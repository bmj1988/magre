import React, { useCallback, useEffect, useState } from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import styles from "../../stylesheet/styles";
import * as Font from 'expo-font'
import * as SplashScreen from "expo-splash-screen";
import { useSelector, useDispatch } from 'react-redux'
import { thunkRestoreUser } from "../../../store/session";
import LoginModal from "./LoginModal";

SplashScreen.preventAutoHideAsync();

const Gateway = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const [loaded, setLoaded] = useState(false)
    const [userLoaded, setUserLoaded] = useState(false)
    const [fontsLoaded, setFontsLoaded] = useState(false)
    const [loginModalVisible, setLoginModalVisible] = useState(false)

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
                setFontsLoaded(true)
            }
        }
        fetchFonts();
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                dispatch(thunkRestoreUser())
            }
            catch (e) {
                console.warn(e);
            }
            finally {
                setUserLoaded(true)
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        if (fontsLoaded && userLoaded) setLoaded(true)
    }, [fontsLoaded, userLoaded])

    const navigateToIching = () => {
        navigation.push("Home")
    }

    const onLayoutRootView = useCallback(async () => {
        if (loaded) {
            await SplashScreen.hideAsync();
            if (user === null) {
                setLoginModalVisible(true)
            }
        }
    }, [loaded])

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.theme} onLayout={onLayoutRootView}>
            <View>
                <Text>
                    {"Welcome to the Nexus"}
                </Text>
            </View>
            <View style={{ position: 'relative', bottom: 100 }}>
                <Pressable onPress={() => navigateToIching()}>
                    <Text style={styles.text}>{'I CHING'}</Text>
                </Pressable>
            </View>
            <LoginModal isVisible={loginModalVisible} onClose={() => setLoginModalVisible(false)} />
        </SafeAreaView>
    )
}


export default Gateway
