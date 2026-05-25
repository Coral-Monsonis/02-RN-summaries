import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./LevelSelectorScreen.styles"
import type { LevelSelectorScreenProps } from "./LevelSelectorScreen.types"

export const LevelSelectorScreen = ({ onSelectLevel }: LevelSelectorScreenProps) => {

    const levels = [
        { label: "Nivel básico", value: "short" },
        { label: "Nivel intermedio", value: "medium" },
        { label: "Nivel avanzado", value: "long" }
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccionar nivel de resumen</Text>

            <Text style={styles.subtitle}>
                Elige el nivel de detalle que quieres para el resumen.
            </Text>

            {levels.map((level, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => onSelectLevel(level.value)}
                >
                    <Text style={styles.buttonText}>{level.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}
