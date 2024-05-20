import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { firestore } from "../firebase/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import { icons } from "../../constants";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";

const RecipeDetail = () => {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [selectedTab, setSelectedTab] = useState("nutrition");
  const [porsi, setPorsi] = useState(1);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(firestore, "recipes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  console.log(id);
  console.log(recipe);
  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.Back} resizeMode="contain" className="w-8 h-8" />
        </TouchableOpacity>

        <Text className="text-center flex-1 mr-8 font-pmedium text-xl">
          Detail Resep
        </Text>
      </View>
      <View></View>
      <ScrollView>
        <View className="mx-8">
          <Image
            source={{ uri: recipe.imageUrl }}
            style={{ width: "100%", height: 177, borderRadius: 10 }}
            resizeMode="cover"
          />
          <View className="mt-3">
            <CustomButton
              text="Ubah Porsi"
              backgroundColor="bg-orange"
              textColor="text-white"
            />
          </View>
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
          <Text className="font-psemibold text-xl mt-3">{recipe.name}</Text>
          <View className="flex flex-row mt-2 justify-between">
            <View className="w-14 h-20 bg-orange rounded-[10px] items-center justify-center">
              <Image
                source={icons.Time}
                resizeMode="contain"
                className="w-6 h-6"
                style={{ tintColor: "white" }}
              />
              <Text className="text-white text-xs mt-1">
                {recipe.time} Menit
              </Text>
            </View>
            <View className="w-14 h-20 bg-orange rounded-[10px] items-center justify-center">
              <Image
                source={icons.MainIngredient}
                resizeMode="contain"
                className="w-6 h-6"
                style={{ tintColor: "white" }}
              />
              <Text className="text-white text-xs mt-1">
                {recipe.bahanUtama}
              </Text>
            </View>
            <View className="w-14 h-20 bg-orange rounded-[10px] items-center justify-center">
              <Image
                source={icons.Soup}
                resizeMode="contain"
                className="w-6 h-6"
                style={{ tintColor: "white" }}
              />
              <Text className="text-white text-xs mt-1">
                {recipe.jenisMakanan}
              </Text>
            </View>
            <View className="w-14 h-20 bg-orange rounded-[10px] items-center justify-center">
              <Image
                source={icons.Rank}
                resizeMode="contain"
                className="w-6 h-6"
                style={{ tintColor: "white" }}
              />
              <Text className="text-white text-xs mt-1">
                {recipe.tingkatKesulitan}
              </Text>
            </View>
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
              onPress={() => setSelectedTab("nutrition")}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Text
                className="font-pmedium text-xs"
                style={{
                  color: selectedTab === "nutrition" ? "green" : "black",
                }}
              >
                Informasi Gizi
              </Text>
              <View
                style={{
                  height: 2,
                  marginTop: 5,
                  backgroundColor:
                    selectedTab === "nutrition" ? "green" : "#ccc",
                  width: "100%",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab("ingredients")}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Text
                className="font-pmedium text-xs"
                style={{
                  color: selectedTab === "ingredients" ? "green" : "black",
                }}
              >
                Bahan
              </Text>
              <View
                style={{
                  height: 2,
                  marginTop: 5,
                  backgroundColor:
                    selectedTab === "ingredients" ? "green" : "#ccc",
                  width: "100%",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab("steps")}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Text
                className="font-pmedium text-xs"
                style={{ color: selectedTab === "steps" ? "green" : "black" }}
              >
                Langkah-Langkah
              </Text>
              <View
                style={{
                  height: 2,
                  marginTop: 5,
                  backgroundColor: selectedTab === "steps" ? "green" : "#ccc",
                  width: "100%",
                }}
              />
            </TouchableOpacity>
          </View>
          <View className="mx-[10px]">
            {selectedTab === "nutrition" && (
              <View>
                <Text className="mt-1">
                  {`\u2022 ${recipe.nutrition.carbs*porsi}`}g Karbohidrat
                </Text>
                <Text className="mt-1">
                  {`\u2022 ${recipe.nutrition.protein*porsi}`}g Protein
                </Text>
                <Text className="mt-1">
                  {`\u2022 ${recipe.nutrition.vegetarian_protein*porsi}`}g Protein
                  Nabati
                </Text>
                <Text className="mt-1">
                  {`\u2022 ${recipe.nutrition.sugar*porsi}`}g Gula
                </Text>
              </View>
            )}
            {selectedTab === "ingredients" && (
              <View>
                {recipe.ingredients.map((ingredient, index) => (
                  <Text key={index} className="mt-1">
                    {`\u2022 ${recipe.unitValue[index]*porsi} ${recipe.unit[index]} ${ingredient}`}
                  </Text>
                ))}
              </View>
            )}
            {selectedTab === "steps" && (
              <View>
                {recipe.steps.map((step, index) => (
                  <Text key={index} className="mt-1">
                    {`\u2022 ${step}`}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
        <View className="mt-20"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetail;
