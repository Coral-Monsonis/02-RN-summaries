import { useCallback } from "react"
import * as Print from "expo-print"

export const usePrintSummary = () => {

    const printSummary = useCallback(async (text: string) => {
        const html = `
            <html>
                <head>
                    <meta charset="utf-8" />
                    <style>
                        body {
                            font-family: sans-serif;
                            padding: 20px;
                            white-space: pre-wrap;
                        }
                    </style>
                </head>
                <body>${text}</body>
            </html>
        `

        await Print.printAsync({ html })
    }, [])

    return { printSummary }
}
