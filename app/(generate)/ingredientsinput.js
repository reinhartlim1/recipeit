import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";

const IngredientsInput = () => {
  const [ingredients, setIngredients] = useState([""]);

  const addIngredientField = () => {
    if (ingredients.length < 3) {
      setIngredients([...ingredients, ""]);
    } else {
      Alert.alert("Maximum 3 ingredients allowed");
    }
  };

  return (
    <SafeAreaView>
      <View className="mx-9 mt-8">
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.Back}
              resizeMode="contain"
              className="h-8 w-8"
            />
          </TouchableOpacity>
          <Text className="font-pmedium text-lg">Input Bahan</Text>
          <TouchableOpacity onPress={addIngredientField}>
            <Image
              source={icons.Plus}
              resizeMode="contain"
              className="h-8 w-8"
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View className="mt-4">
            {ingredients.map((ingredient, index) => (
              <FormField
                key={index}
                value={ingredient}
                title={`Nama Bahan ${index + 1}`}
                handleChangeText={(text) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index] = text;
                  setIngredients(newIngredients);
                }}
              />
            ))}
          </View>
          <View className="mt-6">
            <CustomButton
              title="Cari Resep"
              backgroundColor="bg-green"
              textColor="text-white"
              text="Generate Resep"
              handlePress={() => {
                const query = ingredients.join(",");
                console.log(query);
                router.push(`/(generate)/result?query=${query}`);
              }}
            />
          </View>
          <View className="mt-20">

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default IngredientsInput;
