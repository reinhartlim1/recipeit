import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View, Text } from "react-native";
import React from "react";
import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import Carousel from "../components/Carousel";
import { router, Link } from "expo-router"

const Onboarding = () => {
  return (
    <SafeAreaView>
      {/* <StatusBar style="light" /> */}

      <View className="mt-20">
        <View className="items-center">
          <Image
            source={images.TextLogo}
            className="w-56 h-20"
            resizeMode="contain"
          />
        </View>
      </View>
      <Carousel handlePress={() => router.push("/sign-in")} />
    </SafeAreaView>
  );
};

export default Onboarding;
