import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { firestore } from "../firebase/firebaseconfig"; // Adjust the import based on your config location
import {
  collection,
  query as firestoreQuery,
  where,
  getDocs,
} from "firebase/firestore";
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants";

const SearchRecipe = () => {
  const { query } = useLocalSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);

      // Temporary array to hold all recipes
      let allRecipes = [];

      // Fetch from Firestore
      try {
        const q = firestoreQuery(
          collection(firestore, "recipes"),
          where("ingredients", "array-contains", query)
        );
        const querySnapshot = await getDocs(q);
        const firestoreResults = [];
        querySnapshot.forEach((doc) => {
          firestoreResults.push({ id: doc.id, type: "db", ...doc.data() });
        });
        allRecipes = [...allRecipes, ...firestoreResults];
      } catch (error) {
        console.error("Error fetching Firestore recipes:", error);
        Alert.alert("Error fetching Firestore recipes");
      }

      // Fetch from MealDB API
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const data = await response.json();
        if (data.meals) {
          const apiResults = data.meals.map((meal) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            imageUrl: meal.strMealThumb,
            type: "mealdb",
          }));
          allRecipes = [...allRecipes, ...apiResults];
        }
      } catch (error) {
        console.error("Error fetching MealDB recipes:", error);
        Alert.alert("Error fetching MealDB recipes");
      }

      setRecipes(allRecipes);
      setLoading(false);
    };

    if (query) {
      fetchRecipes();
    }
  }, [query]);

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  console.log(recipes)

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-between mx-8 mt-8">
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Image source={icons.Back} resizeMode="contain" className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="text-center flex-1 mr-8 font-pmedium text-xl">
          Search
        </Text>
      </View>
      <View className="mx-8 mt-4">
        <SearchBar initialQuery={query} />
      </View>
      <ScrollView className="mt-4 mx-8">
        <View className="flex flex-wrap flex-row -mx-2">
          {recipes.map((recipe) => (
            <View key={recipe.id} className="w-1/2 px-2 mb-4">
              <TouchableOpacity
                onPress={() => router.push(`/detail/${recipe.id}?type=${recipe.type}`)}
              >
                <View>
                  <Image
                    source={{ uri: recipe.imageUrl }}
                    style={{ width: "100%", height: 150, borderRadius: 10 }}
                  />
                  <Text className="font-pmedium text-md mt-2">
                    {recipe.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchRecipe;
