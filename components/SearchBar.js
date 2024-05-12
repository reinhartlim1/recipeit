import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "../constants";

const SearchBar = () => {
  return (
    <View className="flex flex-row px-4 space-x-3 items-center w-full h-[50px] rounded-[10px] border-[1px] border-gray-100">
      <TouchableOpacity>
        <Image source={icons.Search} resizeMode="contain" className="h-5 w-5" />
      </TouchableOpacity>
      <TextInput 
        className="font-pregular flex-1 mt-0.5"
        placeholder="Input bahan liat resep"
        placeholderTextColor="#808080"
      />
    </View>
  );
};

export default SearchBar;
