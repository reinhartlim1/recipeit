import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RecipeCard from "../../components/RecipeCard";
import { firestore } from "../firebase/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import { router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

const ResepKu = () => {
  const { user } = useGlobalContext();
  const [selected, setSelected] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "users", user.uid, "recipe")
        );
        const recipesArray = [];
        querySnapshot.forEach((doc) => {
          recipesArray.push(doc.data());
        });
        setRecipes(recipesArray);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecipes();
  }, [user.uid]);

  return (
    <SafeAreaView className="mx-8">
      <View className="mt-3">
        <Text className="font-pmedium text-lg text-center">ResepKu</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 10,
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectedTab(1)}
          style={{ flex: 1, alignItems: "center" }}
        >
          <Text
            className="font-pmedium text-base"
            style={{
              color: selectedTab === 1 ? "green" : "black",
            }}
          >
            Publish
          </Text>
          <View
            style={{
              height: 3,
              marginTop: 5,
              backgroundColor: selectedTab === 1 ? "green" : "#ccc",
              width: "100%",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(2)}
          style={{ flex: 1, alignItems: "center" }}
        >
          <Text
            className="font-pmedium text-base"
            style={{
              color: selectedTab === 2 ? "green" : "black",
            }}
          >
            Draft
          </Text>
          <View
            style={{
              height: 3,
              marginTop: 5,
              backgroundColor: selectedTab === 2 ? "green" : "#ccc",
              width: "100%",
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="flex flex-wrap flex-row -mx-2">
          {recipes.map((recipe, index) => (
            <View className="w-1/2 px-2 mb-4" key={index}>
              <RecipeCard
                key={index}
                id={recipe.recipeId}
                name={recipe.name}
                ingCount={recipe.ingredients ? recipe.ingredients.length : 0}
                imageUrl={recipe.imageUrl}
                time={recipe.time}
                sourceType='private'
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResepKu;
