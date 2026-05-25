import React from "react"
import { View } from "react-native"
import { AudioSidebar } from "../components/AudioSidebar"
import { useAudioLogic } from "../hooks/useAudioLogic"

export const MasterLayout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const logic = useAudioLogic()

    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: 260, backgroundColor: "#f0f0f0" }}>
                <AudioSidebar {...logic} />
            </View>

            <View style={{ flex: 1 }}>
                {React.cloneElement(children, { ...logic })}
            </View>
        </View>
    )
}
