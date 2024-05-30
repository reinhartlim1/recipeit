import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import IngredientInput from "../../components/IngredientInput";
import { firestore } from "../firebase/firebaseconfig";
import { collection, addDoc, doc } from "firebase/firestore";
import { useGlobalContext } from "../context/GlobalProvider";

const AddMealplan = () => {
  const { user } = useGlobalContext();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [ingredients, setIngredients] = useState([""]);
  const [quantities, setQuantities] = useState([""]);
  const [units, setUnits] = useState([""]);

  const addIngredient = () => {
    if (ingredients.length < 3) {
      setIngredients([...ingredients, ""]);
      setQuantities([...quantities, ""]);
      setUnits([...units, ""]);
    } else {
      Alert.alert("You can only add up to 3 ingredients.");
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
    setQuantities(quantities.filter((_, i) => i !== index));
    setUnits(units.filter((_, i) => i !== index));
  };

  const setIngredientValue = (value, index, field) => {
    if (field === "ingredient") {
      setIngredients(
        ingredients.map((item, i) => (i === index ? value : item))
      );
    } else if (field === "quantity") {
      setQuantities(quantities.map((item, i) => (i === index ? value : item)));
    } else if (field === "unit") {
      setUnits(units.map((item, i) => (i === index ? value : item)));
    }
  };

  const fetchRandomMeals = async (count) => {
    const meals = [];
    for (let i = 0; i < count; i++) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
      const data = await response.json();
      meals.push({
        id: data.meals[0].idMeal,
        strMeal: data.meals[0].strMeal,
        strMealThumb: data.meals[0].strMealThumb,
        type: "mealdb",
      });
    }
    return meals;
  };

  const generateMealPlan = async () => {
    try {
      const dayCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      const mealPlan = [];

      for (let i = 0; i < dayCount; i++) {
        const currentDate = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24));
        const dayMeals = await fetchRandomMeals(2);
        mealPlan.push({
          date: currentDate,
          meals: dayMeals.map(meal => ({ ...meal })),
        });
      }

      const mealPlanDoc = {
        startDate,
        endDate,
        mealPlan,
      };

      const userDocRef = doc(firestore, "users", user.uid);
      const mealPlanCollectionRef = collection(userDocRef, "mealplans");
      await addDoc(mealPlanCollectionRef, mealPlanDoc);

      Alert.alert("Meal Plan Generated and Saved Successfully");
      router.push("/home");
    } catch (error) {
      console.error("Error generating meal plan:", error);
      Alert.alert("Error", "Failed to generate meal plan.");
    }
  };

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-between mx-8 mt-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.Back} resizeMode="contain" className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="text-center flex-1 mr-8 font-pmedium text-xl">
          MealPlan
        </Text>
      </View>

      <View className="mx-8">
        <View className="mt-4">
          <Text className="font-bold text-base">Start Date</Text>
          <TouchableOpacity className="h-10 border border-gray-300 rounded-md px-1 items-center justify-center" onPress={() => setShowStartDatePicker(true)}>
            <Text>{startDate.toDateString()}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={showStartDatePicker}
            date={startDate}
            onConfirm={(date) => {
              setShowStartDatePicker(false);
              setStartDate(date);
            }}
            onCancel={() => {
              setShowStartDatePicker(false);
            }}
          />
        </View>

        <View className="mt-4">
          <Text className="font-bold text-base">End Date</Text>
          <TouchableOpacity className="h-10 border border-gray-300 rounded-md px-1 items-center justify-center" onPress={() => setShowEndDatePicker(true)}>
            <Text>{endDate.toDateString()}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={showEndDatePicker}
            date={endDate}
            onConfirm={(date) => {
              setShowEndDatePicker(false);
              setEndDate(date);
            }}
            onCancel={() => {
              setShowEndDatePicker(false);
            }}
          />
        </View>

        <View className="mt-4">
          <Text className="font-bold text-base">Frequently Used Ingredients</Text>
        </View>
        <View className="mt-1">
          {ingredients.map((ingredient, index) => (
            <View className="mt-2 flex flex-row items-center" key={index}>
              <IngredientInput
                index={index}
                quantity={quantities[index]}
                unit={units[index]}
                ingredient={ingredient}
                setQuantity={(value) =>
                  setIngredientValue(value, index, "quantity")
                }
                setUnit={(value) => setIngredientValue(value, index, "unit")}
                setIngredient={(value) =>
                  setIngredientValue(value, index, "ingredient")
                }
                removeIngredient={removeIngredient}
              />
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={addIngredient}
          className="bg-green-500 p-2 rounded-md mt-4"
        >
          <Text className="text-center text-white font-pmedium">
            Add Ingredient
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={generateMealPlan}
          className="bg-orange-500 p-2 rounded-md mt-4"
        >
          <Text className="text-center text-white font-pmedium">
            Generate Meal Plan
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddMealplan;
