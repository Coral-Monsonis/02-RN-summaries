import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { validateAudio } from "../../logic/audio/validateAudio"
import { styles } from "./AudioScreen.styles"
import type { AudioScreenProps } from "./AudioScreen.types"

export const AudioScreen = (props: Partial<AudioScreenProps>) => {
    const { handleValidAudio } = props

    const [error, setError] = useState<string | null>(null)
    const [filename, setFilename] = useState<string | null>(null)

    const handleSelectAudio = async () => {
        setError(null)

        const result = await DocumentPicker.getDocumentAsync({
            type: "audio/*",
            copyToCacheDirectory: true,
        })

        if (result.canceled) {
            setError("No se seleccionó ningún archivo")
            return
        }

        const file = result.assets[0]

        const validationError = await validateAudio({
            uri: file.uri,
            name: file.name ?? "audio",
            size: file.size ?? 0,
            mimeType: file.mimeType ?? "audio/mpeg",
        })

        if (validationError) {
            setError(validationError)
            setFilename(null)
            return
        }

        setFilename(file.name ?? "audio")

        // Solo llamamos si existe (por si acaso)
        handleValidAudio?.({
            uri: file.uri,
            name: file.name ?? "audio",
            size: file.size ?? 0,
            mimeType: file.mimeType ?? "audio/mpeg",
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Subir audio</Text>

            <TouchableOpacity style={styles.button} onPress={handleSelectAudio}>
                <Text style={styles.buttonText}>Seleccionar archivo de audio</Text>
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error}</Text>}

            {filename && !error && (
                <Text style={styles.filename}>Archivo cargado: {filename}</Text>
            )}
        </View>
    )
}
