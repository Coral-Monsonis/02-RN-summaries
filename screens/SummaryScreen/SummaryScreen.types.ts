import type { Summary } from "../../logic/audio/audioTypes"

export interface SummaryScreenProps {
    audioId: string
    level: string | null
    summaries: Record<string, Record<string, Summary>>
    onSummarySaved: (summary: Summary) => void
}
