import { View, Text } from "react-native"
import styles from "../../stylesheet/styles"

export default TrigramAsciiGenerator = ({ asciiArray }) => {
    let keys = Math.random()
    return (
        <View style={{ flex: 1, flexDirection: 'column-reverse', alignItems: 'center' }}>
            {asciiArray.map((line) => {
                return (
                    <View key={keys ++} style={{ height: 8 }}>
                        <Text style={styles.line}>
                            {line}
                        </Text>
                    </View>
                )
            })}
        </View>
    )
}
