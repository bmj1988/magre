import { View, Text, ScrollView, ImageBackground, StatusBar, TouchableOpacity } from "react-native"
import Alt from './Alt.jsx'
import styles from '../../stylesheet/styles.jsx'
import lineConverter from "../../utils/lineConverter.js";
import changingLines from "../../utils/changingLines.js";
import grabHanzi from "../../utils/grabHanzi.js";
import TrigramAsciiGenerator from './AsciiGen.jsx'
import { useReadingContext } from "../../context/readingContext.jsx";

export const ReadingScreen = ({ reading, alt, action, viewImage }) => {
    const {bg, setBg} = useReadingContext()
    const name = grabHanzi(reading.name);
    const aspect = reading.aspect;
    const situation = reading.guidance;
    const wisdom = reading.wisdom;
    const bgUrl = reading.art;
    const lineAscii = lineConverter(reading.lowerTrigram.composition, reading.upperTrigram.composition)
    const lineList = changingLines(reading)
    setBg(bgUrl)
    return (
        <ImageBackground source={{ uri: bgUrl }} style={{ width: '100%', height: '100%' }}>
            <View style={styles.readingContainer}>
                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => viewImage()}>
                <Text style={styles.readingText}>
                    {name}
                </Text>
                <Text style={styles.readingAspect}>
                    {aspect}
                </Text>
                </TouchableOpacity>
                </View>
                <ScrollView style={styles.readingScrollView}>
                    <TrigramAsciiGenerator asciiArray={lineAscii} />
                    <Text style={styles.readingTextSmall}>
                        {situation + '\n'}
                    </Text>
                    <Text style={styles.readingTextSmall}>
                        {wisdom + '\n'}
                    </Text>
                    {alt && <View>
                        <TouchableOpacity onPress={() => action()}>
                            <Text style={styles.readingChangingLink}>
                                {`Your reading includes changing lines. \n`}
                            </Text></TouchableOpacity>

                        {lineList.map((changingLine) => {
                            return (
                                <Text key={lineList.indexOf(changingLine)} style={styles.readingTextSmall}>{changingLine}</Text>
                            )
                        })}
                        <Alt alt={alt} />
                    </View>
                    }

                </ScrollView>
            </View>
        </ImageBackground>
    )
}
