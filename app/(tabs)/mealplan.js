import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import Community from "../../components/Community";

const MealPlan = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="mx-8 mt-3">
          <View className="justify-center items-center">
            <Text className="font-pmedium text-[18px]">MealPlan</Text>
          </View>
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
            />
          </View>
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
