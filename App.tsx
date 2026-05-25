import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { MasterLayout } from "./layout/MasterLayout"
import { AudioScreen } from "./screens/AudioScreen/AudioScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Audio">
          {() => (
            <MasterLayout>
              <AudioScreen />
            </MasterLayout>
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )
}
