import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="preferences" options={{ headerShown: false }} />
      <Stack.Screen name="digital-pantry" options={{ headerShown: false }} />
      <Stack.Screen name="add-ingredients" options={{ headerShown: false }} />
    </Stack>
  )
}

export default ProfileLayout