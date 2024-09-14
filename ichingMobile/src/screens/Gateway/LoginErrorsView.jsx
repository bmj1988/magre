import { StyleSheet, Text, View } from "react-native"

export const LoginErrorsView = ({ errors }) => {
    return (
        <View style={{margin: 5}}>
            {Object.values(errors).length > 0 && Object.values(errors).map((error) => {
                return (

                    <Text style={styles.error} key={styles.error}>
                        {error}
                    </Text>

                )
            })}
        </View>
    )
}

const styles = new StyleSheet.create({
    error: {
        color: '#990000'
    }
})
