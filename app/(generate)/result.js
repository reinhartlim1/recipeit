import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import Constants from "expo-constants";

const Result = () => {
  const { query } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  
  // const fetchRecipeFromOpenAI = async (ingredientsQuery) => {
  //   const apiKey = Constants.expoConfig.extra.openaiApiKey;
  //   const apiUrl = "https://api.openai.com/v1/chat/completions";

  //   const messages = [
  //     {
  //       role: "system",
  //       content: "You are a helpful assistant designed to output JSON.",
  //     },
  //     {
  //       role: "user",
  //       content: `Create a recipe like a professional homecook with the following ingredients: ${ingredientsQuery}. Format it as JSON with the following structure: {
  //         ingredients: [],
  //         unitValue: [],
  //         unit: [],
  //         steps: [],
  //         name: "",
  //         description: "",
  //         jenisMakanan: "",
  //         time: "",
  //         tingkatKesulitan: "",
  //         bahanUtama: "",
  //         nutrition: {
  //           carbs: 0,
  //           protein: 0,
  //           vegetarian_protein: 0,
  //           sugar: 0,
  //         }
  //       }`,
  //     },
  //   ];

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${apiKey}`,
  //       },
  //       body: JSON.stringify({
  //         model: "gpt-3.5-turbo",
  //         messages,
  //         max_tokens: 1500,
  //       }),
  //     });

  //     // if (!response.ok) {
  //     //   throw new Error("Failed to fetch recipe");
  //     // }

  //     const data = await response.json();
  //     console.log(data);
  //     // return JSON.parse(data.choices[0].message.content);
  //   } catch (error) {
  //     console.error("Error fetching recipe:", error);
  //     Alert.alert("Error", "Failed to generate recipe.");
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   const fetchRecipe = async () => {
  //     setLoading(true);
  //     const generatedRecipe = await fetchRecipeFromOpenAI(query);
  //     setRecipe(generatedRecipe);
  //     setLoading(false);
  //   };

  //   fetchRecipe();
  // }, [query]);

  // console.log(recipe);

  

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      {/* <ScrollView className="p-5">
        <Text className="text-2xl font-bold mb-5">{recipe.name}</Text>
        <Text className="mb-5">{recipe.description}</Text>
        <Text className="font-bold">Ingredients:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text
            key={index}
            className="ml-2"
          >{`${recipe.unitValue[index]} ${recipe.unit[index]} ${ingredient}`}</Text>
        ))}
        <Text className="font-bold mt-5">Steps:</Text>
        {recipe.steps.map((step, index) => (
          <Text key={index} className="ml-2">{`${index + 1}. ${step}`}</Text>
        ))}
        <Text className="font-bold mt-5">Nutrition:</Text>
        <Text className="ml-2">{`Carbs: ${recipe.nutrition.carbs}g`}</Text>
        <Text className="ml-2">{`Protein: ${recipe.nutrition.protein}g`}</Text>
        <Text className="ml-2">{`Vegetarian Protein: ${recipe.nutrition.vegetarian_protein}g`}</Text>
        <Text className="ml-2">{`Sugar: ${recipe.nutrition.sugar}g`}</Text>
      </ScrollView> */}
      <Text className="text-center justify-center">pppp</Text>
    </SafeAreaView>
  );
};

export default Result;
