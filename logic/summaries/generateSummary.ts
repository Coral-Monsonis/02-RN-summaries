import { API_URL } from "../../config/api"

export async function generateSummary(audioId: string, level: string) {
    try {
        const res = await fetch(`${API_URL}/summaries/${audioId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ level })
        })

        if (!res.ok) throw new Error("Error al generar el resumen")

        const data = await res.json()
        return data.content
    } catch (err) {
        console.error(err)
        return "Error al generar el resumen."
    }
}
