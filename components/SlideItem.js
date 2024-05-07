import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item }) => {
  return (
    <View className="items-center" style={{ width, height }}>
      <View>
        <Image
          source={item.img}
          className="mx-auto mt-14 w-56 h-56"
          resizeMode="contain"
        />
      </View>
      <View className="mt-10 mx-20">
        <Text className="font-psemibold text-2xl text-center">
          {item.title}
        </Text>
      </View>
      <View className="mx-4 mt-4">
        <Text className="font-pregular text-base text-center">
          {item.description}
        </Text>
      </View>
      {item.id === 3 ? (<CustomButton />) : null}
    </View>
  );
};

export default SlideItem;
