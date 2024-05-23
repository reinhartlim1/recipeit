import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { icons } from "../../constants";
import SearchBar from "../../components/SearchBar";
import ScrollCategories from "../../components/ScrollCategories";
import RecipeCard from "../../components/RecipeCard";
import Community from "../../components/Community";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { firestore } from "../firebase/firebaseconfig";


const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {

        const querySnapshot = await getDocs(
          query(collection(firestore, "recipes"), limit(2))
        );
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
      <View className="h-[115px] bg-green">
        <View className="mt-6 mx-8 ">
          <View className="flex-row items-center justify-between">
            <Text className="font-pmedium text-white text-[14px]">
              Hi, Future Chef
            </Text>
            <View className="items-center justify-center rounded-full h-[30px] w-[30px] bg-white">
              <Image
                source={icons.Notification}
                resizeMode="contain"
                className="h-[20px] w-[15px]"
              />
            </View>
          </View>
          <View>
            <Text className="font-psemibold text-[18px] text-white">
              Make new recipe today!
            </Text>
          </View>
        </View>
      </View>

      {/* Scroll */}
      <ScrollView
        className="mx-8"
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
      >
        {/* Top Banner */}
        <View className="rounded-3xl mt-3 h-[145px] bg-green">
          <View className="ml-5 mt-4">
            <Text className="font-psemibold text-[20px] text-white">
              {"Dapatkan Informasi\nGizi pada Resep"}
            </Text>
            <TouchableOpacity className="mt-2 items-center justify-center bg-orange w-[98px] h-[22px] rounded-[5px]">
              <Text className="text-white font-pmedium text-[10px]">
                Cek Resep
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="mt-[30px]">
          <SearchBar />
        </View>

        {/* Scroll Categories */}
        <View className="mt-[15px]">
          <ScrollCategories />
        </View>

        {/* List Recipes */}
        <View className="mt-[15px]">
          <Text className="font-psemibold text-base">List Recipe</Text>
          <View className="mt-[15px] flex flex-row justify-between">
            {/* Don't forget wrap component with view to let space-x work */}
            {recipes.map((recipe, index) => (
              <View key={index}>
                <RecipeCard
                  id={recipe.recipeId} 
                  name={recipe.name} 
                  ingCount={recipe.ingredients ? recipe.ingredients.length : 0} 
                  time={recipe.time} 
                  imageUrl={recipe.imageUrl}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Komunitas */}
        <View className="mt-[15px]">
          <Community />
        </View>

        <View className="h-40"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
