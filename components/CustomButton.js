import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = () => {
  return (
    <TouchableOpacity className={`mt-40 bg-orange rounded-full min-h-[44px] justify-center items-center w-4/5`}>
      <Text className="font-psemibold text-white">Selesai</Text>
    </TouchableOpacity>
  )
}

export default CustomButton