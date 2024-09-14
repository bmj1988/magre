import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { thunkLogin } from "../../../store/session";
import { LoginErrorsView } from "./LoginErrorsView";

export default function LoginModal({ isVisible, onClose }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState(null)
    const [password, setPassword] = useState(null)
    const [errors, setErrors] = useState({})

    const login = async () => {
        const info = {
            credential,
            password
        }
        if (!credential || !password) {
            const errorNoCredentials = {
                NoCredentials: "No credentials were provided."
            }
            setErrors(errorNoCredentials)
            return
        }
        const result = await dispatch(thunkLogin(info))
        if (result) onClose()
        else {
            const errorBadCredentials = {
                BadCredentials: "The credentials you provided were invalid."
            }
            setErrors(errorBadCredentials)
        }
    }

    return (
        <Modal animationType="none" transparent={true} visible={isVisible}>
            <View style={styles.loginContainer}>
                <View style={styles.loginBox}>
                    <LoginErrorsView errors={errors} />
                    <View>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={setCredential}
                            value={credential}
                            placeholder="Enter your e-mail"
                            inputMode="email"
                            autoComplete="email" />

                        <TextInput
                            style={styles.inputs}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Enter your password"
                            inputMode="password"
                            autoComplete="current-password" />
                    </View>
                    <View>
                        <Pressable onPress={() => login()}>
                            <Text style={styles.text}>
                                {"Login"}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = new StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    loginBox: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 'fit-content',
        width: '60%',
        margin: 'auto',
        backgroundColor: '#2b2825',
        borderColor: '#ddcba9',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5
    },
    inputs: {
        borderRadius: 5,
        backgroundColor: '#ddcba9',
        color: "#2b2825",
        margin: 10,
    },
    text: {
        color: '#ddcba9',
        fontSize: 22,
        fontFamily: 'NotoSerifTC-Bold',
        fontWeight: '500',
        textAlign: 'center'
    }
})
