import { useEffect, useState } from "react"
import { generateSummary } from "../logic/summaries/generateSummary"
import { saveSummary } from "../logic/summaries/saveSummary"
import type { Summary } from "../logic/audio/audioTypes"

export const useSummary = (
    audioId: string,
    level: string | null,
    summaries: Record<string, Record<string, Summary>>,
    onSummarySaved: (summary: Summary) => void
) => {

    const [summary, setSummary] = useState("Cargando resumen...")
    const [loading, setLoading] = useState(false)

    const levelNames: Record<string, string> = {
        short: "Nivel básico",
        medium: "Nivel intermedio",
        long: "Nivel avanzado"
    }

    useEffect(() => {
        if (!audioId || !level) return

        // Si ya existe → úsalo
        if (summaries[audioId] && summaries[audioId][level]) {
            setSummary(summaries[audioId][level].content)
            return
        }

        // Si no existe → generarlo
        const load = async () => {
            setLoading(true)

            const result = await generateSummary(audioId, level)
            setSummary(result)

            const saved: Summary = {
                id: `${audioId}-${level}`,
                audioId,
                level,
                content: result,
                createdAt: Date.now()
            }

            await saveSummary(audioId, level, result)
            onSummarySaved(saved)

            setLoading(false)
        }

        load()
    }, [audioId, level])

    return { summary, loading, levelName: level ? levelNames[level] : "" }
}
