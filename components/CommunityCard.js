import { View, Text, Image, TouchableOpacity } from 'react-native'
import { images } from '../constants'

const CommunityCard = ({title, memberSize}) => {
  return (
    <View className="h-[150px] w-[150px] drop-shadow-lg shadow-lg bg-white rounded-[10px]">
      <Image source={images.Dummy} className="w-[150px] h-[88px] rounded-[10px]" />
      <View className="mt-[10px] mx-[11.5px]">
        <Text className="font-psemibold">Nasgor Lovers</Text>
        <View className="flex flex-row justify-between items-center">
            <Text className="font-pregular text-[8px] text-[#878787]">+100 Members</Text>
            <TouchableOpacity>
                <Text className="font-pbold text-green text-[8px]">Lihat Detail</Text>
            </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default CommunityCard