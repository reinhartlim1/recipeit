import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";

const PantryCard = ({ imageURL, ingredient, quantity, unit, onEdit, onDelete }) => {
  return (
    <View className="w-full h-44 rounded-xl bg-white p-3 shadow-2xl shadow-yellow-100">
      <View>
        <Image
          source={{uri: imageURL}}
          resizeMode="cover"
          className="w-full h-20 rounded-t-xl"
        />
      </View>
      <View className="mt-2 items-center flex flex-row justify-between">
        <View className="w-1/2">
          <Text className="font-pmedium text-lg" numberOfLines={1} >{ingredient}</Text>
          <Text className="font-pregular text-sm">{`${quantity} ${unit}`}</Text>
        </View>
        <View className="flex flex-row gap-1 items-center">
          <TouchableOpacity className="mt-0.5" onPress={onEdit}>
            <Image
              source={icons.Edit}
              resizeMode="contain"
              className="w-4 h-4"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Image
              source={icons.Delete}
              resizeMode="contain"
              className="w-5 h-5"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PantryCard;
