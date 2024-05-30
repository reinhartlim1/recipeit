import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { firestore } from "../firebase/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import { router } from "expo-router";
import RecipeCard from "../../components/RecipeCard";
import { icons, images } from "../../constants";

const AllRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "recipes"));
        const recipesArray = [];
        querySnapshot.forEach((doc) => {
          recipesArray.push(doc.data());
        });
        setRecipes(recipesArray);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-between mx-8 mt-8">
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Image source={icons.Back} resizeMode="contain" className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="text-center flex-1 mr-8 font-pmedium text-xl">
          Recipe List
        </Text>
      </View>
      <ScrollView className="mt-10 mx-8" showsVerticalScrollIndicator={false}>
        <View className="flex flex-wrap flex-row -mx-2">
          {recipes.map((recipe) => (
            <View className="w-1/2 px-2 mb-4">
              <RecipeCard
                key={recipe.recipeId}
                id={recipe.recipeId}
                name={recipe.name}
                ingCount={recipe.ingredients ? recipe.ingredients.length : 0}
                time={recipe.time}
                imageUrl={recipe.imageUrl}
              />
            </View>
          ))}
        </View>
        <View className="mt-40"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllRecipe;
