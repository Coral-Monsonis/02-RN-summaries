import { useState, useEffect } from "react"
import { API_URL } from "../config/api"
import { fetchSummaries } from "../logic/audio/fetchSummaries"
import type { Summary } from "../logic/audio/audioTypes"

export function useAudioLogic() {

    const [audios, setAudios] = useState<{ id: string, filename: string }[]>([])
    const [selectedAudio, setSelectedAudio] = useState<string | null>(null)
    const [transcriptions, setTranscriptions] = useState<Record<string, string>>({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [summaries, setSummaries] = useState<Record<string, Record<string, Summary>>>({})
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

    // Cargar audios
    useEffect(() => {
        fetch(`${API_URL}/audios`)
            .then(res => res.json())
            .then(files => {
                const mapped = files.map((filename: string) => ({
                    id: filename.split(".")[0],
                    filename
                }))
                setAudios(mapped)
            })
    }, [])

    // Cargar IDs de transcripciones
    useEffect(() => {
        fetch(`${API_URL}/transcriptions`)
            .then(res => res.json())
            .then(ids => {
                const mapped: Record<string, string> = {}
                ids.forEach((id: string) => mapped[id] = "")
                setTranscriptions(mapped)
            })
    }, [])

    // Cargar texto de una transcripción
    useEffect(() => {
        if (!selectedAudio) return
        if (transcriptions[selectedAudio]) return

        fetch(`${API_URL}/transcriptions/${selectedAudio}`)
            .then(res => res.json())
            .then(data => {
                setTranscriptions(prev => ({
                    ...prev,
                    [selectedAudio]: data.text
                }))
            })
    }, [selectedAudio])

    // Seleccionar audio
    const handleSelectAudio = async (id: string) => {
        setSelectedAudio(id)
        setSelectedLevel(null)

        const list: Summary[] = await fetchSummaries(id)

        const mapped = (list ?? []).reduce((acc, s) => {
            acc[s.level] = s
            return acc
        }, {} as Record<string, Summary>)

        setSummaries(prev => ({
            ...prev,
            [id]: mapped
        }))
    }

    // Procesar audio nuevo (adaptado a RN)
    const handleValidAudio = async (file: { uri: string, name: string, type: string }) => {
        const formData = new FormData()
        formData.append("audio", {
            uri: file.uri,
            name: file.name,
            type: file.type
        } as any)

        const res = await fetch(`${API_URL}/transcribe`, {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        const filename = data.audioFile
        const id = filename.split(".")[0]

        setAudios(prev => {
            if (prev.some(a => a.id === id)) return prev
            return [...prev, { id, filename }]
        })

        setTranscriptions(prev => ({
            ...prev,
            [id]: data.text
        }))

        setSelectedAudio(id)
    }

    const startProcessing = () => setIsProcessing(true)

    const handleFinishProcessing = (text: string) => {
        setIsProcessing(false)
        if (!selectedAudio) return

        setTranscriptions(prev => ({
            ...prev,
            [selectedAudio]: text
        }))
    }

    const handleSummarySaved = (summary: Summary) => {
        setSummaries(prev => ({
            ...prev,
            [summary.audioId]: {
                ...(prev[summary.audioId] ?? {}),
                [summary.level]: summary
            }
        }))
    }

    return {
        audios,
        selectedAudio,
        transcriptions,
        summaries,
        selectedLevel,
        isProcessing,
        handleSelectAudio,
        handleValidAudio,
        startProcessing,
        handleFinishProcessing,
        handleSummarySaved,
        setSelectedLevel
    }
}
