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

      <View className="h-screen mt-20">
        <View className="items-center">
          <Image
            source={images.TextLogo}
            className="w-56 h-20"
            resizeMode="contain"
          />
          <Carousel handlePress={() => router.push("/sign-in")} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
