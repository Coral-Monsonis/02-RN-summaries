import type { Summary } from "../../logic/audio/audioTypes"

export interface AudioScreenProps {
    audios: { id: string; filename: string }[]
    selectedAudio: string | null
    transcriptions: Record<string, string>
    summaries: Record<string, Record<string, Summary>>
    selectedLevel: string | null
    isProcessing: boolean

    handleSelectAudio: (id: string) => void

    handleValidAudio: (file: {
        uri: string
        name: string
        size: number
        mimeType: string
    }) => void

    startProcessing: () => void
    handleFinishProcessing: (text: string) => void
    handleSummarySaved: (summary: Summary) => void
    setSelectedLevel: (level: string | null) => void
}
