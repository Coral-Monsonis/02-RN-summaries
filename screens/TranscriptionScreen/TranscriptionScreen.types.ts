export interface TranscriptionScreenProps {
    audio: string | null
    text: string | null
    onGoToLevel: () => void
}
