import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "../constants";
import { router } from "expo-router";

const RecipeCard = ({ id, name, ingCount, time, imageUrl }) => {
  return (
    <View>
      <Image
        source={{uri: imageUrl}}
        resizeMode="cover"
        className="w-[155px] h-[100px] rounded-lg"
      />
      <View className="mt-2 flex flex-row space-x-[2px]">
        <Image source={icons.Star} resizeMode="contain" className="w-3 h-3" />
        <Image source={icons.Star} resizeMode="contain" className="w-3 h-3" />
        <Image source={icons.Star} resizeMode="contain" className="w-3 h-3" />
        <Image source={icons.Star} resizeMode="contain" className="w-3 h-3" />
        <Image source={icons.Star} resizeMode="contain" className="w-3 h-3" />
      </View>

      <Text className="font-pmedium text-[14px]">{name}</Text>
      <Text className="font-pmedium text-orange text-[12px]">
        {ingCount} bahan
      </Text>
      <Text className="font-pmedium text-green text-[12px]">{time} menit</Text>

      <View className="h-[30px] w-[130px] mt-[10px]">
        <CustomButton
          handlePress={() => router.push(`/detail/${id}`)}
          text="Cek Resep"
          backgroundColor="bg-orange"
          textColor="text-white"
          style={{}}
        />
      </View>
    </View>
  );
};

export default RecipeCard;
