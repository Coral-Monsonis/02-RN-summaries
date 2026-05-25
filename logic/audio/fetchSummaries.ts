import { API_URL } from "../../config/api"

export async function fetchSummaries(audioId: string) {
    try {
        const res = await fetch(`${API_URL}/summaries/${audioId}`)
        if (!res.ok) throw new Error("Error al obtener los resúmenes")
        return await res.json()
    } catch (err) {
        console.error(err)
        return null
    }
}
