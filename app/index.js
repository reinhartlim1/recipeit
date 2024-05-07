import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View, Text } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import { StatusBar } from "expo-status-bar";
import Slider from "../components/Slider";

const Onboarding = () => {
  return (
    <SafeAreaView>
      <StatusBar style="light" />

      <View className="h-screen mt-20">
        <View className="items-center">
          <Image
            source={images.TextLogo}
            className="w-56 h-20"
            resizeMode="contain"
          />
          <Slider />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
