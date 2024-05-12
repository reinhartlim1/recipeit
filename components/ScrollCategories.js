import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { useState } from "react";

const categories = [
  {
    name: "Semua",
    icon: icons.Filter,
  },
  {
    name: "Waktu",
    icon: icons.Time,
  },
  {
    name: "Bahan Utama",
    icon: icons.MainIngredient,
  },
  {
    name: "Tingkat Kesulitan",
    icon: icons.Rank,
  },
  {
    name: "Jenis Makanan",
    icon: icons.Soup,
  },
];

const ScrollCategories = () => {
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  return (
    <ScrollView
      horizontal
      className="h-10"
      contentContainerStyle={{ columnGap: 10 }}
      showsHorizontalScrollIndicator={false}
      alwaysBounceHorizontal={true}
    >
      {categories.map((category, index) => (
        <TouchableOpacity key={index.toString()} onPress={() => {
          setCategoryIndex({ index: index, category: categories[index] });
        }}>
          <View className={`flex flex-row px-[10px] h-10 border ${categoryIndex.index == index ? "border-green":"border-gray-100"} rounded-[5px] items-center justify-center`}>
            <View className="h-5 w-5 mt-1">
              <Image
                source={category.icon}
                resizeMode="contain"
                className="h-4 w-4"
                tintColor={categoryIndex.index == index ? "#06A43C" : "#696A6F"}
              />
            </View>
            <Text style={{ color: "#696A6F" }}>{category.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ScrollCategories;
