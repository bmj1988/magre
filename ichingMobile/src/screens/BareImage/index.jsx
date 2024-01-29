import { ImageBackground, Image } from "react-native"
import { useReadingContext } from "../../context/readingContext"


export default BareImage = ({ navigation }) => {
    const { bg } = useReadingContext()
    console.log(`BG CONTEXT HERE`, bg)
    return (
        <Image source={{ uri: bg }} style={{width: '100%', height: '100%'}}/>
    )
}
