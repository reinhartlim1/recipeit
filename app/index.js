import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View } from "react-native";
import React from "react";
import { images } from "../constants";
import Carousel from "../components/Carousel";
import { router, Redirect } from "expo-router"
import { useGlobalContext } from "./context/GlobalProvider";

const Onboarding = () => {
  const { loading, isLogged } = useGlobalContext();
  if(!loading && isLogged) return <Redirect href="/home" />

  return (
    <SafeAreaView>
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
