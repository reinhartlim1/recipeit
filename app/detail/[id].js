import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { firestore } from "../firebase/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import { icons } from "../../constants";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import QuantityModal from "../../components/QuantityModal";
import { useGlobalContext } from "../context/GlobalProvider";

const fractionToDecimal = (fraction) => {
  const fractionMap = {
    "1/8": 0.125,
    "1/4": 0.25,
    "1/3": 0.333,
    "1/2": 0.5,
    "2/3": 0.667,
    "3/4": 0.75,
  };

  if (fractionMap[fraction]) {
    return fractionMap[fraction];
  }

  if (!isNaN(fraction)) {
    return parseFloat(fraction);
  }

  const [whole, frac] = fraction.split(" ");
  if (frac) {
    const [num, denom] = frac.split("/").map(Number);
    return parseFloat(whole) + num / denom;
  }

  const [num, denom] = fraction.split("/").map(Number);
  return num / denom;
};

const splitMeasure = (measure) => {
  const parts = measure.split(" ");
  if (parts.length === 2) {
    return [fractionToDecimal(parts[0]), parts[1]];
  }
  const fraction = parts[0];
  const unit = parts.slice(1).join(" ");
  return [fractionToDecimal(fraction), unit];
};

const RecipeDetail = () => {
  const { id, source, type } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const [recipe, setRecipe] = useState(null);
  const [selectedTab, setSelectedTab] = useState("nutrition");
  const [porsi, setPorsi] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        let docRef;

        if (type === "mealdb") {
          // Fetch from MealDB API
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await response.json();
          if (data.meals) {
            const meal = data.meals[0];
            const ingredients = [];
            const unitValues = [];
            const units = [];

            for (let i = 1; i <= 20; i++) {
              const ingredient = meal[`strIngredient${i}`];
              const measure = meal[`strMeasure${i}`];

              if (ingredient && measure) {
                const [value, unit] = splitMeasure(measure.trim());
                ingredients.push(ingredient);
                unitValues.push(value);
                units.push(unit);
              }
            }

            const tags = meal.strTags ? meal.strTags.split(",")[0] : "";

            setRecipe({
              name: meal.strMeal,
              imageUrl: meal.strMealThumb,
              time:60,
              bahanUtama: meal.strCategory,
              jenisMakanan: tags.charAt(0).toUpperCase() + tags.slice(1) || "",
              tingkatKesulitan: "Medium", 
              nutrition: {
                carbs: Math.floor(Math.random() * 120),
                protein: Math.floor(Math.random() * 50),
                vegetarian_protein: Math.floor(Math.random() * 25),
                sugar: Math.floor(Math.random() * 20),
              },
              ingredients: ingredients,
              unitValue: unitValues,
              unit: units,
              steps: meal.strInstructions.split("\r\n.").filter(step => step.trim() !== ""),
            });
          }
        } else {
          // Fetch from Firestore
          if (source === "private") {
            docRef = doc(firestore, "users", user.uid, "recipe", id);
          } else {
            docRef = doc(firestore, "recipes", id);
          }

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setRecipe(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecipe();
  }, [id, source, type, user]);

  const saveQuantity = () => {
    setModalVisible(false);
  };

  if (!recipe) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
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
              handlePress={() => setModalVisible(true)}
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
          <View className="flex flex-row mt-2 justify-between space-x-4">
            <View className="w-14 h-20 bg-orange rounded-[10px] items-center justify-center flex-1">
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
            <View className="w-14 h-20 bg-orange rounded-[10px] items-center justify-center flex-1">
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
            <View className="w-14 h-20 bg-orange rounded-[10px] items-center justify-center flex-1">
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
            <View className="w-14 h-20 bg-orange rounded-[10px] items-center justify-center flex-1">
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
                  {`\u2022 ${recipe.nutrition.carbs * porsi}`}g Karbohidrat
                </Text>
                <Text className="mt-1">
                  {`\u2022 ${recipe.nutrition.protein * porsi}`}g Protein
                </Text>
                <Text className="mt-1">
                  {`\u2022 ${recipe.nutrition.vegetarian_protein * porsi}`}g
                  Protein Nabati
                </Text>
                <Text className="mt-1">
                  {`\u2022 ${recipe.nutrition.sugar * porsi}`}g Gula
                </Text>
              </View>
            )}
            {selectedTab === "ingredients" && (
              <View>
                {recipe.ingredients.map((ingredient, index) => (
                  <Text key={index} className="mt-1">
                    {`\u2022 ${isNaN(recipe.unitValue[index] * porsi) ? 1 : recipe.unitValue[index] * porsi} ${recipe.unit[index]} ${ingredient}`}
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
      <QuantityModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        quantity={porsi}
        setQuantity={setPorsi}
        saveQuantity={saveQuantity}
      />
    </SafeAreaView>
  );
};

export default RecipeDetail;
