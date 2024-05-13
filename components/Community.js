import { View, Text, TouchableOpacity, Image } from 'react-native'
import { icons } from '../constants'
import CommunityCard from './CommunityCard'

const Community = () => {
  return (
    <View>
      <View
            className="mt-[10px] flex flex-row justify-between
           items-center"
          >
            <View>
              <Text className="font-psemibold text-base">Komunitas</Text>
            </View>

            <TouchableOpacity className="flex flex-row items-center">
              <Text className="text-[12px]">Lihat Semua</Text>
              <Image
                source={icons.RightChevron}
                resizeMode="contain"
                className="w-5 h-5 mt-0.5"
              />
            </TouchableOpacity>
          </View>

          <View className="mt-[10px] flex flex-row justify-between">
            <CommunityCard />
            <CommunityCard />
          </View>
    </View>
  )
}

export default Community