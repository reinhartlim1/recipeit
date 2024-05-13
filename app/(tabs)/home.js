import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import SearchBar from "../../components/SearchBar";
import ScrollCategories from "../../components/ScrollCategories";
import RecipeCard from "../../components/RecipeCard";
import CommunityCard from "../../components/CommunityCard";
import Community from "../../components/Community";

const { width, height } = Dimensions.get("window");

const Home = () => {
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
            <View>
              <RecipeCard name="Nasi Goreng Petai" ingCount={4} time={12} />
            </View>
            <View>
              <RecipeCard name="Nasi Goreng Petai" ingCount={4} time={12} />
            </View>
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
