import { View, Text } from "react-native";
import styles from '../../stylesheet/styles'
import lineConverter from "../../utils/lineConverter";
import AsciiGen from "./AsciiGen";

export default Alt = ({ alt }) => {
    console.log(`ALT IS RUNNING`, alt)
    const reading = alt
    const name = reading.name;
    const aspect = reading.aspect;
    const guidance = reading.guidance;
    const situation = reading.wisdom;
    const totalAscii = lineConverter(reading.lowerTrigram.composition, reading.upperTrigram.composition)
    console.log(`CHECK ALT`, totalAscii)
    return (
        <View style={{ marginBottom: 10 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.readingTextSmall}>
                    {`TRANSITION HEX : ${name}`}
                </Text>
                <AsciiGen asciiArray={totalAscii}/>
                <Text style={styles.readingTextSmall}>
                    {aspect}

                </Text>
            </View>
            <Text style={styles.readingTextSmall}>
                {'\t' + situation}
            </Text>
            <Text style={styles.readingTextSmall}>
                {'\t' + guidance}
            </Text>
        </View>
    )
}
