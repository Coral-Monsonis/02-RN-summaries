import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { styles } from "./SummaryScreen.styles"
import type { SummaryScreenProps } from "./SummaryScreen.types"
import { useSummary } from "../../hooks/useSummary"
import { usePrintSummary } from "../../hooks/usePrintSummary"

export const SummaryScreen = ({
    audioId,
    level,
    summaries,
    onSummarySaved
}: SummaryScreenProps) => {

    const { summary, loading, levelName } = useSummary(
        audioId,
        level,
        summaries,
        onSummarySaved
    )

    const { printSummary } = usePrintSummary()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resumen del contenido</Text>

            {level && (
                <Text style={styles.subtitle}>
                    Nivel seleccionado: <Text style={{ fontWeight: "bold" }}>{levelName}</Text>
                </Text>
            )}

            <Text style={styles.subtitle}>
                Archivo: <Text style={{ fontWeight: "bold" }}>{audioId}</Text>
            </Text>

            <ScrollView style={styles.box}>
                <Text style={styles.text}>
                    {loading ? "Cargando resumen..." : summary}
                </Text>
            </ScrollView>

            <TouchableOpacity
                style={styles.button}
                onPress={() => printSummary(summary)}
            >
                <Text style={styles.buttonText}>Imprimir resumen</Text>
            </TouchableOpacity>
        </View>
    )
}
