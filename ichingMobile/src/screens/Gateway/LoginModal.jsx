import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { thunkLogin } from "../../../store/session";

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
                    {Object.values(errors).length > 0 && Object.values(errors).map((error) => {
                        return (
                            <Text style={styles.error} key={styles.error}>
                                {error}
                            </Text>
                        )
                    })}
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCredential}
                            value={credential}
                            inputMode="email"
                            autoComplete="email" />

                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            inputMode="password"
                            autoComplete="current-password" />
                    </View>
                    <Pressable onPress={() => login()}>
                        <Text>
                            {"Login"}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}


const styles = new StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginBox: {
        height: '25%',
        width: '25%',
        margin: 'auto',
        backgroundColor: '#2b2825',
        borderColor: 'gold',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5
    },
    inputs: {
        borderRadius: 5,
        backgroundColor: '#ddcba9',
        color: "#2b2825"
    },
    error: {
        color: 'red'
    }
})
