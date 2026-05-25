// src/screens/ProcessingScreen/ProcessingScreen.tsx
import { View, Text, ActivityIndicator } from "react-native"
import { styles } from "./ProcessingScreen.styles"

export function ProcessingScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#333" />
            <Text style={styles.text}>Procesando audio...</Text>
        </View>
    )
}
