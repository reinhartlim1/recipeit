import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import Constants from "expo-constants";
import { icons, image } from "../../constants";
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase/firebaseconfig";

const Result = () => {
  const { query } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);

  const fetchRecipeFromGemini = async (ingredientsQuery) => {
    const apiKey = Constants.expoConfig.extra.geminiApiKey;
    const genAI = new GoogleGenerativeAI(apiKey);

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig,
    });

    const prompt = `
    Create a recipe like a professional homecook with the following ingredients: ${ingredientsQuery}. Format it as JSON with the following structure: {
      ingredients: [],
      unitValue: [],
      unit: [],
      steps: [],
      name: "",
      description: "",
      jenisMakanan: "",
      time: 0,
      tingkatKesulitan: "",
      bahanUtama: "",
      nutrition: {
        carbs: 0,
        protein: 0,
        vegetarian_protein: 0,
        sugar: 0,
      }
    }`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const data = JSON.parse(response.text());
      return data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      Alert.alert("Error", "Failed to generate recipe.");
      return null;
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const generatedRecipe = await fetchRecipeFromGemini(query);
      setRecipe({
        ...generatedRecipe,
        imageUrl: Constants.expoConfig.extra.recipeImageUrl,
      });
      setLoading(false);
    };

    fetchRecipe();
  }, [query]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    );
  }

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const saveRecipe = async () => {
    if (user) {
      try {
        const userRef = doc(firestore, "users", user.uid);
        const userRecipeRef = collection(userRef, "recipe");
        const recipeRef = doc(userRecipeRef);

        await setDoc(recipeRef, {
          ...recipe,
          createdAt: serverTimestamp(),
          recipetype: "Private",
          recipeId: recipeRef.id,
          creator: user.uid,
        }).then(() => {
          Alert.alert("Success", "Recipe saved successfully.");
        });
      } catch (error) {
        console.error("Error saving recipe:", error);
        Alert.alert("Error", "Failed to save recipe.");
      }
    } else {
      Alert.alert("Error", "You need to be logged in to save recipes.");
    }
    router.replace("/home");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex flex-row items-center justify-between mx-8 mt-8 mb-3">
          <TouchableOpacity onPress={() => router.replace("/home")}>
            <Image
              source={icons.Back}
              resizeMode="contain"
              className="w-8 h-8"
            />
          </TouchableOpacity>
          <Text className="text-center flex-1 mr-8 font-pmedium text-xl">
            Saran Resep
          </Text>
        </View>
        {recipe ? (
          <View className="mt-2 mx-8">
            <Text className="font-pmedium text-sm">Bahan-bahan</Text>
            <View className="flex flex-row flex-wrap gap-2 mt-2">
              {recipe.ingredients?.map((ingredient, index) => (
                <View className="rounded-full border-green border px-3 py-2 self-start">
                  <Text key={index} className="text-green text-center text-xs">
                    {capitalizeFirstLetter(ingredient)}
                  </Text>
                </View>
              ))}
            </View>
            <Image
              source={{ uri: recipe.imageUrl }}
              className="w-full h-44 rounded-lg mt-6"
              resizeMode="cover"
            />
            <View className="mt-3 flex flex-row space-x-[2px]">
              <Image
                source={icons.Star}
                resizeMode="contain"
                className="w-3 h-3"
              />
              <Image
                source={icons.Star}
                resizeMode="contain"
                className="w-3 h-3"
              />
              <Image
                source={icons.Star}
                resizeMode="contain"
                className="w-3 h-3"
              />
              <Image
                source={icons.Star}
                resizeMode="contain"
                className="w-3 h-3"
              />
              <Image
                source={icons.Star}
                resizeMode="contain"
                className="w-3 h-3"
              />
            </View>
            <Text className="font-pmedium text-lg">{recipe.name}</Text>
            <Text className="text-orange">
              {recipe.ingredients.length} bahan
            </Text>
            <Text className="text-green">{recipe.time} menit</Text>
            <Text className="font-bold mt-5">Deskripsi</Text>
            <Text className="mb-5">{recipe.description}</Text>
            <Text className="font-bold">Bahan-bahan:</Text>
            {recipe.ingredients?.map((ingredient, index) => (
              <Text
                key={index}
                className="ml-2"
              >{`${recipe.unitValue[index]} ${recipe.unit[index]} ${ingredient}`}</Text>
            ))}
            <Text className="font-bold mt-5">Langkah-langkah:</Text>
            {recipe.steps.map((step, index) => (
              <Text key={index} className="ml-2">{`${
                index + 1
              }. ${step}`}</Text>
            ))}
            <Text className="font-bold mt-5">Nutrisi:</Text>
            <Text className="ml-2">{`Karbohidrat: ${recipe.nutrition.carbs}g`}</Text>
            <Text className="ml-2">{`Protein: ${recipe.nutrition.protein}g`}</Text>
            <Text className="ml-2">{`Protein Nabati: ${recipe.nutrition.vegetarian_protein}g`}</Text>
            <Text className="ml-2">{`Gula: ${recipe.nutrition.sugar}g`}</Text>
            <View className="mt-3">
              <CustomButton
                backgroundColor="bg-orange"
                text="Simpan Resep"
                textColor="text-white"
                handlePress={saveRecipe}
              />
            </View>
            <View className="h-20"></View>
          </View>
        ) : (
          <Text className="text-center">No recipe generated.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Result;
