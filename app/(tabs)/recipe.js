import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Recipe = () => {
  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-2xl font-bold mb-5">Recipe Options</Text>
      
      <TouchableOpacity 
        className="bg-orange p-4 rounded-lg mb-5 w-full items-center"
        onPress={() => router.push('/(generate)/ingredientsinput')}
      >
        <Text className="text-white text-lg">Generate Recipe</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="bg-green p-4 rounded-lg w-full items-center"
        onPress={() => router.push('/recipe/addrecipe')}
      >
        <Text className="text-white text-lg">Add Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Recipe;
