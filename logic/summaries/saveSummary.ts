import { API_URL } from "../../config/api"

export async function saveSummary(
    audioId: string,
    level: string,
    summary: string
) {
    try {
        const res = await fetch(`${API_URL}/summaries/${audioId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ level, summary })
        })

        return res.ok
    } catch (err) {
        console.error("Error guardando resumen:", err)
        return false
    }
}
