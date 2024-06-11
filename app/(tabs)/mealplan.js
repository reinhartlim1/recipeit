import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import Community from "../../components/Community";
import { useGlobalContext } from "../context/GlobalProvider";
import { firestore } from "../firebase/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { router } from "expo-router";

const MealPlan = () => {
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      setLoading(true);
      try {
        const userDocRef = collection(
          firestore,
          "users",
          user.uid,
          "mealplans"
        );
        const mealPlanSnapshot = await getDocs(userDocRef);
        const mealPlansData = mealPlanSnapshot.docs.map((doc) => doc.data());
        setMealPlans(mealPlansData);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="mx-8 mt-3">
          <View className="justify-center items-center">
            <Text className="font-pmedium text-[18px]">MealPlan</Text>
          </View>
          {mealPlans.length === 0 ? (
            <>
              <View className="justify-center items-center mt-8">
                <Text className="font-psemibold text-[24px]">
                  Ow ow... you don't have a
                </Text>
                <Text className="font-psemibold text-[24px]">Meal plan</Text>
              </View>
              <View className="justify-center items-center">
                <Image source={images.Ask} className="w-[250px] h-[190px]" />
              </View>
              <View className="mt-[10px] justify-center items-center">
                <Text className="text-[14px] text-[#525C67]">
                  Click the button below to add a meal plan
                </Text>
              </View>
              <View className="w-full mt-[10px]">
                <CustomButton
                  text="Add Meal Plan"
                  textColor="text-white"
                  backgroundColor="bg-green"
                  handlePress={() => router.push("mealplan/addmealplan")}
                />
              </View>
            </>
          ) : (
            <View className="mt-8">
              <Text className="font-pmedium text-lg">Rencana Makan Harian</Text>
              {mealPlans.map((mealPlan, index) => (
                <View key={index}>
                  <Text className="font-pmedium text-xs">
                    {new Date(mealPlan.startDate.toDate()).toDateString()} -{" "}
                    {new Date(mealPlan.endDate.toDate()).toDateString()}
                  </Text>
                  {mealPlan.mealPlan.map((day, dayIndex) => (
                    <View key={dayIndex} className="mt-4">
                      <Text className="font-psemibold text-xs">
                        {new Date(day.date.toDate()).toDateString()}
                      </Text>
                      <View className="flex flex-wrap flex-row -mx-2">
                        {day.meals.map((meal, mealIndex) => (
                          <View key={mealIndex} className="w-1/2 px-2 mb-4">
                            <View>
                              <Image
                                source={{ uri: meal.strMealThumb }}
                                className="w-[155px] h-[100px] rounded-lg"
                                resizeMode="cover"
                              />
                              <Text
                                className="text-sm font-pmedium"
                                numberOfLines={1}
                              >
                                {meal.strMeal}
                              </Text>
                              <View className="h-[30px] w-[130px] mt-[10px]">
                                <CustomButton
                                  handlePress={() => {
                                    router.push(
                                      meal.type === "private"
                                        ? `/detail/${meal.id}?source=private`
                                        : meal.type === "mealdb"
                                        ? `/detail/${meal.id}?type=mealdb`
                                        : `/detail/${meal.id}`
                                    );
                                  }}
                                  text="Cek Resep"
                                  backgroundColor="bg-orange"
                                  textColor="text-white"
                                  style={{}}
                                  isCard={true}
                                />
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              ))}
              <View className="w-full mt-[10px]">
                <CustomButton
                  text="Add Meal Plan"
                  textColor="text-white"
                  backgroundColor="bg-green"
                  handlePress={() => router.push("mealplan/addmealplan")}
                />
              </View>
            </View>
          )}
          <View className="h-[1.5px] mt-[29px] flex flex-row">
            <View className="bg-black opacity-50 flex-1"></View>
          </View>
          <View>
            <Community />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealPlan;
