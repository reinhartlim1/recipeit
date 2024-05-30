import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const GenerateLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="ingredientsinput" options={{ headerShown: false }} />
      <Stack.Screen name="result" options={{ headerShown: false }} />
    </Stack>
  )
}

export default GenerateLayout