// src/components/AudioSidebar.tsx
import { ScrollView, Text, TouchableOpacity } from "react-native"
import type { Summary } from "../logic/audio/audioTypes"

interface AudioSidebarProps {
    audios: { id: string; filename: string }[]
    selectedAudio: string | null
    handleSelectAudio: (id: string) => void
    transcriptions: Record<string, string>
    summaries: Record<string, Record<string, Summary>>
    setSelectedLevel: (level: string) => void
}

export function AudioSidebar({
    audios,
    selectedAudio,
    handleSelectAudio,
    transcriptions,
    summaries,
    setSelectedLevel
}: AudioSidebarProps) {

    return (
        <ScrollView style={{ padding: 16 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Audios</Text>

            {audios.map((audio) => (
                <TouchableOpacity
                    key={audio.id}
                    onPress={() => handleSelectAudio(audio.id)}
                    style={{
                        padding: 8,
                        backgroundColor: selectedAudio === audio.id ? "#ddd" : "#eee",
                        marginBottom: 6,
                        borderRadius: 6
                    }}
                >
                    <Text>{audio.filename}</Text>
                </TouchableOpacity>
            ))}

            <Text style={{ fontWeight: "bold", marginTop: 20, marginBottom: 8 }}>
                Transcripciones
            </Text>

            {Object.keys(transcriptions).map((id) => (
                <TouchableOpacity
                    key={id}
                    onPress={() => handleSelectAudio(id)}
                    style={{
                        padding: 8,
                        backgroundColor: selectedAudio === id ? "#ddd" : "#eee",
                        marginBottom: 6,
                        borderRadius: 6
                    }}
                >
                    <Text>{id}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}
