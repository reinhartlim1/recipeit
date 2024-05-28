import { View, Text, TouchableOpacity, Image, TextInput, Modal, Alert } from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { router } from "expo-router";

const SearchBar = ({ initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="flex flex-row px-4 space-x-3 items-center w-full h-[50px] rounded-[10px] border-[1px] border-gray-100">
      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input ingredients to search for recipes"
            );
          router.push(`/(generate)/${query}`);
        }}
      >
        <Image source={icons.Search} resizeMode="contain" className="h-5 w-5" />
      </TouchableOpacity>
      <TextInput
        className="font-pregular flex-1 mt-0.5"
        placeholder="Input bahan generate resep"
        placeholderTextColor="#808080"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
    </View>
  );
};

export default SearchBar;
