import { View, Text } from "react-native"
import styles from '../../stylesheet/styles'

export default ChangingLinesExplainer = () => {
    return (
        <View style={styles.changingLinesContainer}>
            <View style={styles.changingLinesTextContainer}>
            <Text style={styles.changingLinesText}>
                {"\tChanging lines represent ways in which the standard situation or advice detailed by the I-Ching deviates in some way. They suggest a transition into another situation which is represented by an additional hexagram. The reading will help provide context for what energies and actions should be cultivated to either aid or prevent such a transition, according to the desires of the querant.\n"}
            </Text>
            </View>
        </View>
    )
}
