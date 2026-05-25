import { Audio } from 'expo-av';

type MobileAudioFile = {
    uri: string;
    name: string;
    size: number;
    mimeType: string;
};

type ValidationRule = {
    check: (file: MobileAudioFile) => boolean;
    message: string;
};

// Reglas síncronas
const audioValidationRules: ValidationRule[] = [
    {
        check: (file) =>
            [
                "audio/mpeg",
                "audio/mp3",
                "audio/wav",
                "audio/webm",
                "audio/ogg",
                "audio/opus",
                "audio/m4a",
                "video/mp4",
                "video/mpeg",
            ].includes(file.mimeType),
        message: "El archivo no es un audio válido para Whisper‑1.",
    },
    {
        check: (file) => file.size <= 25 * 1024 * 1024,
        message: "El archivo supera el tamaño máximo permitido por Whisper‑1 (25MB).",
    },
    {
        check: (file) => file.name.trim().length > 0,
        message: "El nombre del archivo no es válido.",
    },
];

// Validación de duración usando expo-av
async function validateDuration(file: MobileAudioFile): Promise<string | null> {
    const MIN_DURATION = 1;
    const RECOMMENDED_MAX = 15 * 60;

    const sound = new Audio.Sound();

    try {
        await sound.loadAsync({ uri: file.uri });
        const status = await sound.getStatusAsync();

        if (!status.isLoaded) {
            return "No se pudo cargar el audio.";
        }

        const duration = status.durationMillis! / 1000;

        if (duration < MIN_DURATION) {
            return "El audio es demasiado corto (mínimo 1 segundo).";
        }

        if (duration > RECOMMENDED_MAX) {
            console.warn("Aviso: el audio es largo y puede tardar más en procesarse.");
        }

        return null;
    } catch {
        return "No se pudo leer la duración del audio.";
    } finally {
        sound.unloadAsync();
    }
}

// Validación completa
export async function validateAudio(file: MobileAudioFile): Promise<string | null> {
    for (const rule of audioValidationRules) {
        if (!rule.check(file)) {
            return rule.message;
        }
    }

    const durationError = await validateDuration(file);
    if (durationError) return durationError;

    return null;
}
