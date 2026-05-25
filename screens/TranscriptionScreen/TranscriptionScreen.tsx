import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { styles } from "./TranscriptionScreen.styles"
import type { TranscriptionScreenProps } from "./TranscriptionScreen.types"

export const TranscriptionScreen = ({
    audio,
    text,
    onGoToLevel
}: TranscriptionScreenProps) => {

    let message

    if (!audio) {
        message = "No hay ningún audio seleccionado."
    } else if (text === null) {
        message = "Este audio está cargado pero no tiene transcripción."
    } else {
        message = text
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transcripción del audio</Text>

            <Text style={styles.subtitle}>
                Archivo: {audio ?? "ninguno"}
            </Text>

            <ScrollView style={styles.box}>
                <Text style={styles.text}>{message}</Text>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={onGoToLevel}>
                <Text style={styles.buttonText}>Ajustar nivel de resumen</Text>
            </TouchableOpacity>
        </View>
    )
}
